<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class InventoryController extends BaseController
{
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 5);
        $name = $request->input('query');

        try {
            // Mengambil data inventaris dengan paginasi
            $inventory = Inventory::when($name, function ($query, $name) {
                return $query->where('nama', 'like', '%' . $name . '%')
                    ->orWhere('satuan', 'like', '%' . $name . '%')
                    ->orWhere('saldo', 'like', '%' . $name . '%');
            })
                ->orderBy('created_at', 'desc')
                ->latest()
                ->paginate($perPage);

            return response()->json(['data' => $inventory], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'satuan' => 'required|string',
        ]);

        // Mulai transaksi database
        DB::beginTransaction();

        try {
            $file_path = null;
            if ($request->file) {
                $file_path = $request->file->store('persediaan', 'public');
            }
            // Simpan data ke database menggunakan metode create
            $result = Inventory::create([
                'nama' => $request->nama,
                'saldo' => $request->saldo,
                'satuan' => $request->satuan,

                'image' => $file_path,
            ]);
            DB::commit();
            return $this->sendResponse($result, 'Data berhasil dibuat');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage(), 'Error');
        }
    }

    public function show($id)
    {
        try {
            // Ambil data inventory berdasarkan ID
            $inventory = Inventory::findOrFail($id);
            // Berikan respons dengan data inventory
            return response()->json(['data' => $inventory], 200);
        } catch (\Exception $e) {
            // Berikan respons error jika data tidak ditemukan
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            // Cari dan update data inventory berdasarkan ID
            $inventory = Inventory::findOrFail($id);
            // return Storage::url($inventory->image);
            if ($request->file == 'null') {
                if ($inventory->image) {
                    Storage::disk('public')->delete($inventory->image);
                }
            } else {
                if ($inventory->image) {
                    Storage::disk('public')->delete($inventory->image);
                }
                $file_path = $request->file->store('persediaan', 'public');
            }
            $inventory->update([
                'nama' => $request->nama,
                'saldo' => $request->saldo,
                'satuan' => $request->satuan,
                'image' => $request->file == 'null' ? null : $file_path ?? $inventory->image,
            ]);
            // Commit transaksi jika berhasil
            DB::commit();
            // Berikan respons sukses
            return response()->json(['message' => 'Data berhasil diperbarui'], 200);
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollback();
            // Berikan respons error
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Cari dan hapus data inventory berdasarkan ID
            $inventory = Inventory::findOrFail($id);
            if ($inventory->image) {
                Storage::disk('public')->delete($inventory->image);
            }
            $inventory->delete();
            // Berikan respons sukses
            return response()->json(['message' => 'Data berhasil dihapus'], 200);
        } catch (\Exception $e) {
            // Berikan respons error jika data tidak ditemukan
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    }


    public function cekNama(Request $request)
    {
        $name = $request->input('query');
        $inventory = Inventory::where('nama', $name)->first();
        if ($inventory) {
            return true;
        }
        return "false";
    }

    public function showImage($id)
    {
        $item = Inventory::findOrFail($id);

        return (Storage::url($item->image));
    }
}
