<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

readonly class UploadImageService
{
    private const PATH = 'public/images/';

    private const PREFIX = 'img_';

    public function uploadImage(UploadedFile $image): string
    {
        $imageName = uniqid(self::PREFIX, true).'.'.$image->extension();

        $image->storeAs(self::PATH, $imageName);

        return $imageName;
    }
}
