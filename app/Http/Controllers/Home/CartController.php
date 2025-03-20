<?php

namespace App\Http\Controllers\Home;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function add(Product $product)
    {
        $cart = Session::get('cart', []);
        $existingItem = collect($cart)->firstWhere('id', $product->id);

        if ($existingItem) {
            $cart = collect($cart)->map(function ($item) use ($product) {
                if ($item['id'] === $product->id) {
                    $item['quantity']++;
                }
                return $item;
            })->all();
        } else {
            $cart[] = [
                'id' => $product->id,
                'title' => $product->title,
                'price' => $product->price,
                'image' => $product->image,
                'quantity' => 1
            ];
        }

        Session::put('cart', $cart);
        return back();
    }

    public function remove(Product $product)
    {
        $cart = collect(Session::get('cart', []))
            ->reject(fn($item) => $item['id'] === $product->id)
            ->values()
            ->all();

        Session::put('cart', $cart);
        return back();
    }

    public function updateQuantity(Product $product, Request $request)
    {
        $cart = collect(Session::get('cart', []))
            ->map(function ($item) use ($product, $request) {
                if ($item['id'] === $product->id) {
                    $item['quantity'] = max(1, $request->quantity);
                }
                return $item;
            })
            ->all();

        Session::put('cart', $cart);
        return back();
    }
}
