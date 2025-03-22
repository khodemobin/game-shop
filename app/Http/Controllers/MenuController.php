<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Collection;

class MenuController extends Controller
{
    public function getMenus(): Collection
    {
        return Menu::where('parent_id', null)
            ->where('is_active', true)
            ->with([
                'children' => function ($query) {
                    $query->where('is_active', true);
                }
            ])
            ->orderBy('order')
            ->get();
    }
}