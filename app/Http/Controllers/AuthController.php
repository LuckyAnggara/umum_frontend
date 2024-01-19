<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'nip' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('nip', $request->nip)->first();

        $credentials = request(['nip', 'password']);
        if (!Auth::attempt($credentials)) {
            return response([
                'success'   => false,
                'message' => ['These credentials do not match our records.']
            ], 404);
        }

        $token = $user->createToken('Api-token')->plainTextToken;

        $response = [
            'success'   => true,
            'user'      => $user,
            'token'     => $token,
            'message'   => 'Berhasil Login'
        ];
        return response($response, 201);
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'nip' => 'required',
            'password' => 'required',
            'confirm-password' => 'required|same:password'
        ]);

        $data = $request->except('confirm-password', 'password');
        $data['password'] = Hash::make($request->password);

        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = [
            'success'   => true,
            'user'      => $user,
            'token'     => $token,
            'message'   => 'Berhasil Register'
        ];
        return response($response, 201);
    }

    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();
        return [
            'success'   => true,
            'message' => 'user logged out'
        ];
    }

    public function user(Request $request)
    {
        return Auth::user();
    }
}
