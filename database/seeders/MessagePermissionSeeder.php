<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class MessagePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Buat permission jika belum ada
        Permission::firstOrCreate(['name' => 'heavy-list']);
        Permission::firstOrCreate(['name' => 'sparepart-list']);

        // Contoh: assign ke user ID 1
        $user = User::find(1);
        if ($user) {
            $user->givePermissionTo('heavy-list');
        }
    }
}
