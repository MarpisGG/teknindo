import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface LandingVideo {
    id: number;
    video: string | File;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    landingVideos: {
        data: LandingVideo[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Create: React.FC = () => {
    const [formData, setFormData] = useState<LandingVideo>({
        id: 0,
        video: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));

            if (name === 'video') {
                setVideoPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const form = new FormData();
        if (formData.video) form.append('video', formData.video);

        try {
            await axios.post('/admin/landing-videos', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Swal.fire('Success', 'Landing video created successfully', 'success');
            router.get('/admin/landing-videos');
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
        window.location.href = '/admin/landing-videos';
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold">Create Landing Video</h1>
            <button onClick={handleCancel} className="mb-6 text-sm text-blue-600 hover:underline">
                &larr; Back to Landing Video List
            </button>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Video</label>
                    <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 hover:border-blue-400"
                        onClick={() => document.getElementById('video-input')?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files.length > 0) {
                                const file = e.dataTransfer.files[0];
                                setFormData((prev) => ({ ...prev, video: file }));
                                setVideoPreview(URL.createObjectURL(file));
                            }
                        }}
                    >
                        <input id="video-input" type="file" name="video" accept="video/*" onChange={handleFileChange} className="hidden" />
                        <p className="text-sm text-gray-600">Click or drag & drop a video here</p>
                        <p className="mt-1 text-xs text-gray-400">MP4, AVI, MOV, WMV up to 50MB</p>
                        {videoPreview && <video src={videoPreview} controls className="mt-4 h-40 rounded shadow" />}
                    </div>
                    {errors.video && <div className="text-sm text-red-600">{errors.video}</div>}
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
                        {processing ? 'Uploading...' : 'Upload Video'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
