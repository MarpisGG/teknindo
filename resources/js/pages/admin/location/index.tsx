import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

interface Location {
    id: number;
    latitude: number;
    longitude: number;
    link: string;
    name: string;
    address: string;
}

interface PageProps {
    locations: Location[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { locations = [] } = usePage<PageProps>().props;
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
                    .delete(`/admin/locations/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Location deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the location.', 'error');
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

    const filteredLocations = locations.filter((s) => s.name.toLowerCase().includes(debouncedSearchTerm));

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Location Management</h2>

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
                        <Link href="/admin/locations/create" className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">
                            + Create Location
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-2">Name</th>
                                <th className="border-b px-4 py-2">Latitude</th>
                                <th className="border-b px-4 py-2">Longitude</th>
                                <th className="border-b px-4 py-2">Address</th>
                                <th className="border-b px-4 py-2">Link</th>
                                <th className="border-b px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLocations.length > 0 ? (
                                filteredLocations.map((location, idx) => (
                                    <tr key={location.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">{location.name}</td>
                                        <td className="border-b px-4 py-2">{location.latitude}</td>
                                        <td className="border-b px-4 py-2">{location.longitude}</td>
                                        <td className="border-b px-4 py-2">{location.address}</td>
                                        <td className="border-b px-4 py-2">{location.link}</td>
                                        <td className="border-b px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDelete(location.id)}
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
