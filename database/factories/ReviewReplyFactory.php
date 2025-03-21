<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewReplyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'review_id' => Review::factory(),
            'content' => $this->faker->paragraph(),
            'is_approved' => $this->faker->boolean(80),
        ];
    }
}