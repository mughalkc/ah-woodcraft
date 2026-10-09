<?php
use Illuminate\Support\Facades\Route;use App\Http\Controllers\{ProductController,AdminController};
Route::get('/products',[ProductController::class,'index']);
Route::post('/admin/login',[AdminController::class,'login'])->middleware('throttle:5,1');
Route::middleware('admin.token')->prefix('admin')->group(function(){Route::post('/logout',[AdminController::class,'logout']);Route::post('/products',[AdminController::class,'store']);Route::put('/products/{product}',[AdminController::class,'update']);Route::delete('/products/{product}',[AdminController::class,'destroy']);});
