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

    public function index(){
        return inertia('admin/Messages/Index', [
            'messages' => Message::paginate(10)
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
        ]);

        Message::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country' => $request->country,
            'company' => $request->company,
            'message' => $request->message,
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
