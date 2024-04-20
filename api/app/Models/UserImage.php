<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static insert($toArray)
 */
class UserImage extends Model
{
    use HasFactory;

    protected $fillable = ['image'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
