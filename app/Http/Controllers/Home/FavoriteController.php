<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    public function index(Request $request)
    {
        return $request->user()
            ? $request->user()->favorites()->pluck('products.id')
            : collect([]);
    }


    public function toggle(Request $request, Product $product)
    {
        $user = $request->user();

        if ($product->isFavoriteByUser($user)) {
            $user->favorites()->detach($product->id);
        } else {
            $user->favorites()->attach($product->id);
        }

        return back();
    }
}