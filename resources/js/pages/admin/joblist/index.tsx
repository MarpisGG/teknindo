import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import NavbarAdmin from '../navbar-admin';

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
    applicants_count?: number;
}

interface PageProps {
    jobs: {
        data: Job[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Index: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { jobs: paginatedJobs, flash } = usePage<PageProps>().props;
    const jobs = paginatedJobs?.data || [];

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
                    .delete(`/jobs/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The job has been deleted.', 'success');
                        // Optionally, you can refresh the page or update the state to remove the deleted job
                        window.location.reload();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Failed to delete the job.', 'error');
                        console.error(error);
                    });
            }
        });
    };

    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = React.useState(value);
        React.useEffect(() => {
            const handler = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(handler);
        }, [value, delay]);
        return debouncedValue;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(debouncedSearchTerm) ||
            job.type.toLowerCase().includes(debouncedSearchTerm) ||
            job.location.toLowerCase().includes(debouncedSearchTerm) ||
            job.division.toLowerCase().includes(debouncedSearchTerm) ||
            job.salary.toLowerCase().includes(debouncedSearchTerm),
    );

    return (
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
            {/* Navbar */}
            <NavbarAdmin />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Job Management</h2>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search jobs..."
                        className="w-full rounded-lg border border-black px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto"
                    />
                    <Link
                        href="/admin/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-2 text-center text-sm text-blue-600 hover:text-blue-800 sm:text-base"
                    >
                        ← Back to Dashboard
                    </Link>
                    <Link
                        href="/admin/jobs/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white shadow hover:bg-blue-700 sm:text-base"
                    >
                        + Create job
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border bg-white shadow">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="border-b px-4 py-3">Title</th>
                            <th className="border-b px-4 py-3">Division</th>
                            <th className="border-b px-4 py-3">Location</th>
                            <th className="border-b px-4 py-3">Type</th>
                            <th className="border-b px-4 py-3">Salary</th>
                            <th className="border-b px-4 py-3 text-center">Applicants</th>
                            <th className="border-b px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, idx) => (
                                <tr key={job.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border-b px-4 py-2">{job.title}</td>
                                    <td className="border-b px-4 py-2">{job.division}</td>
                                    <td className="border-b px-4 py-2">{job.location}</td>
                                    <td className="border-b px-4 py-2">{job.type}</td>
                                    <td className="border-b px-4 py-2">{job.salary}</td>
                                    <td className="border-b px-4 py-2 text-center">{job.applicants_count ?? 0}</td>
                                    <td className="space-x-2 border-b px-4 py-2 text-center whitespace-nowrap">
                                        <Link
                                            href={`/admin/jobs/${job.id}/edit`}
                                            className="inline-block rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/admin/jobs/${job.slug}/`}
                                            className="inline-block rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                        >
                                            Show
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="inline-block rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No jobs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
