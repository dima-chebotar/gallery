<?php

namespace App\Http\Dto;

use App\Status;

class ResponseMessageDto
{
    public string $message;

    public Status $type;

    public ?array $data;

    public function __construct(string $message, Status $type, ?array $data = null)
    {
        $this->message = $message;
        $this->type = $type;
        $this->data = $data;
    }
}
