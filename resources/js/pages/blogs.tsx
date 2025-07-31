import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Eye, Heart, Search, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Blog {
    id: number;
    slug?: string;
    title: string;
    content: string;
    image?: string;
    thumbnail?: string;
    likes?: number;
    views?: number;
    user?: {
        name: string;
    };
    created_at?: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

const Blogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchBlogs = async (page = 1, search = '') => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/blogs?page=${page}&search=${search}`);
            setBlogs(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // add debouncer
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchBlogs(1, searchTerm); // Reset to page 1 when searching
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // Filtering
    const filteredBlogs = blogs.filter((blog: Blog) => blog.title.toLowerCase().includes(searchTerm.trim().toLowerCase()));

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <Head title="Blogs" />
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="mx-auto flex hidden max-w-6xl justify-center md:block">
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
                            <a href="/blogs" className="font-bold hover:underline">
                                Blogs
                            </a>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="flex w-full items-center justify-center dark:bg-[#232326]">
                <div className="mx-auto px-4">
                    <div className="container mx-auto rounded px-4 py-8">
                        <motion.h1
                            className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Insight & Articles
                        </motion.h1>

                        <motion.p
                            className="mx-auto mb-4 max-w-2xl text-center text-lg dark:text-gray-400"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Discover useful tips, company updates, and industry insights to help you make smarter decisions for your business.
                        </motion.p>
                        <motion.div className="mb-6 flex justify-center" initial="hidden" animate="visible" variants={fadeInUp}>
                            <div className="relative w-full max-w-2xl">
                                <span className="pointer-events-none absolute top-5 left-3 flex -translate-y-1/2 items-center">
                                    <Search className="h-5 w-5" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search blog by title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-4 w-full rounded-lg border px-4 py-2 pl-10 shadow-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                                />
                            </div>
                        </motion.div>
                        {IsLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
                            </div>
                        ) : (
                            <div className="grid max-w-[71rem] grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
                                {blogs
                                    .filter((blog: Blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .sort((a, b) => {
                                        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                                        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                                        return dateB - dateA;
                                    })
                                    .map((blog: Blog, index) => (
                                        <Link href={`/blogs/${blog.slug ?? blog.id}`} key={blog.id}>
                                            <motion.div
                                                key={blog.id}
                                                className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-[1.02] hover:text-[#FCC200] hover:shadow-xl"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                                viewport={{ once: true }}
                                            >
                                                <div className="flex h-48 w-full items-center justify-center bg-gray-100 sm:h-56 md:h-64">
                                                    {blog.thumbnail ? (
                                                        <img
                                                            src={`/storage/${blog.thumbnail}`}
                                                            alt={blog.title}
                                                            className="h-full w-full max-w-full object-fill"
                                                        />
                                                    ) : (
                                                        <span className="text-sm text-gray-400">No Image Available</span>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col p-4 sm:p-6">
                                                    <p className="mb-2 text-center text-lg font-semibold">{blog.title}</p>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <User className="h-4 w-4" /> {blog.user?.name || 'Unknown'}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="h-4 w-4" /> {blog.likes || 0}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" /> {blog.views || 0}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />{' '}
                                                            {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="my-8 flex w-full justify-center">
                <nav className="inline-flex items-center gap-1 rounded-lg bg-white p-2 shadow-md">
                    <button
                        onClick={() => fetchBlogs(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`rounded-l-md px-3 py-2 text-sm font-medium transition-colors ${
                            currentPage === 1 ? 'pointer-events-none text-gray-300' : 'text-[#FCC200] hover:bg-[#FCC200]/10'
                        }`}
                    >
                        &laquo;
                    </button>

                    {Array.from({ length: lastPage }, (_, index) => {
                        const page = index + 1;
                        if (page === 1 || page === lastPage || Math.abs(currentPage - page) <= 1) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => fetchBlogs(page)}
                                    className={`mx-0.5 rounded px-3 py-2 text-sm font-medium transition-colors ${
                                        currentPage === page ? 'bg-[#FCC200] text-white shadow' : 'text-gray-700 hover:bg-[#FCC200]/30'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        }
                        if ((page === currentPage - 2 && page > 1) || (page === currentPage + 2 && page < lastPage)) {
                            return (
                                <span key={page} className="px-2 text-gray-400">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    })}

                    <button
                        onClick={() => fetchBlogs(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className={`rounded-r-md px-3 py-2 text-sm font-medium transition-colors ${
                            currentPage === lastPage ? 'pointer-events-none text-gray-300' : 'text-[#FCC200] hover:bg-[#FCC200]/10'
                        }`}
                    >
                        &raquo;
                    </button>
                </nav>
            </div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
};

export default Blogs;
