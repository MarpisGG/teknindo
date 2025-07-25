<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 sample subscriptions
        for ($i = 0; $i < 10; $i++) {
            \App\Models\Subscription::create([
                'email' => fake()->unique()->safeEmail(),
            ]);
        }
    }
}
