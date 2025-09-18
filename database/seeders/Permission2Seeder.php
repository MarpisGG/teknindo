<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class Permission2Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'testimonial-list',
            'testimonial-create',
            'location-list',
            'location-create',
            'location-footer-list',
            'location-footer-create',
            'company-list',
            'company-create',
            'landing-video-list',
            'landing-video-create',
            'customer-list',
            'customer-create',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}
