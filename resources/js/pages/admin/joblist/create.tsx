import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill-new";


interface Job {
  id: number;
  title: string;
  slug?: string;
  division: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  job_desc: string;
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

const Create : React.FC = () => {
    const { flash } = usePage<PageProps>().props;
    const [data, setData] = React.useState<Job>({
        id: 0,
        title: "",
        slug: "",
        division: "",
        location: "",
        type: "",
        salary: "",
        description: "",
        job_desc: "",
        requirements: ""
    });

    const [errors, setErrors] = React.useState<any>({});
    const [processing, setProcessing] = React.useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        axios.post('/jobs', data)
            .then(response => {
                Swal.fire({
                    title: 'Success',
                    text: 'Job created successfully!',
                    icon: 'success'
                });
                setData({
                    id: 0,
                    title: "",
                    slug: "",
                    division: "",
                    location: "",
                    type: "",
                    salary: "",
                    description: "",
                    job_desc: "",
                    requirements: ""
                });
                setErrors({});
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to create job.',
                        icon: 'error'
                    });
                }
            })
            .finally(() => {
                setProcessing(false);
                router.get('/admin/jobs');
            });
    };

    return (
       <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-4">Create Role</h1>
                <Link href="/admin/jobs" className="text-blue-600 hover:underline">
                    Back to Job List
                </Link>
            </div>
            {flash?.success && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    {flash.error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"

                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Division</label>
                    <input
                        type="text"
                        name="division"
                        value={data.division}
                        onChange={handleChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"

                    />
                    {errors.division && <p className="text-red-500 text-sm">{errors.division}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"

                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"

                    >
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"

                    />
                    {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <ReactQuill
                        theme="snow"
                        value={data.description}
                        onChange={(content) => setData({ ...data, description: content })}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ],
                
                        }}
                        style={{ height: '200px', marginBottom: '48px' }}
                        className="w-full rounded-lg focus:ring focus:ring-blue-200"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Job Description</label>
                    <ReactQuill
                        theme="snow"
                        value={data.job_desc}
                        onChange={(content) => setData({ ...data, job_desc: content })}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ],
                        }}
                        style={{ height: '200px', marginBottom: '48px' }}
                        className="w-full rounded-lg focus:ring focus:ring-blue-200"
                    />
                    {errors.job_desc && <p className="text-red-500 text-sm">{errors.job_desc}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Requirements</label>
                    <ReactQuill
                        theme="snow"
                        value={data.requirements}
                        onChange={(content) => setData({ ...data, requirements: content })}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ],
                        }}
                        style={{ height: '200px', marginBottom: '48px' }}
                        className="w-full rounded-lg focus:ring focus:ring-blue-200"
                    />
                    {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {processing ? 'Creating...' : 'Create Job'}
                </button>
                <Link href="/admin/jobs" className="ml-4 px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded">
                    Cancel
                </Link>
            </form>
        </div>
        </div>
    )
}

export default Create;