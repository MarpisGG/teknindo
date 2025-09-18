import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

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
    } | null;
    service: {
        id: number;
        name: string;
        slug: string;
    } | null;
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
    const [selectedProduct, setSelectedProduct] = React.useState('');
    const [selectedService, setSelectedService] = React.useState('');

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

    // Generate unique product & service options
    const productOptions = Array.from(new Set(quotations.data.map((q) => q.product?.name).filter(Boolean)));
    const serviceOptions = Array.from(new Set(quotations.data.map((q) => q.service?.name).filter(Boolean)));

    const filteredQuotations = quotations.data.filter((quotation) => {
        const matchesSearch = (quotation.message || '').toLowerCase().includes(debouncedSearchTerm);
        const matchesProduct = selectedProduct ? quotation.product?.name === selectedProduct : true;
        const matchesService = selectedService ? quotation.service?.name === selectedService : true;
        return matchesSearch && matchesProduct && matchesService;
    });

    const toggleFollowUp = async (id: number) => {
        try {
            await axios.put(`/quotations/${id}/follow-up`);
            window.location.reload();
        } catch (err) {
            Swal.fire('Error', 'Failed to update follow-up status', 'error');
        }
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                {/* Header and Filters */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Quotation</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        {/* Search */}
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search quotation..."
                            className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                        />

                        {/* Product Filter */}
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="rounded-lg border border-gray-400 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Products</option>
                            {productOptions.map((product) => (
                                <option key={product} value={product}>
                                    {product}
                                </option>
                            ))}
                        </select>

                        {/* Service Filter */}
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="rounded-lg border border-gray-400 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Services</option>
                            {serviceOptions.map((service) => (
                                <option key={service} value={service}>
                                    {service}
                                </option>
                            ))}
                        </select>

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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredQuotations.length > 0 ? (
                            filteredQuotations.map((quotation) => (
                                <div key={quotation.id} className="rounded-lg border bg-white p-4 shadow">
                                    <h3 className="text-lg font-bold text-gray-800">{quotation.name}</h3>
                                    <p className="text-sm text-gray-600">Email: {quotation.email}</p>
                                    <p className="text-sm text-gray-600">Phone: {quotation.phone}</p>
                                    <p className="text-sm text-gray-600">Company: {quotation.company}</p>
                                    <p className="text-sm text-gray-600">Country: {quotation.country}</p>
                                    <p className="text-sm text-gray-600">Message: {quotation.message}</p>
                                    <p className="text-sm text-gray-600">Product: {quotation.product?.name || '-'}</p>
                                    <p className="text-sm text-gray-600">Service: {quotation.service?.name || '-'}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            onClick={() => toggleFollowUp(quotation.id)}
                                            className={`rounded px-3 py-1 text-white ${quotation.followed_up ? 'bg-green-600' : 'bg-gray-400'}`}
                                        >
                                            {quotation.followed_up ? 'Done' : 'Mark as Done'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quotation.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">No messages found.</div>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <nav className="inline-flex items-center space-x-2">
                        {quotations.current_page > 1 && (
                            <button
                                onClick={() => (window.location.href = `?page=${quotations.current_page - 1}`)}
                                className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Previous
                            </button>
                        )}
                        {Array.from({ length: quotations.last_page }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => (window.location.href = `?page=${page}`)}
                                className={`rounded border px-4 py-2 ${
                                    page === quotations.current_page
                                        ? 'bg-blue-500 text-white'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        {quotations.current_page < quotations.last_page && (
                            <button
                                onClick={() => (window.location.href = `?page=${quotations.current_page + 1}`)}
                                className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
