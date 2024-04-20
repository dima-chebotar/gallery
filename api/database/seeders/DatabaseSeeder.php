<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserImage;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public const USER_COUNT = 10000;

    private const USER_IMAGE_COUNT = 100000;

    private const CHUNK_SIZE = 1000;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->insert(new User(), self::USER_COUNT);
        $this->insert(new UserImage(), self::USER_IMAGE_COUNT);
    }

    private function insert(User|UserImage $model, int $count): void
    {
        $items = $model::factory()
            ->count($count)
            ->make();

        $chunks = $items->chunk(self::CHUNK_SIZE);

        $chunks->each(function ($chunk) use ($model) {
            $model::insert($chunk->toArray());
        });
    }
}
