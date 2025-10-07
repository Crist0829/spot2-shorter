<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->get('/pusher/beams-auth', function (Request $request) {

    if(!$request->user()->can('notifications')) response()->json(['error' => 'Unauthorized'], 403);


    $userID =  auth()->user()->id; 
    $userIDInQueryParam = $request->user_id;
   
    if ($userID == $userIDInQueryParam) {
        $beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
            "instanceId" => env('PUSHER_BEAMS_INSTANCE_ID'),
            "secretKey" => env('PUSHER_BEAMS_SECRET_KEY'),
        ));
        $beamsToken = $beamsClient->generateToken($userID);
        return response()->json($beamsToken);
    } 

    return response()->json(['error' => 'Unauthorized'], 403);
});
