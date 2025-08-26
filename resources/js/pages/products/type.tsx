import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface TypePageProps {
    type: {
        id: number;
        name: string;
        slug: string;
    };
    products: {
        data: {
            id: number;
            name: string;
            slug: string;
            image: string;
            description: string;
            specifications: string;
            category: {
                name: string;
            };
        }[];
        current_page: number;
        last_page: number;
    };
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function Type({ type, products }: TypePageProps) {
    return (
        <>
            <Head title={`Products - ${type.name}`} />
            <div className="mb-12">
                <Navbar />
            </div>
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="mb-6 flex w-full flex-col items-center">
                    <div className="mb-2 w-full">
                        <nav className="text-sm text-gray-500">
                            <ol className="list-reset flex flex-wrap">
                                <li>
                                    <a href="/" className="hover:underline">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <span className="mx-2">{'>'}</span>
                                </li>
                                <li>
                                    <a href="/products" className="hover:underline">
                                        Product
                                    </a>
                                </li>
                                <li>
                                    <span className="mx-2">{'>'}</span>
                                </li>
                                <li className="font-semibold text-gray-700">{type.name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-6">
                    {products.data.map((product, idx) => {
                        const isEven = idx % 2 === 0;
                        const imageSection = (
                            <div
                                className={`w-full overflow-hidden md:w-[78%] ${isEven ? 'md:order-last md:rounded-r-lg' : 'md:order-first md:rounded-l-lg'}`}
                            >
                                {product.image ? (
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="aspect-video h-full w-full object-cover object-fill transition-transform duration-300 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gray-100 text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                        );

                        const textSection = (
                            <div className="flex w-full flex-col items-start justify-center px-4 py-4 md:w-[22%] md:py-0">
                                <p className="mb-2 text-3xl font-bold">{product.name}</p>
                                {(() => {
                                    // Parse the HTML string to extract <li> items
                                    const tempDiv = document.createElement('div');
                                    tempDiv.innerHTML = product.specifications || '';
                                    const liElements = Array.from(tempDiv.querySelectorAll('li')).slice(0, 3);
                                    if (liElements.length === 0) return null;
                                    return (
                                        <ul className="mb-2 list-disc text-sm">
                                            {liElements.map((li, idx) => (
                                                <li key={idx}>{li.textContent}</li>
                                            ))}
                                        </ul>
                                    );
                                })()}
                                <Link
                                    href={`/products/${type.slug}/${product.slug}`}
                                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#FCC200] px-5 py-2 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-[#e6b000] focus:ring-2 focus:ring-[#FCC200]/50 focus:outline-none"
                                >
                                    <span>Lihat Detail</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        );

                        return (
                            <Link
                                href={`/products/${type.slug}/${product.slug}`}
                                key={product.id}
                                className="group relative flex w-full max-w-6xl flex-col rounded-lg border bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                            >
                                <motion.div
                                    key={product.id}
                                    className="product flex flex-col rounded-xl border shadow md:h-96 md:flex-row"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    {imageSection}
                                    {textSection}
                                </motion.div>
                            </Link>
                        );
                    })}

                    {/* Pagination */}
                    <div className="mt-8 flex w-full justify-center">
                        <nav className="inline-flex items-center gap-1 rounded-lg bg-white p-2 shadow-md">
                            <a
                                href={`/products/${type.slug}?page=${products.current_page - 1}`}
                                className={`rounded-l-md px-3 py-2 text-sm font-medium transition-colors ${
                                    products.current_page === 1 ? 'pointer-events-none text-gray-300' : 'text-[#FCC200] hover:bg-[#FCC200]/10'
                                }`}
                                aria-disabled={products.current_page === 1}
                            >
                                &laquo;
                            </a>
                            {Array.from({ length: products.last_page }, (_, index) => {
                                const page = index + 1;
                                if (page === 1 || page === products.last_page || Math.abs(products.current_page - page) <= 1) {
                                    return (
                                        <a
                                            key={page}
                                            href={`/products/${type.slug}?page=${page}`}
                                            className={`mx-0.5 rounded px-3 py-2 text-sm font-medium transition-colors ${
                                                products.current_page === page
                                                    ? 'bg-[#FCC200] text-white shadow'
                                                    : 'text-gray-700 hover:bg-[#FCC200]/30'
                                            }`}
                                        >
                                            {page}
                                        </a>
                                    );
                                }
                                if (
                                    (page === products.current_page - 2 && page > 1) ||
                                    (page === products.current_page + 2 && page < products.last_page)
                                ) {
                                    return (
                                        <span key={page} className="px-2 text-gray-400">
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            <a
                                href={`/products/${type.slug}?page=${products.current_page + 1}`}
                                className={`rounded-r-md px-3 py-2 text-sm font-medium transition-colors ${
                                    products.current_page === products.last_page
                                        ? 'pointer-events-none text-gray-300'
                                        : 'text-[#FCC200] hover:bg-[#FCC200]/10'
                                }`}
                                aria-disabled={products.current_page === products.last_page}
                            >
                                &raquo;
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Discover More */}
            <motion.div className="" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div className="mx-auto bg-[#fcc200]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h1 className="mb-4 px-4 pt-8 text-center text-3xl font-bold text-gray-900 md:px-0">Discover More of Our Products</h1>
                    <p className="mx-auto px-4 pb-8 text-center text-lg text-gray-600 md:px-0">
                        Explore our full product catalog for more solutions to fit your needs.
                        <br />
                        <a
                            href="https://www.mitrateknindosejati.com/product"
                            className="mx-1 font-bold text-gray-800 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See More Products
                        </a>
                    </p>
                </motion.div>
            </motion.div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
