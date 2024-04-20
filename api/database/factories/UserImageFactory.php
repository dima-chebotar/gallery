<?php

namespace Database\Factories;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserImage>
 */
class UserImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     *
     * @throws RandomException
     */
    public function definition(): array
    {
        return [
            'user_id' => random_int(1, DatabaseSeeder::USER_COUNT),
            'image' => fake()->imageUrl(),
        ];
    }
}
