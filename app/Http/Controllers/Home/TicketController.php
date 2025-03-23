<?php

namespace App\Http\Controllers\Home;

use App\Models\Ticket;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\ReplyTicketRequest;

class TicketController extends Controller
{
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('tickets', 'public');
        }

        $request->user()->tickets()->create($validated);

        return back()->with('flash.success', 'Ticket created successfully.');
    }

    public function reply(ReplyTicketRequest $request, Ticket $ticket)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('tickets', 'public');
        }

        $ticket->replies()->create([
            'message' => $validated['message'],
            'image' => $validated['image'] ?? null,
            'user_id' => $request->user()->id
        ]);

        return back()->with('flash.success', 'Reply sent successfully.');
    }

    public function close(Ticket $ticket)
    {
        $ticket->update(['status' => 'closed']);
        return back()->with('flash.success', 'Ticket closed successfully.');
    }
}