import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

interface Testimoni {
    id: number;
    name: string;
    testimoni: string;
    rating: number;
}

interface PageProps {
    testimonis: Testimoni[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { testimonis = [] } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = React.useState('');

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
                    .delete(`/admin/testimonis/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'testimoni deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the testimoni.', 'error');
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

    const filteredtestimonis = testimonis.filter((s) => s.name.toLowerCase().includes(debouncedSearchTerm));

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Testimoni Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search by name..."
                            className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                        />
                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link href="/admin/testimonis/create" className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">
                            + Create Testimoni
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-2">Name</th>
                                <th className="border-b px-4 py-2">Testimoni</th>
                                <th className="border-b px-4 py-2 text-center">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredtestimonis.length > 0 ? (
                                filteredtestimonis.map((testimoni, idx) => (
                                    <tr key={testimoni.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">{testimoni.name}</td>
                                        <td className="border-b px-4 py-2">{testimoni.testimoni}</td>
                                        <td className="border-b px-4 py-2">{testimoni.rating}</td>
                                        <td className="border-b px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDelete(testimoni.id)}
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
                                        No testimonis found.
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
