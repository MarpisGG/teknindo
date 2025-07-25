import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface ContentBlock {
    type: 'text' | 'image';
    content?: string;
    image?: File | null;
}

const BlogCreate: React.FC = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);

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
        }
        setBlocks(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (thumbnail) formData.append('thumbnail', thumbnail);

        blocks.forEach((block, idx) => {
            formData.append(`contents[${idx}][type]`, block.type);
            if (block.type === 'text') {
                formData.append(`contents[${idx}][content]`, block.content || '');
            }
            if (block.type === 'image' && block.image) {
                formData.append(`contents[${idx}][image]`, block.image);
            }
            formData.append(`contents[${idx}][order]`, String(idx));
        });

        await router.post('/blogs', formData, { forceFormData: true });
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <h2 className="mb-6 text-3xl font-bold">Create Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2 focus:border-black focus:ring-black"
                        required
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Thumbnail (optional)</label>
                    <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                        className="w-full rounded border border-gray-300 p-2"
                    />
                </div>

                <div className="space-y-6">
                    {blocks.map((block, index) => (
                        <div key={index} className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-medium capitalize">{block.type} Block</span>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleMoveBlock(index, 'up')}
                                        className="text-sm text-gray-500 hover:text-black"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMoveBlock(index, 'down')}
                                        className="text-sm text-gray-500 hover:text-black"
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBlock(index)}
                                        className="text-sm text-red-500 hover:text-red-700"
                                    >
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleBlockChange(index, e.target.files?.[0] || null, 'image')}
                                    className="w-full rounded border border-gray-300 p-2"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleAddBlock('text')}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                    >
                        + Text Block
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAddBlock('image')}
                        className="rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                    >
                        + Image Block
                    </button>
                </div>

                <button type="submit" className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default BlogCreate;
