import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

interface Product {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    brochure?: string;
    specifications: Record<string, any>;
    category?: {
        id: number;
        name: string;
    };
    type?: {
        id: number;
        name: string;
    };
    order?: number; // Added order field
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { products: paginatedProducts, flash, auth } = usePage<PageProps>().props;
    const products = paginatedProducts?.data || [];

    const handleMove = (id: number, direction: 'up' | 'down') => {
        axios
            .patch(`/admin/products/${id}/move`, { direction })
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                Swal.fire('Error!', 'Failed to move the product.', 'error');
            });
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/products/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the product.', 'error');
                        console.error(error);
                    });
            }
        });
    };

    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = React.useState(value);
        React.useEffect(() => {
            const handler = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(handler);
        }, [value, delay]);
        return debouncedValue;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(debouncedSearchTerm));

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            <NavbarAdmin />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Product Management</h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                    />
                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                    >
                        ← Back to Dashboard
                    </Link>
                    <Link
                        href="/admin/products/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                    >
                        + Create Product
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="border-b px-4 py-2">Image</th>
                            <th className="border-b px-4 py-2">Name</th>
                            <th className="border-b px-4 py-2">Category</th>
                            <th className="border-b px-4 py-2">Type</th>
                            <th className="border-b px-4 py-2">Brochure</th>
                            <th className="border-b px-4 py-2">Order</th>
                            <th className="border-b px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, idx) => (
                                <tr key={product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">
                                        {product.image ? (
                                            <img src={`/storage/${product.image}`} alt={product.name} className="h-16 w-16 rounded object-cover" />
                                        ) : (
                                            <span className="text-gray-400">No image</span>
                                        )}
                                    </td>
                                    <td className="border-b px-4 py-2">{product.name}</td>
                                    <td className="border-b px-4 py-2">{product.category?.name}</td>
                                    <td className="border-b px-4 py-2">{product.type?.name}</td>
                                    <td className="max-w-xs truncate border-b px-4 py-2">
                                        {product.brochure ? (
                                            <a
                                                href={`/storage/${product.brochure}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Download Brochure
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No brochure</span>
                                        )}
                                    </td>
                                    <td className="border-b px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleMove(product.id, 'up')}
                                                    className="rounded bg-gray-200 p-1 text-xs hover:bg-gray-300"
                                                >
                                                    ▲
                                                </button>
                                                <button
                                                    onClick={() => handleMove(product.id, 'down')}
                                                    className="rounded bg-gray-200 p-1 text-xs hover:bg-gray-300"
                                                >
                                                    ▼
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/admin/products/${product.slug}/`}
                                            className="inline-block rounded bg-blue-400 px-3 py-1 text-white hover:bg-blue-500"
                                        >
                                            Show
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-center">
                <nav className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-2 shadow">
                    <Link
                        href={`/admin/products?page=${Math.max(1, paginatedProducts.current_page - 1)}`}
                        className={`rounded px-3 py-1 text-sm font-medium transition ${
                            paginatedProducts.current_page === 1 ? 'pointer-events-none text-gray-400' : 'text-blue-600 hover:bg-blue-100'
                        }`}
                        aria-disabled={paginatedProducts.current_page === 1}
                    >
                        &laquo; Prev
                    </Link>
                    {Array.from({ length: paginatedProducts.last_page }, (_, index) => {
                        const page = index + 1;
                        // Show first, last, current, and neighbors; ellipsis for gaps
                        if (page === 1 || page === paginatedProducts.last_page || Math.abs(page - paginatedProducts.current_page) <= 1) {
                            return (
                                <Link
                                    key={page}
                                    href={`/admin/products?page=${page}`}
                                    className={`rounded px-3 py-1 text-sm font-medium transition ${
                                        paginatedProducts.current_page === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {page}
                                </Link>
                            );
                        }
                        // Ellipsis logic
                        if (
                            (page === paginatedProducts.current_page - 2 && page > 1) ||
                            (page === paginatedProducts.current_page + 2 && page < paginatedProducts.last_page)
                        ) {
                            return (
                                <span key={page} className="px-2 text-gray-400">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    })}
                    <Link
                        href={`/admin/products?page=${Math.min(paginatedProducts.last_page, paginatedProducts.current_page + 1)}`}
                        className={`rounded px-3 py-1 text-sm font-medium transition ${
                            paginatedProducts.current_page === paginatedProducts.last_page
                                ? 'pointer-events-none text-gray-400'
                                : 'text-blue-600 hover:bg-blue-100'
                        }`}
                        aria-disabled={paginatedProducts.current_page === paginatedProducts.last_page}
                    >
                        Next &raquo;
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Index;
