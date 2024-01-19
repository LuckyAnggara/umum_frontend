<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogPermintaanPersediaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'permintaan_persediaan_id',
        'status',
        'catatan',
        'created_by',
    ];

    protected $casts = [
        'created_at' => 'datetime:d F Y',
    ];

    public function permintaan()
    {
        return $this->hasOne(PermintaanPersediaan::class, 'id', 'permintaan_persediaan_id');
    }
}
