import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
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
    };
}

interface Product {
    id: number;
    name: string;
}

function RequestQuote() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        axios
            .post(`/api/quotations`, formData)
            .then((response) => {
                setQuotations([...quotations, response.data]);
                Swal.fire('Success', 'Quotation submitted successfully!', 'success');
                (e.target as HTMLFormElement).reset();
            })
            .catch((error) => {
                Swal.fire('Error', 'Failed to submit quotation.', 'error');
                console.error(error);
            });
    };

    const fetchProducts = () => {
        axios.get(`/api/products`).then((response) => {
            const data = Array.isArray(response.data) ? response.data : response.data.data;
            setProducts(data || []);
        });
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const container = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Head title="Request Quotation" />
            <Navbar />
            <motion.div className="mx-auto mt-16 max-w-6xl px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <motion.div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100" variants={container} initial="hidden" animate="show">
                    <motion.div
                        className="mt-4 mb-12 text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="relative inline-block text-5xl font-extrabold text-slate-800 drop-shadow-lg">
                            <span className="relative z-10">Request Quotation</span>
                            <span className="absolute -bottom-1 -left-1 z-0 text-gray-300">Request Quotation</span>
                        </h1>
                        <p className="drop- mx-auto mt-4 max-w-xl text-base text-gray-600">
                            Please fill out the form below to request a quotation for our products.
                        </p>
                    </motion.div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" variants={container}>
                            <motion.div variants={item}>
                                <label htmlFor="name" className="block text-sm font-bold">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <label htmlFor="email" className="block text-sm font-bold">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" variants={container}>
                            <motion.div variants={item}>
                                <label htmlFor="phone" className="block text-sm font-bold">
                                    Phone Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <label htmlFor="company" className="block text-sm font-bold">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="country" className="block text-sm font-bold">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="message" className="block text-sm font-bold">
                                Message or Requirements<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={10}
                                required
                                className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            ></textarea>
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="product_id" className="block text-sm font-bold">
                                Select Product<span className="text-red-500">*</span>
                            </label>
                            <div>
                                <div className="relative mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search product..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                        autoComplete="off"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        aria-autocomplete="list"
                                        aria-expanded={!!searchTerm && !products.some((p) => p.name.toLowerCase() === searchTerm.toLowerCase())}
                                    />

                                    {/* This hidden (visually) text input carries the selected product_id and enforces required */}
                                    <input
                                        type="text"
                                        name="product_id"
                                        readOnly
                                        required
                                        value={(products.find((p) => p.name.toLowerCase() === searchTerm.toLowerCase())?.id ?? '').toString()}
                                        className="sr-only"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    />

                                    {searchTerm && !products.some((p) => p.name.toLowerCase() === searchTerm.toLowerCase()) && (
                                        <ul
                                            role="listbox"
                                            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
                                        >
                                            {products
                                                .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map((product) => (
                                                    <li
                                                        key={product.id}
                                                        role="option"
                                                        className="cursor-pointer px-4 py-2 hover:bg-yellow-50"
                                                        onMouseDown={() => setSearchTerm(product.name)}
                                                    >
                                                        {product.name}
                                                    </li>
                                                ))}
                                            {products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                                <li className="px-4 py-2 text-gray-500">No products found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={item}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="mt-4 w-full rounded-lg bg-yellow-400 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300"
                            >
                                Submit Quotation Request
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}

export default RequestQuote;
