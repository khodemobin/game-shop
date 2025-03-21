<?php

namespace App\Http\Controllers\Home;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $product->reviews()->create([
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
            'rating' => $validated['rating'],
        ]);

        return back()->with('success', 'Review submitted for approval');
    }

    public function reply(Request $request, Review $review)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $reply = $review->replies()->create([
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Reply submitted for approval');
    }
}