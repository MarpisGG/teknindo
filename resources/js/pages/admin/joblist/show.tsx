import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Briefcase, DollarSign, Edit, LaptopMinimal, MapPin, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Applicant {
    id: number;
    name: string;
    email: string;
    phone: string;
    education: string;
    expected_salary: string;
    address: string;
    resume: string;
    status: string;
    applied_at: string;
    start_date?: string;
}

interface Jobs {
    id?: number;
    title?: string;
    slug?: string;
    division?: string;
    location?: string;
    type?: string;
    salary?: string;
    requirements?: string;
    benefit?: string;
    created_at?: string;
    updated_at?: string;
    applicants?: Applicant[];
}

const Show: React.FC = () => {
    const [jobs, setJobs] = useState<Jobs | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = usePage().props as { slug?: string };

    const fetchJobs = async () => {
        if (!slug) {
            setError('No job identifier found');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/jobs/${slug}`);
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to load job:', error);
            setError('Failed to load job details');
            Swal.fire('Error', 'Failed to load job details.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [slug]);

    const handleDelete = async () => {
        if (!jobs) return;

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/jobs/${jobs.id}`);
                Swal.fire('Deleted!', 'Job has been deleted.', 'success');
                window.location.href = '/jobs';
            } catch (error) {
                console.error('Delete error:', error);
                Swal.fire('Error!', 'There was an error deleting the job.', 'error');
            }
        }
    };

    const deleteApplicant = async (applicantId: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`/applicants/${applicantId}`);
                Swal.fire('Deleted!', 'Applicant has been deleted.', 'success');
                fetchJobs(); // Refresh the job details
            } catch (error) {
                console.error('Delete applicant error:', error);
                Swal.fire('Error!', 'There was an error deleting the applicant.', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="animate-pulse text-xl text-gray-600">Loading job...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-red-50">
                <div className="text-xl text-red-700">{error}</div>
            </div>
        );
    }

    if (!jobs) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">Job not found.</div>
            </div>
        );
    }

    return (
        <div className="jobs container mx-auto px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <Link href="/admin/jobs" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Jobs
                </Link>

                <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="mb-2 text-4xl font-extrabold text-gray-900">{jobs.title}</h1>
                            <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                                    <Briefcase size={16} className="mr-1 inline" />
                                    {jobs.division}
                                </span>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
                                    <MapPin size={16} className="mr-1 inline" />
                                    {jobs.location}
                                </span>
                                <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-800">
                                    <LaptopMinimal size={16} className="mr-1 inline" />
                                    {jobs.type}
                                </span>
                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">
                                    <DollarSign size={16} className="mr-1 inline" />
                                    {jobs.salary}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-900">Requirements</h2>
                                <div
                                    className="prose prose-ul:list-disc prose-ol:list-decimal max-w-none leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: jobs.requirements || '' }}
                                />
                            </div>
                            <div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-900">Benefits</h2>
                                <div className="prose max-w-none">
                                    <div
                                        className="list-inside list-disc space-y-1 leading-relaxed text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: jobs.benefit || '' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Applicants Section */}
                        {jobs.applicants && (
                            <div className="mt-10">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Applicants</h2>
                                {jobs.applicants.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-200 bg-white">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border-b px-4 py-2 text-left">Name</th>
                                                    <th className="border-b px-4 py-2 text-left">Email</th>
                                                    <th className="border-b px-4 py-2 text-left">Phone</th>
                                                    <th className="border-b px-4 py-2 text-left">Education</th>
                                                    <th className="border-b px-4 py-2 text-left">Expected Salary</th>
                                                    <th className="border-b px-4 py-2 text-left">Start Date</th>
                                                    <th className="border-b px-4 py-2 text-left">Status</th>
                                                    <th className="border-b px-4 py-2 text-left">Address</th>
                                                    <th className="border-b px-4 py-2 text-left">Resume</th>
                                                    <th className="border-b px-4 py-2 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {jobs.applicants.map((applicant) => (
                                                    <tr key={applicant.id}>
                                                        <td className="border-b px-4 py-2">{applicant.name}</td>
                                                        <td className="border-b px-4 py-2">{applicant.email}</td>
                                                        <td className="border-b px-4 py-2">{applicant.phone}</td>
                                                        <td className="border-b px-4 py-2">{applicant.education}</td>
                                                        <td className="border-b px-4 py-2">
                                                            {applicant.expected_salary ? (
                                                                `Rp ${Number(applicant.expected_salary).toLocaleString('id-ID')}`
                                                            ) : (
                                                                <span className="text-gray-400 italic">Not specified</span>
                                                            )}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {applicant.start_date
                                                                ? new Date(applicant.start_date).toLocaleDateString('id-ID', {
                                                                      year: 'numeric',
                                                                      month: 'long',
                                                                      day: 'numeric',
                                                                  })
                                                                : '-'}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {/* existing status select here */}
                                                            <td className="border-b px-4 py-2">
                                                                <div className="relative">
                                                                    <select
                                                                        value={applicant.status}
                                                                        onChange={async (e) => {
                                                                            const newStatus = e.target.value;
                                                                            try {
                                                                                await axios.patch(`/applicants/${applicant.id}/status`, {
                                                                                    status: newStatus,
                                                                                });
                                                                                // Swal.fire("Success", "Status updated successfully", "success");
                                                                                fetchJobs(); // Refresh job + applicants
                                                                            } catch (error) {
                                                                                console.error('Failed to update status:', error);
                                                                                Swal.fire('Error', 'Failed to update status', 'error');
                                                                            }
                                                                        }}
                                                                        className={`cursor-pointer appearance-none rounded-full border px-3 py-1.5 pr-8 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${applicant.status === 'Applied' ? 'border-green-200 bg-green-100 text-green-800' : ''} ${applicant.status === 'Under Review' ? 'border-yellow-200 bg-yellow-100 text-yellow-800' : ''} ${applicant.status === 'Interview Scheduled' ? 'border-blue-200 bg-blue-100 text-blue-800' : ''} ${applicant.status === 'Hired' ? 'border-emerald-200 bg-emerald-100 text-emerald-800' : ''} ${applicant.status === 'Rejected' ? 'border-red-200 bg-red-100 text-red-800' : ''} `}
                                                                    >
                                                                        <option value="Applied" className="bg-green-100 text-green-800">
                                                                            Applied
                                                                        </option>
                                                                        <option value="Under Review" className="bg-yellow-100 text-yellow-800">
                                                                            Under Review
                                                                        </option>
                                                                        <option value="Interview Scheduled" className="bg-blue-100 text-blue-800">
                                                                            Interview Scheduled
                                                                        </option>
                                                                        <option value="Hired" className="bg-emerald-100 text-emerald-800">
                                                                            Hired
                                                                        </option>
                                                                        <option value="Rejected" className="bg-red-100 text-red-800">
                                                                            Rejected
                                                                        </option>
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <svg
                                                                            className="h-4 w-4 text-gray-500"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </td>
                                                        <td className="border-b px-4 py-2">{applicant.address}</td>
                                                        <td className="border-b px-4 py-2">
                                                            {applicant.resume ? (
                                                                <a
                                                                    href={`/storage/app/public/resumes/${applicant.resume}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    View CV
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400 italic">No file</span>
                                                            )}
                                                        </td>
                                                        <td className="border-b px-4 py-2 text-center">
                                                            <button
                                                                onClick={() => deleteApplicant(applicant.id)}
                                                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No applicants have applied for this job yet.</p>
                                )}
                            </div>
                        )}

                        <div className="mt-10 flex justify-start gap-4 border-t border-gray-200 pt-6">
                            <Link
                                href={`/admin/jobs/${jobs.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Edit size={18} />
                                Edit
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Show;
