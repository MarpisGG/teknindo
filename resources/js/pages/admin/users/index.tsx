import AppLayout from '@/layouts/app-layout';
import { Link, router, usePage } from '@inertiajs/react';
import React from 'react';
import swal2 from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string; // Assuming roles is a string, adjust if it's an array or object
    roles: string[];
}

interface PageProps {
    users: {
        data: User[];
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { users } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleDelete = (id: number) => {
        swal2
            .fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(`/admin/users/${id}`, {
                        onSuccess: () => {
                            swal2.fire('Deleted!', 'User has been deleted.', 'success');
                        },
                        onError: () => {
                            swal2.fire('Error!', 'There was an error deleting the user.', 'error');
                        },
                    });
                }
            });
    };

    // Custom debounce hook
    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = React.useState(value);

        React.useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredUsers = users.data.filter(
        (user) => user.name.toLowerCase().includes(debouncedSearchTerm) || user.email.toLowerCase().includes(debouncedSearchTerm),
    );

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">User Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search users..."
                            className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                        />

                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>

                        <Link
                            href="/admin/users/create"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                        >
                            + Create User
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-3">Name</th>
                                <th className="border-b px-4 py-3">Email</th>
                                <th className="border-b px-4 py-3">Roles</th>
                                <th className="border-b px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length ? (
                                filteredUsers.map((user, idx) => (
                                    <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">{user.name}</td>
                                        <td className="border-b px-4 py-2">{user.email}</td>
                                        <td className="border-b px-4 py-2">{user.roles.join(', ')}</td>
                                        <td className="space-x-2 border-b px-4 py-2 whitespace-nowrap">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                        No users found.
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
