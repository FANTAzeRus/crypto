<?php

use App\Http\Controllers\ConvertController;
use App\Http\Controllers\InitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/init", [InitController::class, 'init']);
Route::get("/convert/{currency}", [ConvertController::class, 'convert']);
