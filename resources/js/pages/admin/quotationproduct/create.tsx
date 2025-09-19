import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface QuotationProduct {
    id: number;
    name: string;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Create: React.FC = () => {
    const { auth } = usePage<PageProps>().props;

    const [data, setData] = useState<QuotationProduct>({
        id: 0,
        name: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        window.location.href = '/admin/quotation-products';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', data.name);

        axios
            .post('/admin/quotation-products', formData)
            .then(() => {
                Swal.fire('Success', 'Quotation Product created successfully.', 'success');
                window.location.href = '/admin/quotation-products';
            })
            .catch((error) => {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    Swal.fire('Error', 'Failed to create the Quotation Product.', 'error');
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Create Quotation Product</h1>
                    <button onClick={handleCancel} className="text-sm text-blue-600 hover:underline">
                        &larr; Back to Quotation Product List
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-1 block font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div className="flex justify-start space-x-3 pt-4">
                        <button type="button" onClick={handleCancel} className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 ${processing ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} rounded-md text-white`}
                        >
                            {processing ? 'Creating...' : 'Create Quotation Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
