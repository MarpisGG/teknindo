import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Blog {
    id: number;
    title: string;
    slug?: string;
    thumbnail?: string;
    likes?: number;
    views?: number;
    user?: { name: string };
    created_at?: string;
    content?: {
        type: 'text' | 'image';
        content?: string;
        image?: string;
        order: number;
    }[];
}

interface Comment {
    id: number;
    name: string;
    email?: string;
    comment: string;
    created_at: string;
}

const Show: React.FC = () => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = usePage().props as { slug?: string };

    const fetchBlog = async () => {
        if (!slug) {
            setError('No blog identifier found');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/blogs/${slug}`);
            const commentsResponse = await axios.get(`/api/blogs/${slug}/comments`);
            setBlog(response.data);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Failed to load blog:', error);
            setError('Failed to load blog details');
            Swal.fire('Error', 'Failed to load blog details.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const handleDelete = async () => {
        if (!blog) return;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/blogs/${blog.id}`);
                Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
                window.location.href = '/admin/blogs';
            } catch (error) {
                console.error('Delete error:', error);
                Swal.fire('Error!', 'There was an error deleting the blog.', 'error');
            }
        }
    };

    const handleDeleteComment = async (id: number) => {
        const result = await Swal.fire({
            title: 'Delete Comment?',
            text: 'This comment will be permanently removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/comments/${id}`);
                setComments((prev) => prev.filter((c) => c.id !== id));
                Swal.fire('Deleted!', 'Comment deleted successfully.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'Failed to delete comment.', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="animate-pulse text-xl text-gray-600">Loading blog...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-red-50">
                <div className="text-xl text-red-700">{error}</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">Blog not found.</div>
            </div>
        );
    }

    return (
        <div className="blog container mx-auto px-4 py-10">
            <div className="mx-auto max-w-6xl">
                <Link href="/admin/blogs" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
                    ← Back to Blogs
                </Link>

                <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    {blog.thumbnail && (
                        <img
                            src={`${blog.thumbnail}`}
                            alt={blog.title}
                            className="max-h-64 w-full bg-gray-100 object-contain"
                            style={{ display: 'block', margin: '0 auto' }}
                        />
                    )}

                    <div className="p-8">
                        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">{blog.title}</h1>

                        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <span className="mr-1">👤</span>
                                <span>
                                    By <span className="font-medium text-gray-700">{blog.user?.name ?? 'Anonymous'}</span>
                                </span>
                            </div>

                            {blog.created_at && (
                                <div className="flex items-center">
                                    <span className="mr-1">📅</span>
                                    <span>
                                        {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            )}

                            {blog.views !== undefined && (
                                <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-gray-700">
                                    <span className="mr-1">👁️</span>
                                    <span>{blog.views.toLocaleString()} views</span>
                                </div>
                            )}

                            {blog.likes !== undefined && (
                                <div className="flex items-center rounded-full bg-pink-100 px-3 py-1.5 text-pink-600">
                                    <span className="mr-1">❤️</span>
                                    <span>{blog.likes.toLocaleString()} likes</span>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-slate max-w-none">
                            {Array.isArray(blog.content) &&
                                blog.content
                                    .sort((a, b) => a.order - b.order)
                                    .map((block, index) =>
                                        block.type === 'text' ? (
                                            <div key={index} dangerouslySetInnerHTML={{ __html: block.content || '' }} className="mb-6" />
                                        ) : block.type === 'image' && block.image ? (
                                            <div key={index} className="mb-6">
                                                <img
                                                    src={`${block.image}`}
                                                    alt={`Image Block ${index + 1}`}
                                                    className="max-h-48 rounded-lg object-contain"
                                                    style={{ maxWidth: '50%' }}
                                                />
                                            </div>
                                        ) : null,
                                    )}
                        </div>

                        <div className="mt-10 flex justify-start gap-4 border-t pt-6">
                            <Link
                                href={`/admin/blogs/${blog.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Edit size={18} />
                                Edit
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    </div>
                </article>

                {/* Comments Table */}
                <div className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold">User Comments</h2>
                    <div className="overflow-x-auto rounded-lg border bg-white shadow">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="border-b px-4 py-2">Name</th>
                                    <th className="border-b px-4 py-2">Email</th>
                                    <th className="border-b px-4 py-2">Comment</th>
                                    <th className="border-b px-4 py-2">Date</th>
                                    <th className="border-b px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <tr key={comment.id}>
                                            <td className="border-b px-4 py-2">{comment.name}</td>
                                            <td className="border-b px-4 py-2">{comment.email || '-'}</td>
                                            <td className="border-b px-4 py-2">{comment.comment}</td>
                                            <td className="border-b px-4 py-2">{new Date(comment.created_at).toLocaleString()}</td>
                                            <td className="border-b px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                            No comments yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
