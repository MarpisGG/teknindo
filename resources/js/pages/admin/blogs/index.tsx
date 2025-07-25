import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal2 from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

interface Blog {
    id: number;
    slug?: string;
    title: string;
    thumbnail?: string;
    likes?: number;
    views?: number;
    user?: {
        name: string;
    };
    image?: { image: string }[];
    content?: { content: string }[];
    created_at?: string;
}

const BlogIndex: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchBlogs = async (page = 1) => {
        try {
            const response = await axios.get('/api/blogs');
            setBlogs(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: number) => {
        const confirm = await swal2.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`/blogs/${id}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });
            await swal2.fire('Deleted!', 'Blog has been deleted.', 'success');
            fetchBlogs();
        } catch (error) {
            console.error(error);
            await swal2.fire('Error!', 'Failed to delete blog.', 'error');
        }
    };

    const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            {/* Header + Search */}
            {/* Navbar */}
            <NavbarAdmin />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Blog Management</h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                    />
                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                    >
                        ← Back to Dashboard
                    </Link>
                    <Link
                        href="/admin/blogs/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                    >
                        + Create blog
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border bg-white shadow">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="border-b px-4 py-3">Thumbnail</th>
                            <th className="border-b px-4 py-3">Title</th>
                            <th className="border-b px-4 py-3">Author</th>
                            <th className="border-b px-4 py-3">Likes</th>
                            <th className="border-b px-4 py-3">Views</th>
                            <th className="border-b px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.length ? (
                            filteredBlogs.map((blog, idx) => (
                                <tr key={blog.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">
                                        {blog.thumbnail ? (
                                            <a href={`/storage/${blog.thumbnail}`} target="_blank" rel="noopener noreferrer">
                                                <img src={`/storage/${blog.thumbnail}`} alt="thumbnail" className="h-16 w-16 rounded object-cover" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">No image</span>
                                        )}
                                    </td>
                                    <td className="border-b px-4 py-2">{blog.title}</td>
                                    <td className="border-b px-4 py-2">{blog.user?.name ?? '-'}</td>
                                    <td className="border-b px-4 py-2">{blog.likes ?? 0}</td>
                                    <td className="border-b px-4 py-2">{blog.views ?? 0}</td>
                                    <td className="space-x-2 border-b px-4 py-2 whitespace-nowrap">
                                        <Link
                                            href={`/admin/blogs/${blog.id}/edit`}
                                            className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/admin/blogs/${blog.slug}`}
                                            className="inline-block rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                        >
                                            Show
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No blogs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
                <button
                    onClick={() => fetchBlogs(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: lastPage }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => fetchBlogs(i + 1)}
                        className={`rounded px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => fetchBlogs(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogIndex;
