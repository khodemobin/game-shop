<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->count(20)->create([
            "image" => "https://image.api.playstation.com/vulcan/ap/rnd/202501/2904/555d1ee5094c3c06e59a70ae95388b8114bcb2fadd2f0a35.png"
        ]);
    }
}
