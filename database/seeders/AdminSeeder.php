<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat user admin
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
        ]);

        // 2. Buat role Admin (hanya jika belum ada)
        $role = Role::firstOrCreate(['name' => 'Admin']);

        // 3. Ambil semua permission dan assign ke role
        $permissions = Permission::pluck('name')->all(); // ← pakai 'name', bukan 'id'
        $role->syncPermissions($permissions);

        // 4. Assign role ke user
        $user->assignRole('Admin'); // ← pakai nama role, bukan ID
    }
}
