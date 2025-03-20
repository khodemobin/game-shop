<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailVerification;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailVerificationController extends Controller
{
    public function send(Request $request)
    {
        SendEmailVerification::dispatch($request->user());
        return back()->with('status', 'Verification link will be sent shortly!');
    }

    public function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->intended('/')->with('status', 'Email verified!');
    }
}