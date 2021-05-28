<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->unsignedBigInteger('rol_id');
            $table->foreign('rol_id')->references('id')->on('roles');
            $table->char('estado', 1)->comment('0-Inactivo/1-Activo')->default(1);
            $table->unsignedBigInteger('insert_user_id')->comment('Usuario que hizo el registro')->nullable();
            $table->foreign('insert_user_id')->references('id')->on('users');
            $table->unsignedBigInteger('edit_user_id')->comment('Usuario que editó el registro')->nullable();
            $table->foreign('edit_user_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->unsignedBigInteger('insert_user_id')->comment('Usuario que hizo el registro')->nullable();
            $table->foreign('insert_user_id')->references('id')->on('users');

            $table->unsignedBigInteger('edit_user_id')->comment('Usuario que editó el registro')->nullable();
            $table->foreign('edit_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('users');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
