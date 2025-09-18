import { router, usePage } from '@inertiajs/react';
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
    business: Business;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Edit: React.FC = () => {
    const { business } = usePage<PageProps>().props;

    const [formData, setFormData] = useState<Business>({
        id: business.id,
        title: business.title,
        description: business.description,
        slug: business.slug || '',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.put(
            `/admin/businesses/${business.id}`,
            {
                title: formData.title,
                description: formData.description,
            },
            {
                onSuccess: () => {
                    Swal.fire('Success', 'Business updated successfully', 'success');
                    router.get('/admin/businesses');
                },
                onError: (errors) => {
                    setErrors(errors);
                    Swal.fire('Error', 'Please check the form for errors', 'error');
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Edit Business</h1>
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
                        {processing ? 'Updating...' : 'Update Business'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.get('/admin/businesses')}
                        className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
