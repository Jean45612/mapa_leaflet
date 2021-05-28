<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use App\Http\Requests\Usuario;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Login $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        $user = User::where('email', $request->email)
            ->where('estado', '1')
            ->whereHas('rol', function ($q) {
                $q->where('estado', '1');
            })
            ->first();

        if (!$user) {
            return response()->json(['error' => 'Email o contraseña incorrectos.'], 422);
        }

        if (!$token = $this->guard()->attempt($credentials)) {
            return response()->json(['error' => 'Email o contraseña incorrectos.'], 422);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    public function guard()
    {
        return Auth::guard();
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Cerro sesión exitosamente.']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $refresh_token = $this->guard()->refresh();

        Auth::user(JWTAuth::setToken($refresh_token)->toUser());
        return $this->respondWithToken($refresh_token);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user' => $this->guard()->user()->load('rol')
        ]);
    }
}
