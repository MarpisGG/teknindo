import { Link } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Eye, Heart, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

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

const LandingBlog: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs');
            setBlogs(response.data?.data ?? []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // add debouncer

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
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
            <div className="grid max-w-[71rem] grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
                {blogs
                    .filter((blog: Blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort((a, b) => {
                        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                        return dateB - dateA;
                    })
                    .slice(0, 3)
                    .map((blog: Blog, index) => (
                        <Link href={`/blogs/${blog.slug ?? blog.id}`} key={blog.id}>
                            <motion.div
                                key={blog.id}
                                className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-[1.02] hover:text-[#FCC200] hover:shadow-xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex h-48 w-full items-center justify-center bg-gray-100 sm:h-56 md:h-64">
                                    {blog.thumbnail ? (
                                        <img src={`/storage/${blog.thumbnail}`} alt={blog.title} className="h-full w-full max-w-full object-fill" />
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
                                            <Calendar className="h-4 w-4" /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : ''}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
            </div>

            <motion.div
                className="mt-4 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Link href="/blogs">
                    <InteractiveHoverButton text="View Blog" className="w-40" />
                </Link>
            </motion.div>
        </div>
    );
};

export default LandingBlog;
