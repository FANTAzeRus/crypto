<?php

use App\Http\Controllers\StatController;
use Illuminate\Support\Facades\Route;

Route::view('/{any}', 'welcome')->where('any', '.*');
