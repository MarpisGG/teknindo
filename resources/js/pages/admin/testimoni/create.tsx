import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Testimoni {
    id: number;
    name: string;
    testimoni: string;
    rating: number;
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

    const [data, setData] = useState<Testimoni>({
        id: 0,
        name: '',
        testimoni: '',
        rating: 5,
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        window.location.href = '/admin/testimonis';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('testimoni', data.testimoni);
        formData.append('rating', data.rating.toString());

        axios
            .post('/admin/testimonis', formData)
            .then(() => {
                Swal.fire('Success', 'Testimoni created successfully.', 'success');
                window.location.href = '/admin/testimonis';
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
                    <h1 className="text-2xl font-bold text-gray-800">Create Testimoni</h1>
                    <button onClick={handleCancel} className="text-sm text-blue-600 hover:underline">
                        &larr; Back to Quotation Service List
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
                    <div>
                        <label htmlFor="testimoni" className="mb-1 block font-medium text-gray-700">
                            Testimoni
                        </label>
                        <input
                            type="text"
                            name="testimoni"
                            value={data.testimoni}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.testimoni && <div className="mt-1 text-sm text-red-600">{errors.testimoni}</div>}
                    </div>
                    <div>
                        <label htmlFor="rating" className="mb-1 block font-medium text-gray-700">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={data.rating}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.rating && <div className="mt-1 text-sm text-red-600">{errors.rating}</div>}
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
                            {processing ? 'Creating...' : 'Create Testimoni'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
