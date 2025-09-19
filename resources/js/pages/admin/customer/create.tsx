import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Customer {
    id: number;
    image: string | File;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    Customers: {
        data: Customer[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}
const Create: React.FC = () => {
    const [formData, setFormData] = useState<Customer>({
        id: 0,
        image: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));

            if (name === 'image') {
                setImagePreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const form = new FormData();
        if (formData.image) form.append('image', formData.image);

        if (formData.image) form.append('image', formData.image);

        try {
            await axios.post('/admin/customers', form);
            Swal.fire('Success', 'Customer created successfully', 'success');
            router.get('/admin/customers');
        } catch (err: any) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleCancel = () => {
        window.location.href = '/admin/customers';
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Create Customer</h1>
            <button onClick={handleCancel} className="mb-6 text-sm text-blue-600 hover:underline">
                &larr; Back to Customer List
            </button>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Image</label>
                    <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 hover:border-blue-400"
                        onClick={() => document.getElementById('image-input')?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files.length > 0) {
                                const file = e.dataTransfer.files[0];
                                setFormData((prev) => ({ ...prev, image: file }));
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    >
                        <input id="image-input" type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <p className="text-sm text-gray-600">Click or drag & drop an image here</p>
                        <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-24 rounded object-cover shadow" />}
                    </div>
                    {errors.image && <div className="text-sm text-red-600">{errors.image}</div>}
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
                        {processing ? 'Creating...' : 'Create Customer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
