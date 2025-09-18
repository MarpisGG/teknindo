import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Role {
    id: number;
    name: string;
    permissions: { name: string }[];
}

const Index: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        axios.get('/api/roles').then((res) => {
            setRoles(res.data);
        });
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/roles/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Role has been deleted.', 'success');
                        setRoles((prev) => prev.filter((r) => r.id !== id));
                    },
                    onError: () => {
                        Swal.fire('Error!', 'There was an error deleting the role.', 'error');
                    },
                });
            }
        });
    };

    const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <input
                            type="text"
                            placeholder="Search roles..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-64"
                        />
                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link href="/admin/roles/create" className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700">
                            + Create Role
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded bg-white shadow">
                    <div className="border-b p-4">
                        <div className="flex flex-wrap justify-between gap-4">
                            <p>List : Melihat Data</p>
                            <p>Create : Membuat Data</p>
                            <p>Edit : Mengubah Data</p>
                            <p>Delete : Menghapus data</p>
                        </div>
                    </div>
                    <table className="w-full text-left text-sm text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Permissions</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoles.length > 0 ? (
                                filteredRoles.map((role) => (
                                    <tr key={role.id} className="border-t">
                                        <td className="px-4 py-2 font-medium">{role.name}</td>
                                        <td className="px-4 py-2">
                                            {role.permissions?.length > 0 ? (
                                                <ul className="list-inside list-disc space-y-1">
                                                    {role.permissions.map((p, i) => (
                                                        <li key={i}>{p.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-400 italic">No permissions</span>
                                            )}
                                        </td>
                                        <td className="space-x-2 px-4 py-2 text-center whitespace-nowrap">
                                            <Link
                                                href={`/admin/roles/${role.id}/edit`}
                                                className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(role.id)}
                                                className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-6 text-center text-gray-500">
                                        No roles found.
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
