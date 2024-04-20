<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @method static withCount(string $string)
 * @method static create(array $array)
 * @method static insert($toArray)
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'city'];

    public function images(): HasMany
    {
        return $this->hasMany(UserImage::class);
    }
}
