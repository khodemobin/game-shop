<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category');

        $productsQuery = Product::query()
            ->with(['category'])
            ->when($categoryId, function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            });

        $featuredProducts = (clone $productsQuery)
            ->orderBy('rating', 'desc')
            ->take(5)
            ->get();

        $newReleases = (clone $productsQuery)
            ->latest()
            ->take(4)
            ->get();

        $topRated = (clone $productsQuery)
            ->orderBy('rating', 'desc')
            ->take(4)
            ->get();

        $categories = Category::all();


        $userFavorites = app(FavoriteController::class)->index($request);

        return Inertia::render('Home/Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newReleases' => $newReleases,
            'topRated' => $topRated,
            'userFavorites' => $userFavorites,
            'filters' => [
                'category' => $categoryId
            ]
        ]);
    }

    public function show(Request $request, Product $product)
    {
        $relatedProducts = Product::query()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $product->load([
            'category',
            'reviews' => function ($query) {
                $query->where('is_approved', true)
                    ->with([
                        'user',
                        'replies' => function ($query) {
                            $query->where('is_approved', true)->with('user');
                        }
                    ]);
            }
        ]);

        return Inertia::render('Product/Product', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'isFavorite' => $request->user() ? $product->isFavoriteByUser($request->user()) : false
        ]);
    }
}
