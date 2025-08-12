<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class MessageController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        // Apply permissions for message management
        $this->middleware('permission:message-list', ['only' => ['index', 'toggleFollowUp']]);
        $this->middleware('permission:message-delete', ['only' => ['destroy', 'toggleFollowUp']]);
    }

public function index()
    {
        $query = Message::query();

        if (auth()->user()->can('heavy-list') && !auth()->user()->can('sparepart-list')) {
            $query->where('category', 'heavyequipment');
        } elseif (auth()->user()->can('sparepart-list') && !auth()->user()->can('heavy-list')) {
            $query->where('category', 'sparepart');
        } elseif (!auth()->user()->can('heavy-list') && !auth()->user()->can('sparepart-list')) {
            // If no permission to see anything
            $query->whereNull('id'); // return empty
        }
        // If both permissions exist, show all

        return inertia('admin/Messages/Index', [
            'messages' => $query->paginate(10)
        ]);
    }


    // public function create(){
    //     return inertia('Messages/Create');
    // }

    public function store (Request $request){
        $this->validate($request, [
            'first_name' => 'required|string|max:55',
            'last_name' => 'required|string|max:55',
            'email' => 'required|email|max:55',
            'phone' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:55',
            'company' => 'nullable|string|max:55',
            'message' => 'required|string',
            'category' => 'required|in:heavyequipment,sparepart,other', // Validasi kategori
        ]);

        Message::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country' => $request->country,
            'company' => $request->company,
            'message' => $request->message,
            'category' => $request->category, // Simpan kategori
        ]);

        return redirect()->back()->with('success', 'Message sent successfully!');
    }

    public function toggleFollowUp($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        $message->followed_up = !$message->followed_up;
        $message->save();

        return response()->json([
            'message' => 'Follow-up status updated.',
            'followed_up' => $message->followed_up
        ]);
    }


    public function destroy($id){
        // Validate the ID
        if (!is_numeric($id)) {
            return response()->json(['error' => 'Invalid message ID'], 400);
        }

        // Find the message by ID
        $message = Message::find($id);

        // Check if the message exists
        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        // Delete the message
        $message->delete();

        // Return a success response
        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
}
