import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Briefcase, Edit, LaptopMinimal, MapPin, Trash2 } from 'lucide-react';
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
    job_desc?: string;
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
                <div className="animate-pulse text-xl">Loading job...</div>
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
            <div className="mx-auto max-w-6xl">
                <Link href="/admin/jobs" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Jobs
                </Link>

                <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="mb-2 text-4xl font-extrabold text-gray-900">{jobs.title}</h1>
                            <div className="mb-4 flex flex-wrap gap-2 text-sm">
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
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-900">Job Description</h2>
                                <div
                                    className="prose prose-ul:list-disc prose-ol:list-decimal max-w-none leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: jobs.job_desc || '' }}
                                />
                            </div>
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
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {jobs.applicants.map((applicant) => (
                                            <div
                                                key={applicant.id}
                                                className="rounded border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                                            >
                                                <h3 className="mb-2 text-lg font-semibold text-gray-800">{applicant.name}</h3>
                                                <p className="text-md">
                                                    <span className="font-bold">Email :</span> {applicant.email}
                                                </p>
                                                <p className="text-md">
                                                    <span className="font-bold">Phone :</span> {applicant.phone}
                                                </p>
                                                <p className="text-md">
                                                    <span className="font-bold">Education :</span> {applicant.education}
                                                </p>
                                                <p className="text-md">
                                                    <span className="font-bold">Address :</span> {applicant.address}
                                                </p>
                                                <p className="text-md">
                                                    Expected Salary :{' '}
                                                    {applicant.expected_salary
                                                        ? `Rp ${Number(applicant.expected_salary).toLocaleString('id-ID')}`
                                                        : 'Not specified'}
                                                </p>
                                                <p className="text-md">
                                                    Start Date :{' '}
                                                    {applicant.start_date ? new Date(applicant.start_date).toLocaleDateString('id-ID') : '-'}
                                                </p>
                                                <div className="text-md mt-2">
                                                    Resume :{' '}
                                                    {applicant.resume ? (
                                                        <a
                                                            href={`/storage/${applicant.resume}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            View CV
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400 italic">No file</span>
                                                    )}
                                                </div>

                                                <div className="mt-4 flex items-center justify-between gap-2">
                                                    {/* Status Dropdown */}
                                                    <select
                                                        value={applicant.status}
                                                        onChange={async (e) => {
                                                            const newStatus = e.target.value;
                                                            try {
                                                                await axios.patch(`/applicants/${applicant.id}/status`, {
                                                                    status: newStatus,
                                                                });
                                                                fetchJobs();
                                                            } catch (error) {
                                                                console.error('Failed to update status:', error);
                                                                Swal.fire('Error', 'Failed to update status', 'error');
                                                            }
                                                        }}
                                                        className={`w-full rounded border px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#FCC200] focus:outline-none ${
                                                            applicant.status === 'Applied'
                                                                ? 'border-green-200 bg-green-100 text-green-800'
                                                                : applicant.status === 'Under Review'
                                                                  ? 'border-yellow-200 bg-yellow-100 text-yellow-800'
                                                                  : applicant.status === 'Interview Scheduled'
                                                                    ? 'border-blue-200 bg-blue-100 text-blue-800'
                                                                    : applicant.status === 'Hired'
                                                                      ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                                                                      : 'border-red-200 bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Under Review">Under Review</option>
                                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                                        <option value="Hired">Hired</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => deleteApplicant(applicant.id)}
                                                        className="ml-2 rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="">No applicants have applied for this job yet.</p>
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
