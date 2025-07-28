import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';

interface Job {
    id: number;
    title: string;
    slug?: string;
    division: string;
    location: string;
    type: string;
    salary: string;
    job_desc?: string;
    benefit: string;
    requirements: string;
}

interface PageProps {
    jobs: Job[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Create: React.FC = () => {
    const { flash } = usePage<PageProps>().props;
    const [data, setData] = React.useState<Job>({
        id: 0,
        title: '',
        slug: '',
        division: '',
        location: '',
        type: '',
        salary: '',
        job_desc: '',
        benefit: '',
        requirements: '',
    });

    const [errors, setErrors] = React.useState<any>({});
    const [processing, setProcessing] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        axios
            .post('/jobs', data)
            .then((response) => {
                Swal.fire({
                    title: 'Success',
                    text: 'Job created successfully!',
                    icon: 'success',
                });
                setData({
                    id: 0,
                    title: '',
                    slug: '',
                    division: '',
                    location: '',
                    type: '',
                    salary: '',
                    job_desc: '',
                    benefit: '',
                    requirements: '',
                });
                setErrors({});
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to create job.',
                        icon: 'error',
                    });
                }
            })
            .finally(() => {
                setProcessing(false);
                router.get('/admin/jobs');
            });
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Create Role</h1>
                    <Link href="/admin/jobs" className="text-blue-600 hover:underline">
                        Back to Job List
                    </Link>
                </div>
                {flash?.success && <div className="mb-4 rounded bg-green-100 p-4 text-green-800">{flash.success}</div>}
                {flash?.error && <div className="mb-4 rounded bg-red-100 p-4 text-red-800">{flash.error}</div>}
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Division</label>
                        <input
                            type="text"
                            name="division"
                            value={data.division}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.division && <p className="text-sm text-red-500">{errors.division}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={data.location}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Type</label>
                        <select
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={data.salary}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Job Description</label>
                        <ReactQuill
                            theme="snow"
                            value={data.job_desc}
                            onChange={(content) => setData({ ...data, job_desc: content })}
                            modules={{
                                toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                            className="w-full rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.job_desc && <p className="text-sm text-red-500">{errors.job_desc}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Requirements</label>
                        <ReactQuill
                            theme="snow"
                            value={data.requirements}
                            onChange={(content) => setData({ ...data, requirements: content })}
                            modules={{
                                toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                            className="w-full rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.requirements && <p className="text-sm text-red-500">{errors.requirements}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Job Benefits</label>
                        <ReactQuill
                            theme="snow"
                            value={data.benefit}
                            onChange={(content) => setData({ ...data, benefit: content })}
                            modules={{
                                toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
                            }}
                            style={{ height: '200px', marginBottom: '48px' }}
                            className="w-full rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.benefit && <p className="text-sm text-red-500">{errors.benefit}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {processing ? 'Creating...' : 'Create Job'}
                    </button>
                    <Link href="/admin/jobs" className="mt-4 ml-4 rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Create;
