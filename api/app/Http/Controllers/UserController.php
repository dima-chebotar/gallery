<?php

namespace App\Http\Controllers;

use App\Http\Dto\ErrorMessageDto;
use App\Http\Dto\ResponseMessageDto;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use App\Status;
use Exception;
use Illuminate\Http\JsonResponse;
use Log;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ) {
    }

    public function index(): UserResource|JsonResponse
    {
        try {
            $users = User::withCount('images')
                ->orderByDesc('images_count')
                ->take(10)
                ->get();

            return new UserResource($users);
        } catch (Exception $e) {
            $message = new ErrorMessageDto('Error while fetching users', $e);
            Log::error($message->value);

            return response()
                ->json(new ResponseMessageDto('Something went wrong.', Status::Error),
                    Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->userService
                ->createUser($request->getName(), $request->getCity(), $request->getImage());

            return response()
                ->json(new ResponseMessageDto(
                    'User created successfully.',
                    Status::Success, $user->toArray()),
                    Response::HTTP_CREATED);
        } catch (Exception $e) {
            $message = new ErrorMessageDto('Error while creating user', $e);
            Log::error($message->value);

            return response()
                ->json(new ResponseMessageDto('Something went wrong.', Status::Error),
                    Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
