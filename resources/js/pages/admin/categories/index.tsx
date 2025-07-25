import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

interface Category {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    categories: {
        data: Category[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { categories: paginatedCategory, flash } = usePage<PageProps>().props;
    const categories = paginatedCategory?.data || [];

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
                    .delete(`/categories/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The category has been deleted.', 'success');
                        // Optionally, you can refresh the page or update the state to remove the deleted category
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 400) {
                            Swal.fire('Error!', 'Cannot delete category with products', 'error');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the category.', 'error');
                        }
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

    const filteredcategories = categories.filter((category) => category.name.toLowerCase().includes(debouncedSearchTerm));

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            {/* Navbar */}
            <NavbarAdmin />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">category Management</h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search categories..."
                        className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                    />
                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                    >
                        ← Back to Dashboard
                    </Link>
                    <Link
                        href="/admin/categories/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                    >
                        + Create category
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="border-b px-4 py-2">Name</th>
                            <th className="border-b px-4 py-2">Description</th>
                            <th className="border-b px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredcategories.length > 0 ? (
                            filteredcategories.map((category, idx) => (
                                <tr key={category.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">{category.name}</td>
                                    <td className="border-b px-4 py-2">{category.description}</td>
                                    <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                        <Link
                                            href={`/admin/categories/${category.id}/edit`}
                                            className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
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
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
