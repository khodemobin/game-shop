<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 29.99, 99.99),
            'image' => $this->faker->imageUrl(440, 440, 'games'),
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'stock' => $this->faker->numberBetween(0, 100),
            'category_id' => \App\Models\Category::inRandomOrder()->first()->id,
        ];
    }
}
