<?php

namespace App\Http\Controllers;

use App\Models\LogPermintaanPersediaan;
use Illuminate\Http\Request;

class LogPermintaanPersediaanController extends Controller
{
    static function createLogPermintaan($permintaan_persediaan_id, $status, $catatan, $created_by)
    {
        // Membuat objek LogPermintaanPersediaan
        $log_permintaan = LogPermintaanPersediaan::create([
            'permintaan_persediaan_id' => $permintaan_persediaan_id,
            'status' => $status,
            'catatan' => $catatan,
            'created_by' => $created_by,
        ]);

        // Jika perlu, Anda dapat mengembalikan objek yang telah dibuat
        return $log_permintaan;
    }
}
