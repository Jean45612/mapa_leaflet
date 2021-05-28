<?php

use App\Models\Rol;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'nombre' => 'SuperAdministrador',
        ]);

        User::create(['email' => 'bartech@admin.com', 'password' => 'admin1234', 'rol_id' => 1]);
    }
}
