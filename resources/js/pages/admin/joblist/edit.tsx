import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import React from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface Job {
    id: number;
    title: string;
    division: string;
    location: string;
    type: string;
    job_desc?: string;
    requirements: string;
    benefit: string;
    [key: string]: any;
}

interface PageProps {
    jobs?: Job;
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
    [key: string]: any;
}

const Edit: React.FC = () => {
    const { jobs } = usePage<PageProps>().props;

    const { data, setData, processing, errors } = useForm<Job>({
        id: jobs?.id || 0,
        title: jobs?.title || '',
        division: jobs?.division || '',
        location: jobs?.location || '',
        type: jobs?.type || '',
        job_desc: jobs?.job_desc || '',
        requirements: jobs?.requirements || '',
        benefit: jobs?.benefit || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/jobs/${data.id}`, data);
            Swal.fire('Success', 'Job updated successfully.', 'success').then(() => {
                window.location.href = '/admin/jobs';
            });
        } catch (error: any) {
            const responseErrors = error.response?.data?.errors;
            const message = responseErrors ? Object.values(responseErrors).flat().join('\n') : 'Update failed';
            Swal.fire('Error', message, 'error');
        }
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Any unsaved changes will be lost.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/admin/jobs';
            }
        });
    };

    return (
        <div className="mx-auto max-w-xl py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Job</h1>
                <Link href="/admin/jobs" className="text-blue-600 hover:text-blue-800">
                    ← Back to Jobs
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Job Title *</label>
                        <input
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter job title"
                            required
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Division *</label>
                        <input
                            name="division"
                            value={data.division}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter division"
                            required
                        />
                        {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Location *</label>
                        <input
                            name="location"
                            value={data.location}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter location"
                            required
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Job Type *</label>
                        <select
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select job type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Job Description *</label>
                        <ReactQuill
                            theme="snow"
                            value={data.job_desc}
                            onChange={(content) => setData({ ...data, job_desc: content })}
                            className="rounded-lg bg-white"
                            placeholder="Enter job description"
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'clean'],
                                ],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                        />
                        {errors.job_desc && <p className="mt-1 text-sm text-red-600">{errors.job_desc}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Requirements *</label>
                        <ReactQuill
                            theme="snow"
                            value={data.requirements}
                            onChange={(content) => setData({ ...data, requirements: content })}
                            className="rounded-lg bg-white"
                            placeholder="Enter requirements"
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'clean'],
                                ],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                        />
                        {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Benefit *</label>
                        <ReactQuill
                            theme="snow"
                            value={data.benefit}
                            onChange={(content) => setData({ ...data, benefit: content })}
                            className="rounded-lg bg-white"
                            placeholder="Enter job details"
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'clean'],
                                ],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                        />
                        {errors.benefit && <p className="mt-1 text-sm text-red-600">{errors.benefit}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                        disabled={processing}
                    >
                        <X size={18} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        disabled={processing}
                    >
                        <Save size={18} />
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
