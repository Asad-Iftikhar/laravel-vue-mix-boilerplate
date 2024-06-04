<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'layouts.main-layout-vue');
// Move All routes to main-layout-vue to handle routes through Vue App
Route::view('{any}', 'layouts.main-layout-vue')->where('any', '.*');

