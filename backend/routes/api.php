<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/login', 'App\Http\Controllers\API\AuthController@login');

Route::middleware(['auth:api'])->namespace('App\Http\Controllers\API')->group(function() {

    Route::post('auth/logout', 'App\Http\Controllers\API\AuthController@logout');
    
    Route::get('users', 'UserController@index')->middleware('sanctum.abilities:role:admin');
    Route::get('users/{id}', 'UserController@show')->middleware('sanctum.abilities:role:admin');
    Route::post('users', 'UserController@store')->middleware('sanctum.abilities:role:admin');
    Route::patch('users/{id}', 'UserController@update')->middleware('sanctum.abilities:role:admin');
    Route::delete('users/{id}', 'UserController@destroy')->middleware('sanctum.abilities:role:admin');

    Route::get('users/{id}/feedback-requests', 'PerformanceReviewController@feedback_requests');
    Route::get('users/{id}/feedback-requests/{feedback_id}', 'PerformanceReviewController@feedback_request_show');
    Route::patch('users/{id}/feedback-requests/{feedback_id}', 'PerformanceReviewController@feedback_request_update');

    Route::get('reviews', 'PerformanceReviewController@index')->middleware('sanctum.abilities:role:admin');
    Route::get('reviews/{id}', 'PerformanceReviewController@show')->middleware('sanctum.abilities:role:admin');
    Route::get('reviews/{id}/reviewees', 'PerformanceReviewController@reviewee_index')->middleware('sanctum.abilities:role:admin');
    Route::get('reviews/{id}/reviewees/{reviewee_id}', 'PerformanceReviewController@reviewee_show')->middleware('sanctum.abilities:role:admin');
    Route::post('reviews', 'PerformanceReviewController@store')->middleware('sanctum.abilities:role:admin');
    Route::patch('reviews/{id}', 'PerformanceReviewController@update')->middleware('sanctum.abilities:role:admin');


    Route::get('reviews/{id}/reviewees/{reviewee_id}/feedbacks', 'PerformanceReviewController@feedback_index')->middleware('sanctum.abilities:role:admin');
    Route::get('reviews/{id}/reviewees/{reviewee_id}/reviewers', 'PerformanceReviewController@reviewer_index')->middleware('sanctum.abilities:role:admin');




});