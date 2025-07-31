import axios from 'axios';
import { Calendar, Eye, Heart, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Blog {
    id: number;
    title: string;
    slug?: string;
    thumbnail?: string;
    likes?: number;
    views?: number;
    user?: { name: string };
    created_at?: string;
}

interface RelatedProps {
    blog: Blog;
}

function Related({ blog }: RelatedProps) {
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (blog?.id) {
            axios
                .get(`/api/blogs/${blog.id}/related-random`)
                .then((res) => setRelatedBlogs(res.data))
                .catch((err) => console.error('Related fetch error:', err));
        }
    }, [blog?.id]);

    return (
        <div>
            {relatedBlogs.length > 0 && (
                <div className="mt-16">
                    <h2 className="mb-4 text-2xl font-semibold">Check Other Articles</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {relatedBlogs.map((item, index) => (
                            <a
                                key={item.id}
                                href={`/blogs/${item.slug ?? item.id}`}
                                className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-[1.02] hover:text-[#FCC200] hover:shadow-xl"
                            >
                                <div className="flex h-48 w-full items-center justify-center bg-gray-100 sm:h-56 md:h-64">
                                    {item.thumbnail ? (
                                        <img src={`${item.thumbnail}`} alt={item.title} className="h-full w-full max-w-full object-fill" />
                                    ) : (
                                        <span className="text-sm text-gray-400">No Image Available</span>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-4 sm:p-6">
                                    <h2 className="mb-2 text-center text-lg font-semibold">{item.title}</h2>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" /> {item.user?.name || 'Unknown'}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Heart className="h-4 w-4" /> {item.likes || 0}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" /> {item.views || 0}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" /> {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Related;
