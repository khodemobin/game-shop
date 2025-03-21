<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $platforms = $this->faker->randomElements(['PS5', 'PS4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch'], rand(1, 3));
        $isPreOrder = $this->faker->boolean(30);
        $releaseDate = $isPreOrder ? $this->faker->dateTimeBetween('+1 month', '+1 year') : $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 19.99, 99.99),
            'image' => $this->faker->imageUrl(640, 480, 'games'),
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'category_id' => rand(1, 5),
            'platforms' => $platforms,
            'release_date' => $releaseDate,
            'is_pre_order' => $isPreOrder,
            'specs' => [
                ['label' => 'Genre', 'value' => implode(', ', $this->faker->randomElements(['Action', 'Adventure', 'RPG', 'Strategy', 'Sports'], rand(1, 3)))],
                ['label' => 'Publisher', 'value' => $this->faker->company()],
                ['label' => 'Release date', 'value' => $releaseDate->format('F d, Y')],
                ['label' => 'Platform', 'value' => implode(', ', $platforms)],
                ['label' => 'Age rating', 'value' => $this->faker->randomElement(['PEGI 3', 'PEGI 7', 'PEGI 12', 'PEGI 16', 'PEGI 18'])],
            ],
            'media' => [
                [
                    'type' => 'image',
                    'url' => "https://image.api.playstation.com/vulcan/ap/rnd/202501/2904/555d1ee5094c3c06e59a70ae95388b8114bcb2fadd2f0a35.png",
                ],
                [
                    'type' => 'video',
                    'url' => 'https://example.com/trailer.mp4',
                    'thumbnail' => $this->faker->imageUrl(640, 480, 'games'),
                ],
                [
                    'type' => 'image',
                    'url' => "https://image.api.playstation.com/vulcan/ap/rnd/202501/2904/555d1ee5094c3c06e59a70ae95388b8114bcb2fadd2f0a35.png",
                ],
                [
                    'type' => 'image',
                    'url' => "https://image.api.playstation.com/vulcan/ap/rnd/202501/2904/555d1ee5094c3c06e59a70ae95388b8114bcb2fadd2f0a35.png",
                ],
            ],
        ];
    }
}
