<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use Illuminate\Support\Str;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            Message::create([
                'first_name' => fake()->firstName(),
                'last_name'  => fake()->lastName(),
                'email'      => fake()->unique()->safeEmail(),
                'phone'      => fake()->phoneNumber(),
                'country'    => fake()->country(),
                'company'    => fake()->company(),
                'message'    => fake()->paragraph(),
            ]);
        }
    }
}
