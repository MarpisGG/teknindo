<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslateController extends Controller
{
    public function translate(Request $request)
    {
        $text = $request->query('text');
        $target = $request->query('target', 'en');

        if (!$text) {
            return response()->json(['error' => 'Missing text parameter.'], 400);
        }

        try {
            $response = Http::get('https://translate.googleapis.com/translate_a/single', [
                'client' => 'gtx',
                'sl' => 'auto',
                'tl' => $target,
                'dt' => 't',
                'q' => $text,
            ]);

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
