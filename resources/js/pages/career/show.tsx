import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Briefcase, DollarSign, LaptopMinimal, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Job {
    id: number;
    title: string;
    division: string;
    location: string;
    type: string;
    salary: string;
    job_desc: string;
    requirements: string;
    benefit: string;
}

interface Applicant {
    id: number;
    name: string;
    email: string;
    phone: string;
    education: string;
    expected_salary: string;
    address: string;
    resume: string;
    start_date?: string;
}

export default function JobDetailPage() {
    const { props } = usePage();
    const slug = props.slug as string;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [successMessage, setSuccessMessage] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        address: '',
        expected_salary: '',
        start_date: '',
        resume: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, resume: e.target.files?.[0] || null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        const data = new FormData();
        if (!job) {
            setErrors({ general: ['Job information not available'] });
            return;
        }

        // Ensure job has an id
        if (!job.id) {
            setErrors({ general: ['Job ID is missing'] });
            return;
        }

        data.append('job_id', job.id.toString());
        data.append('name', form.name);
        data.append('email', form.email);
        data.append('phone', form.phone);
        data.append('education', form.education);
        data.append('address', form.address);
        data.append('expected_salary', form.expected_salary);
        data.append('start_date', form.start_date);
        if (form.resume) {
            data.append('resume', form.resume);
        }

        try {
            const res = await axios.post('/applicants', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Your application was submitted successfully.');
            setForm({
                name: '',
                email: '',
                phone: '',
                education: '',
                address: '',
                expected_salary: '',
                start_date: '',
                resume: null,
            });
            // Reset file input
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (err: any) {
            console.error('Submission error:', err);
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors || {});
            } else if (err.response) {
                setErrors({ general: [err.response.data.message || 'An error occurred'] });
            } else {
                setErrors({ general: ['Network error. Please try again.'] });
            }
        }
    };
    useEffect(() => {
        axios
            .get(`/api/jobs/${slug}`)
            .then((res) => setJob(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="py-20 text-center text-gray-600">Loading...</div>;
    if (!job) return <div className="py-20 text-center text-red-500">Job not found</div>;

    return (
        <>
            <Navbar />
            <div className="pt-20 pb-10">
                <div className="mx-auto max-w-6xl px-4">
                    {/* Breadcrumb */}
                    <nav className="mb-6 hidden text-sm text-gray-500 md:block" aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center space-x-2">
                            <li>
                                <a href="/" className="hover:underline">
                                    Home
                                </a>
                                <span className="mx-1">/</span>
                            </li>
                            <li>
                                <a href="/career" className="hover:underline">
                                    Career
                                </a>
                                <span className="mx-1">/</span>
                            </li>
                            <li>
                                <a href="/career/jobs" className="hover:underline">
                                    Jobs
                                </a>
                                <span className="mx-1">/</span>
                            </li>
                            <li className="max-w-xs truncate font-semibold text-gray-800 dark:text-white" title={job.title}>
                                {job.title}
                            </li>
                        </ol>
                    </nav>

                    {/* Job Title */}
                    <h1 className="mb-4 text-center text-4xl font-bold text-[#FCC200]">{job.title}</h1>

                    {/* Job Info Grid */}
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-8 bg-white p-4">
                        <div className="text-md flex items-center text-gray-700">
                            <Briefcase className="mr-2 h-6 w-6" />
                            <span>{job.division}</span>
                        </div>
                        <div className="text-md flex items-center text-gray-700">
                            <MapPin className="mr-2 h-6 w-6" />
                            <span>{job.location}</span>
                        </div>
                        <div className="text-md flex items-center text-gray-700">
                            <LaptopMinimal className="mr-2 h-6 w-6" />
                            <span>{job.type}</span>
                        </div>
                        <div className="text-md flex items-center text-gray-700">
                            <DollarSign className="mr-2 h-6 w-6" />
                            <span>{job.salary}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-4 border-gray-300" />

                    {/* Job Description */}
                    <div className="mb-8">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900">Job Description</h2>
                        <div
                            className="prose prose-ul:list-disc prose-ol:list-decimal max-w-none leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{ __html: job.job_desc }}
                        />
                    </div>
                    <hr className="my-4 border-gray-300" />

                    {/* Requirements */}
                    <div className="mb-8">
                        <h2 className="jobs mb-2 text-2xl font-semibold text-gray-800">Requirements</h2>
                        <div className="jobs prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: job.requirements }} />
                    </div>

                    <hr className="my-4 border-gray-300" />

                    {/* Benefits */}
                    <div className="mb-12">
                        <h2 className="jobs mb-2 text-2xl font-semibold text-gray-800">Benefits</h2>
                        <div className="jobs prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: job.benefit }} />
                    </div>

                    {/* Apply */}
                    <div className="mt-12 border-t pt-10">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Apply Now</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Name */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Full Name<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                                {errors.name && <span className="mt-1 text-sm text-red-500">{errors.name[0]}</span>}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Email<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                                {errors.email && <span className="mt-1 text-sm text-red-500">{errors.email[0]}</span>}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Phone<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                                {errors.phone && <span className="mt-1 text-sm text-red-500">{errors.phone[0]}</span>}
                            </div>

                            {/* Education */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Education<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <select
                                    name="education"
                                    value={form.education}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                >
                                    <option value="">Select Education</option>
                                    <option value="SMA/SMK/Sederajat">SMA/SMK/Sederajat</option>
                                    <option value="D3/D4">D3/D4</option>
                                    <option value="S1">S1</option>
                                    <option value="S2">S2</option>
                                </select>
                                {errors.education && <span className="mt-1 text-sm text-red-500">{errors.education[0]}</span>}
                            </div>

                            {/* Address */}
                            <div className="col-span-2 flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Address<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                                {errors.address && <span className="mt-1 text-sm text-red-500">{errors.address[0]}</span>}
                            </div>

                            {/* Expected Salary */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Expected Salary<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="number"
                                    name="expected_salary"
                                    placeholder="Ex : 5000000"
                                    value={form.expected_salary}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    required
                                    min="0"
                                    step="any"
                                    style={{ MozAppearance: 'textfield' }}
                                />
                                {errors.expected_salary && <span className="mt-1 text-sm text-red-500">{errors.expected_salary[0]}</span>}
                            </div>

                            {/* Start Date */}
                            <div className="flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Start Date<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={form.start_date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                                {errors.start_date && <span className="mt-1 text-sm text-red-500">{errors.start_date[0]}</span>}
                            </div>

                            {/* Resume */}
                            <div className="col-span-2 flex flex-col">
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm">
                                            <span className="font-bold">Upload your resume</span>
                                            <span className="text-red-500">*</span>
                                            <span className="ml-2 text-xs text-gray-500">(PDF, DOC, DOCX only)</span>
                                        </span>
                                    </p>
                                </label>
                                <div className="w-full md:w-1/2">
                                    <label
                                        htmlFor="resume-upload"
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-3 py-6 transition hover:border-[#FCC200]"
                                        style={{ minHeight: '110px' }}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                                handleFileChange({
                                                    target: { files: e.dataTransfer.files, name: 'resume' },
                                                } as any);
                                            }
                                        }}
                                    >
                                        <input
                                            id="resume-upload"
                                            type="file"
                                            name="resume"
                                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required
                                        />
                                        {form.resume ? (
                                            <span className="truncate text-sm text-gray-700">{form.resume.name}</span>
                                        ) : (
                                            <>
                                                <span className="text-sm text-gray-400">
                                                    Drag &amp; drop your resume here, or <span className="text-[#FCC200] underline">browse</span>
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                {errors.resume && <span className="mt-1 text-sm text-red-500">{errors.resume[0]}</span>}
                            </div>

                            {/* Submit */}
                            <div className="col-span-2">
                                {successMessage && <div className="mb-4 w-full rounded bg-green-100 p-4 text-green-700">{successMessage}</div>}
                                <button
                                    type="submit"
                                    className="w-full rounded bg-[#FCC200] px-6 py-3 font-semibold text-white transition hover:bg-yellow-500"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
