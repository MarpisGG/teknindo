<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Blog;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = Blog::all();

        foreach ($blogs as $blog) {
            Comment::create([
                'blog_id' => $blog->id,
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'comment' => 'Ini komentar dari John di blog ' . $blog->title,
            ]);

            Comment::create([
                'blog_id' => $blog->id,
                'name' => 'Jane Smith',
                'email' => 'janesmith@example.com',
                'comment' => 'Komentar tambahan di blog ' . $blog->title,
            ]);
        }
    }
}
