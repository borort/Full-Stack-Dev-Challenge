<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    
    public function index() {
        
        /*
        $user = Auth::user();
        if(!$user->tokenCan('role:admin')) {
            $response = ['message' => 'Access denied'];
            return response($response, 403);
        }
        */
        $users = User::all();
        return response($users);
        
    }


    public function show($id) {
        $user = User::find($id);
        if(!$user) {
            $response = ['message' => 'User not found'];
            return response($response, 200);
        }
        return response($user);
    }


    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            //'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());
        $response = ['message' => 'User created', $user];
        return response($response, 200);
    }




    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,id,'. $id,
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        //dd($request);

        $user = User::find($id);

        if(!$user) {
            $response = ['message' => 'User not found'];
            return response($response, 200);
        }

        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        $user->position = $request->input('position');
        $user->password= Hash::make($request->input('password'));

        $user->save();
        $response = ['message' => 'User updated', $user];
        return response($response, 200);


    }


    public function destroy($id) {
        $user = User::find($id);
        if(!$user) {
            $response = ['message' => 'User not found'];
            return response($response, 200);
        }

        $user->delete();
        $response = ['message' => 'User deleted'];
        return response($response, 200);

    }








}
