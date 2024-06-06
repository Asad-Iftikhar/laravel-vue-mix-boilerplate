<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [\App\Http\Controllers\Api\Auth\AuthController::class, 'adminLogin']);
    Route::post('/logout', [\App\Http\Controllers\Api\Auth\AuthController::class, 'adminLogout']);
});

// Authenticated Routes
Route::group(['prefix' => 'auth', 'middleware' => ['auth']], function () {
    Route::post('/checkLoggedIn', [\App\Http\Controllers\Api\Auth\AuthController::class, 'adminCheckLoggedIn']);
});