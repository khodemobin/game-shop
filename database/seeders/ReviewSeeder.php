<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\ReviewReply;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $users = User::all();

        foreach ($products as $product) {
            $reviewCount = rand(0, 5);

            for ($i = 0; $i < $reviewCount; $i++) {
                $review = Review::factory()->create([
                    'product_id' => $product->id,
                    'user_id' => $users->random()->id,
                ]);

                $replyCount = rand(0, 3);
                for ($j = 0; $j < $replyCount; $j++) {
                    ReviewReply::factory()->create([
                        'review_id' => $review->id,
                        'user_id' => $users->random()->id,
                    ]);
                }
            }
        }
    }
}