<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InitController extends Controller
{
    public function init() {
        //Mock-Data
        return [
            "success" => true,
            "currency" => [
                [
                    "name"=>"EUR",
                    "icon"=>"€"
                ],
                [
                    "name"=>"USD",
                    "icon"=>"$"
                ],
                [
                    "name"=>"GBP",
                    "icon"=>"£"
                ]
            ],
            "c_currency" => [
                [
                    "name"=>"BTC",
                    "icon"=>"BTC"
                ],
            ]
                   
        ];
    }
}