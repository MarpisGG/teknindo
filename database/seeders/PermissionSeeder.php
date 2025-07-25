<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {

        // list = melihat data
        // create = membuat data
        // edit = mengedit data
        // delete = menghapus data

        $permissions = [
            'user-list',    
            'user-create',
            'user-edit',
            'user-delete',
            'role-list',
            'role-create',
            'role-edit',
            'role-delete',
            'message-list',
            'message-delete',
            'subscription-list',
            'subscription-delete',
            'blog-list',
            'blog-create',
            'blog-edit',
            'blog-delete',
            'job-list',
            'job-create',
            'job-edit',
            'job-delete',
            'applicant-list',
            'applicant-edit',
            'applicant-delete',
            'product-list',
            'product-create',
            'product-edit',
            'product-delete',
            'category-list',
            'category-create',
            'category-edit',
            'category-delete',
            'type-list',
            'type-create',
            'type-edit',
            'type-delete',
            'comment-list',
            'comment-delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
        
}
