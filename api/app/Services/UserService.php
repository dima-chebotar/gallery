<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\UploadedFile;

readonly class UserService
{
    public function __construct(
        private UploadImageService $uploadImageService
    ) {
    }

    public function createUser(string $name, string $city, UploadedFile $image): User
    {
        $user = User::create([
            'name' => $name,
            'city' => $city,
        ]);
        $imageName = $this->uploadImageService->uploadImage($image);

        $user->images()->create(['image' => $imageName]);

        return $user;
    }
}
