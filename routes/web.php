<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Home\CartController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Home\ReviewController;
use App\Http\Controllers\Home\ProfileController;
use App\Http\Controllers\Home\FavoriteController;

require __DIR__ . '/auth.php';

Route::get('/', [HomeController::class, "index"])->name("home");
Route::get('/products/{product}', [HomeController::class, "show"])->name("products.show");

Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
Route::delete('/cart/remove/{product}', [CartController::class, 'remove'])->name('cart.remove');
Route::patch('/cart/update/{product}', [CartController::class, 'updateQuantity'])->name('cart.update');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name(name: 'profile');
    Route::post('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::post('/reviews/{review}/replies', [ReviewController::class, 'reply'])->name('reviews.reply');

    Route::post('/favorites/{product}/toggle', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
});