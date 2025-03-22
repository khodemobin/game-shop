<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Category;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {

        $categories = Category::all();



        $menus = [
            [
                'title' => 'Home',
                'route' => 'home',
                'order' => 1,
            ],
            [
                'title' => 'Categories',
                'route' => null,
                'order' => 2
            ]
        ];

        foreach ($categories as $category) {
            $menus[1]["children"][] = [
                'title' => $category->name,
                'route' => 'home',
                'url' => "/?category={$category->id}",
                'order' => 1,
            ];
        }

        foreach ($menus as $menuData) {
            $children = $menuData['children'] ?? [];
            unset($menuData['children']);

            $menu = Menu::create($menuData);

            foreach ($children as $child) {
                $child['parent_id'] = $menu->id;
                Menu::create($child);
            }
        }
    }
}