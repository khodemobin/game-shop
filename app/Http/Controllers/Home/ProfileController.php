<?php

namespace App\Http\Controllers\Home;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Profile/Profile', );
    }

    public function personalInfo()
    {
        return Inertia::render('Profile/Profile');
    }

    public function accountSettings()
    {
        return Inertia::render('Profile/Profile');
    }

    public function orderHistory()
    {
        return Inertia::render('Profile/Profile');
    }

    public function favorites()
    {
        return Inertia::render('Profile/Profile', [
            'favorites' => auth()->user()->favorites()->with('category')->get()
        ]);
    }

    public function tickets()
    {
        return Inertia::render('Profile/Profile', [
            'tickets' => auth()->user()->tickets()->with('replies')->latest()->get()
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        if ($request->has("password")) {
            if (!Hash::check($request->current_password, $user->password)) {
                return redirect()->back()->with('flash.error', 'Current Password in wrong.');
            }
        }

        $user->name = $request->input('name', $user->name);
        $user->email = $request->input('email', $user->name);
        $user->password = $request->has("password") ? bcrypt($request->password) : $user->password;

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return redirect()->back()->with('flash.success', 'Profile updated successfully.');
    }
}