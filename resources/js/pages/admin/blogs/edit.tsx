import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';

interface ContentBlock {
    type: 'text' | 'image';
    content?: string;
    image?: File | null;
    existingImageUrl?: string; // buat preview image lama
}

interface PageProps {
    blog?: {
        id: number;
        title: string;
        thumbnail?: string;
        contents: {
            type: 'text' | 'image';
            content?: string;
            image?: string;
            order: number;
        }[];
    };
    auth: any;
    errors: any;
    [key: string]: any;
}

const Edit: React.FC = () => {
    const { blog } = usePage<PageProps>().props;
    const [title, setTitle] = useState(blog?.title || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(blog?.thumbnail ? `${blog.thumbnail}` : null);

    const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
        return ((blog?.contents ?? []) as any[])
            .map((item: any) => ({
                type: item.type,
                content: item.content || '',
                image: null, // ini selalu null
                existingImageUrl: item.image ? `${item.image}` : undefined,
                order: item.order,
            }))
            .sort((a, b) => a.order - b.order);
    });

    const handleAddBlock = (type: 'text' | 'image') => {
        setBlocks([...blocks, { type, content: '', image: null }]);
    };

    const handleRemoveBlock = (index: number) => {
        const updated = [...blocks];
        updated.splice(index, 1);
        setBlocks(updated);
    };

    const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
        const updated = [...blocks];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= updated.length) return;
        [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
        setBlocks(updated);
    };

    const handleBlockChange = (index: number, value: string | File | null, type: 'text' | 'image') => {
        const updated = [...blocks];
        if (type === 'text') {
            updated[index].content = value as string;
        } else {
            updated[index].image = value as File | null;
            updated[index].existingImageUrl = undefined;
        }
        setBlocks(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        blocks.forEach((block, idx) => {
            formData.append(`contents[${idx}][type]`, block.type);
            if (block.type === 'text') {
                formData.append(`contents[${idx}][content]`, block.content || '');
            }
            if (block.type === 'image') {
                if (block.image) {
                    formData.append(`contents[${idx}][image]`, block.image);
                } else if (block.existingImageUrl) {
                    formData.append(`contents[${idx}][existing_image]`, block.existingImageUrl);
                }
            }
            formData.append(`contents[${idx}][order]`, String(idx));
        });
        formData.append('_method', 'PUT');

        try {
            await router.post(`/blogs/${blog?.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    Swal.fire('Success', 'Blog updated successfully.', 'success').then(() => {
                        router.visit('/admin/blogs');
                    });
                },
            });
        } catch (error: any) {
            Swal.fire('Error', 'An error occurred while updating the blog.', 'error');
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Blog</h1>
                <Link href="/admin/blogs" className="text-blue-600 hover:text-blue-800">
                    ← Back to Blogs
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block font-medium">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border p-2" required />
                </div>

                <div>
                    <label className="mb-1 block font-medium">Thumbnail (optional)</label>
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setThumbnail(file);
                            if (file && file instanceof File) {
                                setThumbnailPreview(URL.createObjectURL(file));
                            } else {
                                setThumbnailPreview(null);
                            }
                        }}
                        className="w-full"
                    />
                    {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-4 h-32 w-32 rounded object-cover" />}
                </div>

                <div className="space-y-6">
                    {blocks.map((block, index) => (
                        <div key={index} className="relative space-y-2 rounded border p-4">
                            <div className="flex justify-between">
                                <span className="font-semibold capitalize">{block.type} Block</span>
                                <div className="space-x-2">
                                    <button type="button" onClick={() => handleMoveBlock(index, 'up')} className="text-sm text-blue-500">
                                        ↑
                                    </button>
                                    <button type="button" onClick={() => handleMoveBlock(index, 'down')} className="text-sm text-blue-500">
                                        ↓
                                    </button>
                                    <button type="button" onClick={() => handleRemoveBlock(index)} className="text-sm text-red-500">
                                        Remove
                                    </button>
                                </div>
                            </div>
                            {block.type === 'text' && (
                                <ReactQuill
                                    value={block.content || ''}
                                    onChange={(value) => handleBlockChange(index, value, 'text')}
                                    className="bg-white"
                                    theme="snow"
                                    placeholder="Write your text here..."
                                />
                            )}
                            {block.type === 'image' && (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBlockChange(index, e.target.files?.[0] || null, 'image')}
                                        className="w-full"
                                    />
                                    {block.image instanceof File && (
                                        <img src={URL.createObjectURL(block.image)} className="h-32 w-32 rounded object-cover" />
                                    )}
                                    {!block.image && block.existingImageUrl && (
                                        <img src={block.existingImageUrl} className="h-32 w-32 rounded object-cover" />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => handleAddBlock('text')} className="rounded bg-blue-500 px-4 py-2 text-white">
                        + Add Text Block
                    </button>
                    <button type="button" onClick={() => handleAddBlock('image')} className="rounded bg-green-500 px-4 py-2 text-white">
                        + Add Image Block
                    </button>
                </div>

                <button type="submit" className="rounded bg-black px-6 py-2 font-medium text-white">
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default Edit;
