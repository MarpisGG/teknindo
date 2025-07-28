import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

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
    const [success, setSuccess] = useState<string | null>(null);

    const fetchBlog = async () => {
        if (!slug) {
            setError('No blog identifier found');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/blogs/${slug}`);
            const commentsResponse = await axios.get(`/api/blogs/${slug}/comments`);
            setBlog(response.data);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Failed to load blog:', error);
            setError('Failed to load blog details');
        } finally {
            setLoading(false);
        }
    };

    const likeBlog = async (id: number) => {
        try {
            const res = await axios.post(`/api/blogs/${id}/like`);
            console.log('Liked:', res.data.likes);
        } catch (err) {
            console.error('Like error:', err);
        }
    };

    const unlikeBlog = async (id: number) => {
        try {
            const res = await axios.post(`/api/blogs/${id}/unlike`);
            console.log('Unliked:', res.data.likes);
        } catch (err) {
            console.error('Unlike error:', err);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [slug]);

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
        <>
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="mx-auto flex hidden max-w-6xl justify-center md:flex">
                <nav className="mb-6 w-full pt-4 text-sm text-black">
                    <ol className="flex flex-wrap items-center space-x-2">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <span className="mx-1">›</span>
                        </li>
                        <li>
                            <a href="/blogs" className="hover:underline">
                                Blogs
                            </a>
                        </li>
                        <li>
                            <span className="mx-1">›</span>
                        </li>
                        <li className="max-w-xs truncate font-bold text-gray-800" title={blog.title}>
                            {blog.title}
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="blog container mx-auto px-4 py-4">
                <div className="mx-auto max-w-6xl">
                    {blog.thumbnail && (
                        <img src={blog.thumbnail} alt={blog.title} className="mb-4 max-h-[72vh] w-full rounded-xl bg-gray-100 object-fill" />
                    )}
                    <article className="overflow-hidden">
                        <div className="">
                            <h1 className="my-8 text-center text-4xl font-extrabold">{blog.title}</h1>

                            <div className="text-md mb-8 border-b pb-6">
                                <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
                                    {/* Author & Date */}
                                    <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-6">
                                        <div className="flex items-center">
                                            <span className="mr-1">👤</span>
                                            <span>
                                                By <span className="font-medium">{blog.user?.name ?? 'Anonymous'}</span>
                                            </span>
                                        </div>

                                        {blog.created_at && (
                                            <div className="flex items-center">
                                                <span className="mr-1">📅</span>
                                                <span>
                                                    {new Date(blog.created_at).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Views, Likes, Share */}
                                    <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-4">
                                        {blog.views !== undefined && (
                                            <div className="md:bg-grey-100 flex items-center gap-x-2 rounded-full bg-pink-100 bg-transparent md:px-3 md:py-1.5">
                                                <span className="mr-1">👁️</span>
                                                <span>{blog.views.toLocaleString()} views</span>
                                            </div>
                                        )}

                                        {blog.likes !== undefined && (
                                            <div className="flex items-center gap-x-2 rounded-full bg-pink-100 bg-transparent text-pink-600 md:bg-pink-100 md:px-3 md:py-1.5">
                                                <button
                                                    onClick={() => {
                                                        if ((blog.likes ?? 0) === 0) {
                                                            likeBlog(blog.id);
                                                            setBlog({ ...blog, likes: (blog.likes ?? 0) + 1 });
                                                        } else {
                                                            unlikeBlog(blog.id);
                                                            setBlog({ ...blog, likes: Math.max((blog.likes ?? 1) - 1, 0) });
                                                        }
                                                    }}
                                                    className="flex cursor-pointer items-center gap-2 rounded text-xs md:px-2 md:py-1"
                                                    aria-label={blog.likes && blog.likes > 0 ? 'Unlike' : 'Like'}
                                                >
                                                    {blog.likes && blog.likes > 0 ? (
                                                        <span className="mr-2 text-pink-500 md:mr-1">❤️</span>
                                                    ) : (
                                                        <span className="mr-2 text-pink-500 md:mr-1">🤍</span>
                                                    )}
                                                    <span>{blog.likes.toLocaleString()} likes</span>
                                                </button>
                                            </div>
                                        )}

                                        {/* Share Buttons */}
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-semibold text-sm md:text-base">Share</p>
                                            <a
                                                href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - ${window.location.href}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on WhatsApp"
                                                className="text-xl text-green-500 hover:text-green-600"
                                            >
                                                <FaWhatsapp className="h-6 w-6" />
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on Facebook"
                                                className="text-xl text-blue-600 hover:text-blue-700"
                                            >
                                                <FaFacebook className="h-6 w-6" />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on Instagram"
                                                className="text-xl text-pink-500 hover:text-pink-600"
                                            >
                                                <FaInstagram className="h-6 w-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
                                                        src={block.image}
                                                        alt={`Image Block ${index + 1}`}
                                                        className="max-h-48 rounded-lg object-contain"
                                                        style={{ maxWidth: '50%' }}
                                                    />
                                                </div>
                                            ) : null,
                                        )}
                            </div>
                        </div>
                    </article>
                    <div className="mt-12">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Leave a Comment</h2>
                        <form
                            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                const form = e.currentTarget;

                                const formData = new FormData(form);
                                const name = formData.get('name') as string;
                                const email = formData.get('email') as string;
                                const comment = formData.get('comment') as string;

                                try {
                                    await axios.post(`/api/blogs/${blog.id}/comments`, {
                                        name,
                                        email,
                                        comment,
                                    });

                                    setComments((prev) => [
                                        {
                                            id: Date.now(),
                                            name,
                                            email,
                                            comment,
                                            created_at: new Date().toISOString(),
                                        },
                                        ...prev,
                                    ]);

                                    form.reset();
                                    setSuccess('✅ Your comment has been submitted.');
                                    setTimeout(() => setSuccess(null), 4000);
                                } catch (err) {
                                    console.error('Failed to submit comment', err);
                                }
                            }}
                            className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    name="name"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Comment</label>
                                <textarea
                                    name="comment"
                                    required
                                    rows={4}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-100"
                                ></textarea>
                            </div>

                            {success && (
                                <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 ring-1 ring-green-300">{success}</div>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-md bg-yellow-500 px-4 py-2 font-semibold text-white transition hover:bg-yellow-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Comments section */}
                    <div className="mt-8">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Comments</h2>
                        {comments.length === 0 ? (
                            <p className="text-gray-500">No comments yet.</p>
                        ) : (
                            <ul className="space-y-4">
                                {comments.map((comment) => (
                                    <li key={comment.id} className="flex items-start gap-4 rounded-lg border p-4 shadow-sm">
                                        {/* Avatar - inisial nama */}
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">
                                            {comment.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{comment.name}</p>
                                            <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString('en-GB')}</p>
                                            <p className="mt-2 text-sm text-gray-700">{comment.comment}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
};

export default Show;
