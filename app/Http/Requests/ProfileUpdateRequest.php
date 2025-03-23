<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],

            "current_password" => ["required_with:password", "string"],
            "password" => "sometimes|string|min:8|confirmed",
        ];
    }
}
