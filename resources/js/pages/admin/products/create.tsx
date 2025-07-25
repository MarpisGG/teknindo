import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface Product {
    name: string;
    description: string;
    specifications: string;
    brochure: File | null;
    image: File | null;
    poster: File | null;
    category_id: number;
    type_id: number;
}

interface Option {
    id: number;
    name: string;
}

interface PageProps {
    categories: Option[];
    types: Option[];
    [key: string]: any;
}

const Create: React.FC = () => {
    const { categories, types } = usePage<PageProps>().props;

    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        specifications: '',
        brochure: null,
        image: null,
        poster: null,
        category_id: 0,
        type_id: 0,
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [posterPreview, setPosterPreview] = useState<string | null>(null);
    const [brochureName, setBrochureName] = useState<string | null>(null);

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
            if (name === 'brochure') {
                setBrochureName(file.name);
            }
            if (name === 'poster') {
                setPosterPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('specifications', formData.specifications);
        form.append('category_id', formData.category_id.toString());
        form.append('type_id', formData.type_id.toString());
        if (formData.brochure) form.append('brochure', formData.brochure);
        if (formData.image) form.append('image', formData.image);
        if (formData.poster) form.append('poster', formData.poster);

        try {
            await axios.post('/products', form);
            Swal.fire('Success', 'Product created successfully', 'success');
            router.get('/admin/products');
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
            <h1 className="mb-6 text-2xl font-bold">Create Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded border px-4 py-2" />
                    {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
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
                        className="bg-white"
                    />
                    {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                </div>

                <div>
                    <label className="block font-medium">Specifications</label>
                    <ReactQuill
                        value={formData.specifications}
                        onChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                specifications: value,
                            }))
                        }
                        className="bg-white"
                    />
                    {errors.specifications && <div className="text-sm text-red-600">{errors.specifications}</div>}
                </div>

                <div>
                    <label className="block font-medium">Category</label>
                    <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full rounded border px-4 py-2">
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <div className="text-sm text-red-600">{errors.category_id}</div>}
                </div>

                <div>
                    <label className="block font-medium">Type</label>
                    <select name="type_id" value={formData.type_id} onChange={handleChange} className="w-full rounded border px-4 py-2">
                        <option value="">-- Select Type --</option>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {errors.type_id && <div className="text-sm text-red-600">{errors.type_id}</div>}
                </div>

                <div>
                    <label className="block font-medium">Brochure (PDF)</label>
                    <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 hover:border-blue-400"
                        onClick={() => document.getElementById('brochure-input')?.click()}
                    >
                        <input id="brochure-input" type="file" name="brochure" accept=".pdf" onChange={handleFileChange} className="hidden" />
                        <p className="text-sm text-gray-600">Click or drag & drop a PDF here</p>
                        <p className="mt-1 text-xs text-gray-400">Max file 5MB</p>
                        {brochureName && <p className="mt-2 text-gray-700">{brochureName}</p>}
                    </div>
                    {errors.brochure && <div className="text-sm text-red-600">{errors.brochure}</div>}
                </div>

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

                <div>
                    <label className="block font-medium">Poster</label>
                    <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 hover:border-blue-400"
                        onClick={() => document.getElementById('poster-input')?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files.length > 0) {
                                const file = e.dataTransfer.files[0];
                                setFormData((prev) => ({ ...prev, poster: file }));
                                setPosterPreview(URL.createObjectURL(file));
                            }
                        }}
                    >
                        <input id="poster-input" type="file" name="poster" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <p className="text-sm text-gray-600">Click or drag & drop a poster here</p>
                        <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</p>
                        {posterPreview && <img src={posterPreview} alt="Preview" className="mt-4 h-24 rounded object-cover shadow" />}
                    </div>
                    {errors.poster && <div className="text-sm text-red-600">{errors.poster}</div>}
                </div>

                <div className="flex justify-start space-x-3 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 ${processing ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} rounded-md text-white`}
                    >
                        {processing ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
