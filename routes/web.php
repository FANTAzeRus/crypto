<?php

use App\Http\Controllers\StatController;
use Illuminate\Support\Facades\Route;

Route::get('/add_stat', [StatController::class, 'generateNewRecord']);
Route::view('/test-route', 'addstat');

Route::view('/{any}', 'welcome')->where('any', '.*');
