// pages/admin/company/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

interface LandingVideo {
    id: number;
    video: string;
}

interface PageProps {
    landingVideos: LandingVideo[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const { landingVideos } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/admin/landing-videos/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The Landing Video has been deleted.', 'success');
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.response?.status === 405) {
                            Swal.fire('Warning!', 'The Landing Video was deleted, but the server returned an unexpected response.', 'warning');
                            window.location.reload();
                        } else {
                            Swal.fire('Error!', 'Failed to delete the Landing Video.', 'error');
                        }
                        console.error(error);
                    });
            }
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-6xl p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Landing Video Management</h2>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        <Link
                            href="/admin/dashboard"
                            className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                        >
                            ← Back to Dashboard
                        </Link>
                        <Link
                            href="/admin/landing-videos/create"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                        >
                            + Create Landing Video
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="border-b px-4 py-2">Image</th>
                                <th className="border-b px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {landingVideos.length > 0 ? (
                                landingVideos.map((video, idx) => (
                                    <tr key={video.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border-b px-4 py-2">
                                            <video src={`/storage/${video.video}`} controls className="h-64 w-128 rounded shadow" />
                                        </td>
                                        <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(video.id)}
                                                className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                        No Customer found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
