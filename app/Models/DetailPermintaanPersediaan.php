<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPermintaanPersediaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'permintaan_persediaan_id',
        'inventory_id',
        'jumlah',
    ];

    protected $casts = [
        'created_at' => 'datetime:d F Y',
    ];

    public function persediaan()
    {
        return $this->hasOne(Inventory::class, 'id', 'inventory_id');
    }
}
