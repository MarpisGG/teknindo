// pages/admin/company/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

interface Company {
    id: number;
    name: string;
    image: string;
    description: string;
    web: string;
}

interface PageProps {
    companies: Company[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { companies } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = React.useState('');

    // Debounce untuk search
    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = React.useState(value);
        React.useEffect(() => {
            const handler = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(handler);
        }, [value, delay]);
        return debouncedValue;
    };
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(debouncedSearchTerm));

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
                    .delete(`/admin/companies/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The Company has been deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.response?.status === 405) {
                            Swal.fire('Warning!', 'The Company was deleted, but the server returned an unexpected response.', 'warning');
                            window.location.reload();
                        } else {
                            Swal.fire('Error!', 'Failed to delete the Company.', 'error');
                        }
                        console.error(error);
                    });
            }
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Company Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <input
                            type="text"
                            placeholder="Search Companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                            className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                        />
                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link
                            href="/admin/companies/create"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                        >
                            + Create Company
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-2">Image</th>
                                <th className="border-b px-4 py-2">Name</th>
                                <th className="border-b px-4 py-2">Description</th>
                                <th className="border-b px-4 py-2">Web</th>
                                <th className="border-b px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company, idx) => (
                                    <tr key={company.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">
                                            <img src={`/storage/${company.image}`} alt={company.name} className="h-16 w-16 object-cover" />
                                        </td>
                                        <td className="border-b px-4 py-2">{company.name}</td>
                                        <td className="border-b px-4 py-2" dangerouslySetInnerHTML={{ __html: company.description }}></td>
                                        <td className="border-b px-4 py-2">
                                            {company.web ? (
                                                <a
                                                    href={company.web}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {company.web}
                                                </a>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(company.id)}
                                                className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        No companies found.
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
