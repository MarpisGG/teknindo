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
                        <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 drop-shadow-sm">
                            Please fill out the form below to request a quotation for our products.
                        </p>
                    </motion.div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" variants={container}>
                            <motion.div variants={item}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" variants={container}>
                            <motion.div variants={item}>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message or Requirements <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={10}
                                required
                                className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                            ></textarea>
                        </motion.div>

                        <motion.div variants={item}>
                            <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
                                Select Product <span className="text-red-500">*</span>
                            </label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search product..."
                                    className="mb-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <select
                                    name="product_id"
                                    id="product_id"
                                    required
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                                >
                                    <option value="">-- Select a Product --</option>
                                    {products
                                        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                </select>
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
