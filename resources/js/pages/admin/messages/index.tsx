import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

interface Message {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    message: string;
    followed_up: boolean;
    created_at: string;
}

interface PageProps {
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
    };
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { messages, auth } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/messages/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Your message has been deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', error.response.data.message, 'error');
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

    const filteredMessages = messages.data.filter((message) => message.message.toLowerCase().includes(debouncedSearchTerm));

    const toggleFollowUp = async (id: number) => {
        try {
            await axios.put(`/messages/${id}/follow-up`);
            window.location.reload();
        } catch (err) {
            Swal.fire('Error', 'Failed to update follow-up status', 'error');
        }
    };

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            <NavbarAdmin />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Messages</h2>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search messages..."
                        className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                    />
                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="border-b px-4 py-2">Name</th>
                            <th className="border-b px-4 py-2">Email</th>
                            <th className="border-b px-4 py-2">Phone</th>
                            <th className="border-b px-4 py-2">Company</th>
                            <th className="border-b px-4 py-2">Country</th>
                            <th className="border-b px-4 py-2">Message</th>
                            <th className="border-b px-4 py-2 text-center">Followed Up</th>
                            <th className="border-b px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((message, index) => (
                                <tr key={message.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">
                                        {message.first_name} {message.last_name}
                                    </td>
                                    <td className="border-b px-4 py-2">{message.email}</td>
                                    <td className="border-b px-4 py-2">{message.phone}</td>
                                    <td className="border-b px-4 py-2">{message.company}</td>
                                    <td className="border-b px-4 py-2">{message.country}</td>
                                    <td className="border-b px-4 py-2">{message.message}</td>
                                    <td className="border-b px-4 py-2 text-center">
                                        <button
                                            onClick={() => toggleFollowUp(message.id)}
                                            className={`rounded px-3 py-1 text-white ${message.followed_up ? 'bg-green-600' : 'bg-gray-400'}`}
                                        >
                                            {message.followed_up ? 'Done' : 'Mark as Done'}
                                        </button>
                                    </td>
                                    <td className="border-b px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(message.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                                    No messages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <nav className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-2 shadow">
                    <Link
                        href={`/admin/messages?page=${Math.max(1, messages.current_page - 1)}`}
                        className={`rounded px-3 py-1 text-sm font-medium transition ${
                            messages.current_page === 1 ? 'pointer-events-none text-gray-400' : 'text-blue-600 hover:bg-blue-100'
                        }`}
                        aria-disabled={messages.current_page === 1}
                    >
                        « Prev
                    </Link>
                    {Array.from({ length: messages.last_page }, (_, index) => {
                        const page = index + 1;
                        if (page === 1 || page === messages.last_page || Math.abs(page - messages.current_page) <= 1) {
                            return (
                                <Link
                                    key={page}
                                    href={`/admin/messages?page=${page}`}
                                    className={`rounded px-3 py-1 text-sm font-medium transition ${
                                        messages.current_page === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {page}
                                </Link>
                            );
                        }
                        if ((page === messages.current_page - 2 && page > 1) || (page === messages.current_page + 2 && page < messages.last_page)) {
                            return (
                                <span key={page} className="px-2 text-gray-400">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    })}
                    <Link
                        href={`/admin/messages?page=${Math.min(messages.last_page, messages.current_page + 1)}`}
                        className={`rounded px-3 py-1 text-sm font-medium transition ${
                            messages.current_page === messages.last_page ? 'pointer-events-none text-gray-400' : 'text-blue-600 hover:bg-blue-100'
                        }`}
                        aria-disabled={messages.current_page === messages.last_page}
                    >
                        Next »
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Index;
