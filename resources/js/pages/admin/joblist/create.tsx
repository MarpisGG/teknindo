import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface Business {
    id: number;
    title: string;
    slug?: string;
    description: string;
}

interface PageProps {
    businesses: Business[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Create: React.FC = () => {
    const { flash } = usePage<PageProps>().props;
    const [data, setData] = React.useState<Business>({
        id: 0,
        title: '',
        slug: '',
        description: '',
    });

    const [errors, setErrors] = React.useState<any>({});
    const [processing, setProcessing] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        axios
            .post('/admin/businesses', data)
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'Business created successfully!',
                    icon: 'success',
                });
                setData({
                    id: 0,
                    title: '',
                    slug: '',
                    description: '',
                });
                setErrors({});
                router.get('/admin/businesses');
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to create business.',
                        icon: 'error',
                    });
                }
            })
            .finally(() => setProcessing(false));
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Create Business</h1>
                    <Link href="/admin/businesses" className="text-blue-600 hover:underline">
                        Back to Business List
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 rounded bg-green-100 p-4 text-green-800">{flash.success}</div>}
                {flash?.error && <div className="mb-4 rounded bg-red-100 p-4 text-red-800">{flash.error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Description with ReactQuill */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Description</label>
                        <ReactQuill
                            theme="snow"
                            value={data.description}
                            onChange={(content) => setData({ ...data, description: content })}
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    [{ color: [] }, { background: [] }], // text color & background color
                                    [{ align: [] }],
                                    ['link', 'clean'],
                                ],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                            className="w-full rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    {/* Actions */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {processing ? 'Creating...' : 'Create Business'}
                    </button>
                    <Link href="/admin/businesses" className="mt-4 ml-4 rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Create;
