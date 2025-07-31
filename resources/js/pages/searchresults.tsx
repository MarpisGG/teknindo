import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';

interface SearchResult {
    id: number;
    type: 'blog' | 'product' | 'career';
    title?: string;
    name?: string;
    content?: string;
    description?: string;
    job_desc?: string;
    slug: string;
    created_at?: string;
}

interface SearchResultsProps {
    results: SearchResult[];
    query: string;
    total: number;
}

const SearchResults = ({ results, query, total }: SearchResultsProps) => {
    const getResultTitle = (item: SearchResult): string => {
        return item.title || item.name || 'Untitled';
    };

    const getResultDescription = (item: SearchResult): string => {
        const description = item.content || item.description || item.job_desc || '';
        return description.length > 150 ? description.slice(0, 150) + '...' : description;
    };

    const getResultUrl = (item: SearchResult): string => {
        switch (item.type) {
            case 'blog':
                return `/blogs/${item.slug}`;
            case 'product':
                return `/products/heavyweight-equipment/${item.slug}`;
            case 'career':
                return `/career/jobs/${item.slug}`;
            default:
                return '#';
        }
    };

    const getTypeDisplay = (type: string): string => {
        switch (type) {
            case 'career':
                return 'Job';
            case 'product':
                return 'Product';
            case 'blog':
                return 'Blog';
            default:
                return type;
        }
    };

    return (
        <>
            <Head title={`Search results for "${query}"`} />
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="mx-auto flex max-w-6xl px-4 py-4">
                <nav className="text-sm text-gray-500">
                    <span className="hover:text-yellow-600">
                        <Link href="/">Home</Link>
                    </span>
                    <span className="mx-2">{'>'}</span>
                    <span className="hover:text-yellow-600">
                        <Link href="/search">Search</Link>
                    </span>
                    <span className="mx-2">{'>'}</span>
                    <span className="font-medium text-black">{query}</span>
                </nav>
            </div>
            <div className="mx-auto max-w-6xl px-4 pt-4 pb-8">
                <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-semibold">
                        Search results for: <span className="text-yellow-600">"{query}"</span>
                    </h2>
                    <p className="text-gray-600">{total > 0 ? `Found ${total} result${total !== 1 ? 's' : ''}` : 'No results found'}</p>
                </div>

                {results.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="mb-4 text-lg text-gray-500">No results found for "{query}"</p>
                        <p className="text-gray-400">Try adjusting your search terms or browse our categories.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {results.map((item) => (
                            <article
                                key={`${item.type}-${item.id}`}
                                className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                {getTypeDisplay(item.type)}
                                            </span>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                            <Link href={getResultUrl(item)} className="transition-colors hover:text-yellow-600">
                                                {getResultTitle(item)}
                                            </Link>
                                        </h2>

                                        {getResultDescription(item) && (
                                            <p
                                                className="mb-3 leading-relaxed text-gray-600"
                                                dangerouslySetInnerHTML={{ __html: getResultDescription(item) }}
                                            />
                                        )}

                                        <Link
                                            href={getResultUrl(item)}
                                            className="inline-flex items-center text-sm font-medium text-yellow-700 hover:text-yellow-800 hover:underline"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
};

export default SearchResults;
