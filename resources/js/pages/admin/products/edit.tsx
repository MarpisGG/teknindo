import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface ProductForm {
    name: string;
    description: string;
    specifications: string;
    brochure: File | null;
    image: File | null;
    poster: File | null; // New field for poster
    category_id: number;
    type_id: number;
    order: number;
}

interface Option {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    specifications: string;
    brochure: string | null;
    image: string | null;
    poster: string | null; // New field for poster
    category_id: number;
    type_id: number;
    order: number;
}

interface PageProps {
    categories: Option[];
    types: Option[];
    products: Product;
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Edit: React.FC = () => {
    const { categories, types, products } = usePage<PageProps>().props;

    const [formData, setFormData] = useState<ProductForm>({
        name: products.name || '',
        description: products.description || '',
        specifications: products.specifications || '',
        brochure: null,
        image: null,
        poster: null, // Initialize poster field
        category_id: products.category_id || 0,
        type_id: products.type_id || 0,
        order: products.order || 0,
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [posterPreview, setPosterPreview] = useState<string | null>(null);

    useEffect(() => {
        if (products.image) {
            setImagePreview(`/storage/${products.image}`);
        }
        if (products.poster) {
            setPosterPreview(`/storage/${products.poster}`);
        }
    }, [products.image, products.poster]);

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
            if (name === 'poster') {
                setPosterPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageRemove = () => {
        setFormData((prev) => ({ ...prev, image: null }));
        setImagePreview(null);
    };

    const handlePosterRemove = () => {
        setFormData((prev) => ({ ...prev, poster: null }));
        setPosterPreview(null);
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
        form.append('order', formData.order.toString());
        form.append('_method', 'PUT');

        try {
            await axios.post(`/products/${products.id}`, form);
            Swal.fire('Success', 'Product updated successfully', 'success');
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
            <h1 className="mb-8 text-3xl font-semibold">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />

                {/* Description */}
                <TextareaField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                />

                {/* Specifications */}
                <TextareaField
                    label="Specifications (JSON)"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleChange}
                    error={errors.specifications}
                />

                {/* Category */}
                <SelectField
                    label="Category"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    options={categories}
                    error={errors.category_id}
                />

                {/* Type */}
                <SelectField label="Type" name="type_id" value={formData.type_id} onChange={handleChange} options={types} error={errors.type_id} />

                {/* Brochure */}
                <div>
                    <label className="block font-medium">Brochure (PDF)</label>
                    <input type="file" name="brochure" accept=".pdf" onChange={handleFileChange} className="w-full rounded border px-4 py-2" />
                    {errors.brochure && <div className="text-sm text-red-600">{errors.brochure}</div>}
                </div>

                {/* Image */}
                <div>
                    <label className="block font-medium">Image</label>
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleImageDrop}
                        className="cursor-pointer rounded border-2 border-dashed bg-gray-50 p-6 text-center transition hover:bg-gray-100"
                        onClick={() => {
                            // Trigger the hidden file input when the div is clicked
                            const input = document.getElementById('image-input');
                            if (input) (input as HTMLInputElement).click();
                        }}
                        style={{ position: 'relative' }}
                    >
                        <p className="text-gray-500">Drag & drop image here or click to choose file</p>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            name="image"
                            className="hidden"
                            tabIndex={-1}
                        />
                        {imagePreview && (
                            <div className="relative mx-auto mt-4 w-fit">
                                <img src={imagePreview} alt="Preview" className="h-24 rounded border shadow" />
                                <button
                                    type="button"
                                    onClick={handleImageRemove}
                                    className="absolute top-0 right-0 rounded-full bg-red-500 px-2 text-xs text-white"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                    {errors.image && <div className="text-sm text-red-600">{errors.image}</div>}
                </div>

                {/* Poster */}
                <div>
                    <label className="block font-medium">Poster (optional)</label>
                    <input type="file" name="poster" accept="image/*" onChange={handleFileChange} className="w-full rounded border px-4 py-2" />
                    {posterPreview && (
                        <div className="relative mx-auto mt-4 w-fit">
                            <img src={posterPreview} alt="Poster Preview" className="h-24 rounded border shadow" />
                            <button
                                type="button"
                                onClick={handlePosterRemove}
                                className="absolute top-0 right-0 rounded-full bg-red-500 px-2 text-xs text-white"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    {errors.poster && <div className="text-sm text-red-600">{errors.poster}</div>}
                </div>

                {/* Order */}
                <InputField label="Order" name="order" type="number" value={formData.order} onChange={handleChange} error={errors.order} />

                {/* Submit */}
                <div className="flex justify-start space-x-3 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 ${processing ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} rounded-md text-white`}
                    >
                        {processing ? 'Updating...' : 'Update Product'}
                    </button>
                    <button type="button" onClick={() => router.get('/admin/products')} className="rounded-md bg-gray-300 px-4 py-2 text-black">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;

const InputField = ({ label, name, type = 'text', value, onChange, error }: any) => (
    <div>
        <label className="block font-medium">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="w-full rounded border px-4 py-2" />
        {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
);

const TextareaField = ({ label, name, value, onChange, error }: any) => (
    <div>
        <label className="block font-medium">{label}</label>
        <ReactQuill theme="snow" value={value} onChange={(content) => onChange({ target: { name, value: content } })} className="bg-white" />
        {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
);

const SelectField = ({ label, name, value, onChange, options, error }: any) => (
    <div>
        <label className="block font-medium">{label}</label>
        <select name={name} value={value} onChange={onChange} className="w-full rounded border px-4 py-2">
            <option value="">-- Select {label} --</option>
            {options.map((option: any) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
        {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
);
