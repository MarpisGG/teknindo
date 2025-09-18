import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface Business {
    id: number;
    title: string;
    slug?: string;
    description: string;
}

interface PageProps {
    Business: {
        data: Business[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}
const Create: React.FC = () => {
    const [formData, setFormData] = useState<Business>({
        id: 0,
        title: '',
        description: '',
        slug: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);

        try {
            await axios.post('/admin/businesses', form);
            Swal.fire('Success', 'Business created successfully', 'success');
            router.get('/admin/businesses');
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

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Create Business</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded border px-4 py-2" />
                    {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <ReactQuill
                        value={formData.description}
                        onChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                description: value,
                            }))
                        }
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ color: [] }, { background: [] }], // <--- ini biar bisa warna teks & background
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                ['clean'],
                            ],
                        }}
                        className="bg-white"
                    />
                    {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                </div>

                <div className="flex justify-start space-x-3 pt-4">
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
