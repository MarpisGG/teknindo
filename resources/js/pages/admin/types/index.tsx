import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

interface Type {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    types: {
        data: Type[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { types: paginatedTypes, flash } = usePage<PageProps>().props;
    const types = paginatedTypes?.data || [];

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
                    .delete(`/admin/types/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The type has been deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.response && error.response.status === 400) {
                            Swal.fire('Error!', 'Cannot delete types with products', 'error');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the types.', 'error');
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

    const filteredTypes = types.filter((type) => type.name.toLowerCase().includes(debouncedSearchTerm));

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Type Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search types..."
                            className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                        />
                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link
                            href="/admin/types/create"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                        >
                            + Create Type
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-2">Name</th>
                                <th className="border-b px-4 py-2">Description</th>
                                <th className="border-b px-4 py-2">Image</th>
                                <th className="border-b px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTypes.length > 0 ? (
                                filteredTypes.map((type, idx) => (
                                    <tr key={type.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">{type.name}</td>
                                        <td className="border-b px-4 py-2">{type.description}</td>
                                        <td className="border-b px-4 py-2">
                                            {type.image ? (
                                                <img src={`/storage/${type.image}`} alt={type.name} className="h-16 w-16 object-cover" />
                                            ) : (
                                                <span className="text-gray-500">No Image</span>
                                            )}
                                        </td>
                                        <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                            <Link
                                                href={`/admin/types/${type.id}/edit`}
                                                className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(type.id)}
                                                className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                                        No types found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
