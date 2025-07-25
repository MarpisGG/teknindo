import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

interface Quotation {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    message: string;
    product: {
        id: number;
        name: string;
        slug: string;
    };
    followed_up: boolean;
}

interface PageProps {
    quotations: {
        data: Quotation[];
        current_page: number;
        last_page: number;
    };
    auth: any;
    [key: string]: any;
}

const Index: React.FC = () => {
    const { quotations, auth } = usePage<PageProps>().props;
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
                    .delete(`/admin/quotations/${id}`)
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

    const filteredQuotations = quotations.data.filter((quotation) => (quotation.message || '').toLowerCase().includes(debouncedSearchTerm));
    const toggleFollowUp = async (id: number) => {
        try {
            const res = await axios.put(`/quotations/${id}/follow-up`);
            window.location.reload(); // Atau gunakan router.reload()
        } catch (err) {
            Swal.fire('Error', 'Failed to update follow-up status', 'error');
        }
    };

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            {/* Navbar */}
            <NavbarAdmin />

            {/* Header and Search */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Quotation</h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search quotation..."
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

            {/* Table */}
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
                            <th className="border-b px-4 py-2">Product</th>
                            <th className="border-b px-4 py-2 text-center">Followed Up</th>
                            <th className="border-b px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuotations.length > 0 ? (
                            filteredQuotations.map((quotation, index) => (
                                <tr key={quotation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">{quotation.name}</td>
                                    <td className="border-b px-4 py-2">{quotation.email}</td>
                                    <td className="border-b px-4 py-2">{quotation.phone}</td>
                                    <td className="border-b px-4 py-2">{quotation.company}</td>
                                    <td className="border-b px-4 py-2">{quotation.country}</td>
                                    <td className="border-b px-4 py-2">{quotation.message}</td>
                                    <td className="border-b px-4 py-2">{quotation.product.name}</td>
                                    <td className="border-b px-4 py-2 text-center">
                                        <button
                                            onClick={() => toggleFollowUp(quotation.id)}
                                            className={`rounded px-3 py-1 text-white ${quotation.followed_up ? 'bg-green-600' : 'bg-gray-400'}`}
                                        >
                                            {quotation.followed_up ? 'Done' : 'Mark as Done'}
                                        </button>
                                    </td>
                                    <td className="border-b px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(quotation.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                    No messages found.
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
