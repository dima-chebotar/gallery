<?php

namespace App\Http\Dto;

use Exception;

class ErrorMessageDto
{
    public string $value;

    public function __construct(string $message, Exception $e)
    {
        $this->value = $message.PHP_EOL
            .$e->getMessage().PHP_EOL
            .$e->getTraceAsString();
    }
}
