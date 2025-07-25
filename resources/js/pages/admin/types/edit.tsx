import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Type {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    image?: string | File | null;
}

interface PageProps {
    type: Type;
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Edit: React.FC = () => {
    const { type: initialType } = usePage<PageProps>().props;

    const [data, setData] = useState<Type>({
        ...initialType,
        image: null,
    });
    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (initialType.image && typeof initialType.image === 'string') {
            setImagePreview(`/storage/${initialType.image}`);
        }
    }, [initialType.image]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        window.location.href = '/admin/types';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', data.name ?? '');
        formData.append('description', data.description ?? '');
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        axios
            .post(`/types/${data.id}?_method=PUT`, formData)
            .then(() => {
                Swal.fire('Success', 'Type updated successfully.', 'success');
                window.location.href = '/admin/types';
            })
            .catch((error) => {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    Swal.fire('Error', 'An error occurred while updating the type.', 'error');
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
                    <h1 className="text-2xl font-bold text-gray-800">Edit Type</h1>
                    <button onClick={handleCancel} className="text-sm text-blue-600 hover:underline">
                        &larr; Back to Types
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
                        <label htmlFor="description" className="mb-1 block font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
                    </div>

                    <div>
                        <label htmlFor="image" className="mb-1 block font-medium text-gray-700">
                            Image
                        </label>
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleImageDrop}
                            onClick={() => document.getElementById('image-input')?.click()}
                            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 hover:border-blue-400"
                        >
                            <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            <p className="text-sm text-gray-600">Click or drag & drop image here</p>
                            <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-24 rounded object-cover shadow" />}
                        </div>
                        {errors.image && <div className="mt-1 text-sm text-red-600">{errors.image}</div>}
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
                            {processing ? 'Updating...' : 'Update Type'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
