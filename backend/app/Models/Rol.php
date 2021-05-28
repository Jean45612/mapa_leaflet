<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = "roles";

    protected $fillable = [
        'nombre', 'estado', 'insert_user_id', 'edit_user_id'
    ];

    public function insert()
    {
        return $this->belongsTo(User::class, 'insert_user_id');
    }

    public function edit()
    {
        return $this->belongsTo(User::class, 'edit_user_id');
    }
}
