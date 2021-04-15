<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class AuthController extends Controller
{
    
    /* API Authentication */
    public function login(Request $request) {
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {

            // if user is admin assign ability for the auth token
            if($user->is_admin) {
                $scope = ['role:admin'];
            } else {
                $scope = ['role:employee'];
            }

            $token = $user->createToken($user->email.'-auth-token-'.now(), $scope)->plainTextToken;
            $response = ['token' => $token];
            return response($response, 200);
            
        } else {
            $response = ["message" =>'Invalid email or password'];
            return response($response, 401);
        }
    }



    public function logout(Request $request) {
        $user = $request->user();
        $user->tokens()->delete();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }



}
