import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import axios from "axios";
import { Trash2, Edit, ArrowLeft, MapPin, Briefcase, LaptopMinimal, DollarSign  } from "lucide-react";

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
    description?: string;
    job_desc?: string;
    requirements?: string;
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
            setError("No job identifier found");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/jobs/${slug}`);
            setJobs(response.data);
        } catch (error) {
            console.error("Failed to load job:", error);
            setError("Failed to load job details");
            Swal.fire("Error", "Failed to load job details.", "error");
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/jobs/${jobs.id}`);
                Swal.fire("Deleted!", "Job has been deleted.", "success");
                window.location.href = "/jobs";
            } catch (error) {
                console.error("Delete error:", error);
                Swal.fire("Error!", "There was an error deleting the job.", "error");
            }
        }
    };

    const deleteApplicant = async (applicantId: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`/applicants/${applicantId}`);
                Swal.fire("Deleted!", "Applicant has been deleted.", "success");
                fetchJobs(); // Refresh the job details
            } catch (error) {
                console.error("Delete applicant error:", error);
                Swal.fire("Error!", "There was an error deleting the applicant.", "error");
            }
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-xl text-gray-600 animate-pulse">Loading job...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-red-50">
                <div className="text-xl text-red-700">{error}</div>
            </div>
        );
    }

    if (!jobs) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Job not found.</div>
            </div>
        );
    }

    return (
        <div className="jobs container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/jobs"
                    className="inline-flex items-center text-blue-600 hover:underline mb-6 text-sm"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Jobs
                </Link>

                <article className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                {jobs.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                    <Briefcase size={16} className="inline mr-1" />
                                    {jobs.division}
                                </span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                    <MapPin size={16} className="inline mr-1" />
                                    {jobs.location}
                                </span>
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                                    <LaptopMinimal size={16} className="inline mr-1" />
                                    {jobs.type}
                                </span>
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                                    <DollarSign size={16} className="inline mr-1" />
                                    {jobs.salary}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
                                <div 
                                    className="text-gray-700 leading-relaxed" 
                                    dangerouslySetInnerHTML={{ __html: jobs.description || '' }}
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Details</h2>
                                <div className="prose max-w-none">
                                    <div
                                        className="text-gray-700 leading-relaxed list-disc list-inside space-y-1"
                                        dangerouslySetInnerHTML={{ __html: jobs.job_desc || '' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Requirements</h2>
                                <div 
                                    className="text-gray-700 leading-relaxed prose prose-ul:list-disc prose-ol:list-decimal max-w-none" 
                                    dangerouslySetInnerHTML={{ __html: jobs.requirements || '' }}
                                />
                            </div>
                        </div>

                        {/* Applicants Section */}
                        {jobs.applicants && (
                            <div className="mt-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Applicants</h2>
                                {jobs.applicants.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                                    <th className="py-2 px-4 border-b text-left">Email</th>
                                                    <th className="py-2 px-4 border-b text-left">Phone</th>
                                                    <th className="py-2 px-4 border-b text-left">Education</th>
                                                    <th className="py-2 px-4 border-b text-left">Expected Salary</th>
                                                    <th className="py-2 px-4 border-b text-left">Start Date</th>
                                                    <th className="py-2 px-4 border-b text-left">Status</th>
                                                    <th className="py-2 px-4 border-b text-left">Address</th>
                                                    <th className="py-2 px-4 border-b text-left">Resume</th>
                                                    <th className="py-2 px-4 border-b text-center">Actions</th>
                                                </tr>
                                                </thead>
                                            <tbody>
                                                {jobs.applicants.map((applicant) => (
                                                    <tr key={applicant.id}>
                                                        <td className="py-2 px-4 border-b">{applicant.name}</td>
                                                        <td className="py-2 px-4 border-b">{applicant.email}</td>
                                                        <td className="py-2 px-4 border-b">{applicant.phone}</td>
                                                        <td className="py-2 px-4 border-b">{applicant.education}</td>
                                                        <td className="py-2 px-4 border-b">
                                                        {applicant.expected_salary
                                                            ? `Rp ${Number(applicant.expected_salary).toLocaleString("id-ID")}`
                                                            : <span className="text-gray-400 italic">Not specified</span>}
                                                        </td>
                                                        <td className="py-2 px-4 border-b">
                                                        {applicant.start_date
                                                            ? new Date(applicant.start_date).toLocaleDateString("id-ID", {
                                                                year: "numeric", month: "long", day: "numeric"
                                                            })
                                                            : "-"}
                                                        </td>
                                                        <td className="py-2 px-4 border-b">
                                                        {/* existing status select here */}
                                                        <td className="py-2 px-4 border-b">
                                                        <div className="relative">
                                                            <select
                                                                value={applicant.status}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.value;
                                                                    try {
                                                                        await axios.patch(`/applicants/${applicant.id}/status`, { status: newStatus });
                                                                        // Swal.fire("Success", "Status updated successfully", "success");
                                                                        fetchJobs(); // Refresh job + applicants
                                                                    } catch (error) {
                                                                        console.error("Failed to update status:", error);
                                                                        Swal.fire("Error", "Failed to update status", "error");
                                                                    }
                                                                }}
                                                                className={`px-3 py-1.5 border rounded-full font-medium appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm
                                                                    ${applicant.status === 'Applied' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                                                    ${applicant.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                                                                    ${applicant.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                                                                    ${applicant.status === 'Hired' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : ''}
                                                                    ${applicant.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                                                                `}
                                                            >
                                                                <option value="Applied" className="bg-green-100 text-green-800">Applied</option>
                                                                <option value="Under Review" className="bg-yellow-100 text-yellow-800">Under Review</option>
                                                                <option value="Interview Scheduled" className="bg-blue-100 text-blue-800">Interview Scheduled</option>
                                                                <option value="Hired" className="bg-emerald-100 text-emerald-800">Hired</option>
                                                                <option value="Rejected" className="bg-red-100 text-red-800">Rejected</option>
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </td>
                                                        </td>
                                                        <td className="py-2 px-4 border-b">{applicant.address}</td>
                                                        <td className="py-2 px-4 border-b">
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
                                                        <td className="py-2 px-4 border-b text-center">
                                                        <button
                                                            onClick={() => deleteApplicant(applicant.id)}
                                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
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

                        <div className="flex justify-start gap-4 mt-10 pt-6 border-t border-gray-200">
                            <Link
                                href={`/admin/jobs/${jobs.id}/edit`}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit size={18} />
                                Edit
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
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

                                                   