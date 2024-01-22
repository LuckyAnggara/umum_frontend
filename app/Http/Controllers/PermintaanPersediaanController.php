<?php

namespace App\Http\Controllers;

use App\Models\DetailPermintaanPersediaan;
use App\Models\MutasiPersediaan;
use App\Models\PermintaanPersediaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PermintaanPersediaanController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 5);
        $name = $request->input('query');
        $status = $request->input('status');

        try {
            // Mengambil data inventaris dengan paginasi
            $result = PermintaanPersediaan::with('detail')->when($name, function ($query, $name) {
                return $query->where('nama', 'like', '%' . $name . '%')
                    ->orWhere('nip', 'like', '%' . $name . '%')
                    ->orWhere('unit', 'like', '%' . $name . '%');
            })->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
                ->orderBy('created_at', 'desc')
                ->latest()
                ->paginate($perPage);

            return response()->json(['data' => $result], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'detail' => 'required|array',
        ]);
        // Mulai transaksi database
        $data = json_decode($request->getContent());
        DB::beginTransaction();
        try {

            $ticketNumber = PermintaanPersediaan::generateTicketNumber();
            $result = PermintaanPersediaan::create([
                'tiket' => $ticketNumber,
                'nama' => $data->nama,
                'unit' => $data->unit,
                'nip' => $data->nip,
                'catatan' => $data->catatan,
            ]);

            if ($result) {
                foreach ($data->detail as $key => $value) {
                    DetailPermintaanPersediaan::create([
                        'permintaan_persediaan_id' => $result->id,
                        'PermintaanPersediaan_id' => $value->id,
                        'jumlah' => $value->qty,
                        'checked' => true,
                    ]);
                }
                $catatan = 'Permintaa persediaan baru telah dibuat';
                LogPermintaanPersediaanController::createLogPermintaan($result->id, 'ORDER', $catatan, $data->nama);
            }
            DB::commit();
            return response()->json(['data' => $result], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        try {
            $result = PermintaanPersediaan::with('detail.persediaan', 'log')->where('tiket', $id)->first();
            return response()->json(['data' => $result], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $data = json_decode($request->getContent());
        DB::beginTransaction();
        try {
            // Cari dan update data PermintaanPersediaan berdasarkan ID
            $result = PermintaanPersediaan::findOrFail($id);
            $result->update([
                'status' => $data->status
            ]);

            if ($data->status == 'APPROVE') {

                foreach ($data->detail as $key => $value) {
                    $detail = DetailPermintaanPersediaan::find($value->id);
                    if ($detail) {
                        $detail->update([
                            'jumlah_accept' => $value->confirm_permintaan,
                            'status' => $value->checked
                        ]);

                        MutasiPersediaanController::createMutasi($value->inventory_id, 'KREDIT', $value->confirm_permintaan, 'PERMINTAAN DARI TIKE NOMOR #' . $result->tiket);
                    }
                }
                $catatan = 'Permintaan di terima';
                LogPermintaanPersediaanController::createLogPermintaan($result->id, 'APPROVE', $catatan, Auth::user()->name);
            } else {
                $catatan = 'Permintaan di tolak';
                LogPermintaanPersediaanController::createLogPermintaan($result->id, 'REJECT', $catatan, Auth::user()->name);
            }
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
}
