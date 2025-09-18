import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Clock, MapPin, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

type Job = {
    id: number;
    title: string;
    division: string;
    location: string;
    type: string;
    slug: string;
};

const JobCard = ({ job, index }: { job: Job; index: number }) => (
    <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group w-full max-w-md">
        <Link href={`/career/jobs/${job.slug}`} className="block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#FCC200]/30 hover:shadow-xl">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FCC200]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative space-y-4">
                    {/* Job Type Badge */}
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-[#FCC200]/10 px-3 py-1 text-xs font-medium text-[#FCC200]">
                            <Clock className="mr-1 h-3 w-3" />
                            {job.type}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#FCC200]" />
                    </div>

                    {/* Job Title */}
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FCC200]">
                            {job.title}
                        </h3>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                                <Briefcase className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="ml-3 truncate">{job.division}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                                <MapPin className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="ml-3 truncate">{job.location}</span>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#FCC200] group-hover:underline">View Details</span>
                            <div className="rounded-full bg-[#FCC200] p-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                <ChevronRight className="h-3 w-3 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
);

const SearchAndFilter = ({
    searchTerm,
    setSearchTerm,
    jobCount,
}: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    jobCount: number;
}) => (
    <motion.div className="mb-12 space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
        {/* Search Bar */}
        <div className="mx-auto max-w-2xl">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search jobs by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-300 focus:border-[#FCC200] focus:ring-2 focus:ring-[#FCC200]/20 focus:outline-none"
                />
            </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{jobCount} positions available</span>
            </div>
            <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Multiple departments</span>
            </div>
        </div>
    </motion.div>
);

const EmptyState = () => (
    <motion.div className="flex flex-col items-center justify-center py-16 text-center" initial="hidden" animate="visible" variants={fadeInUp}>
        <div className="mb-4 rounded-full bg-gray-100 p-6">
            <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your search terms or check back later for new opportunities.</p>
    </motion.div>
);

const LoadingSkeleton = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="space-y-4">
                    {/* Badge skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-20 rounded-full bg-gray-200" />
                        <div className="h-4 w-4 rounded bg-gray-200" />
                    </div>

                    {/* Title skeleton */}
                    <div className="space-y-2">
                        <div className="h-6 w-full rounded bg-gray-200" />
                        <div className="h-6 w-3/4 rounded bg-gray-200" />
                    </div>

                    {/* Details skeleton */}
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="mr-3 h-8 w-8 rounded-lg bg-gray-200" />
                            <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                        <div className="flex items-center">
                            <div className="mr-3 h-8 w-8 rounded-lg bg-gray-200" />
                            <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                    </div>

                    {/* Button skeleton */}
                    <div className="pt-4">
                        <div className="h-4 w-1/3 rounded bg-gray-200" />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            job.division.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );

    useEffect(() => {
        axios
            .get('/api/jobs')
            .then((res) => setJobs(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="mb-16">
                <Navbar />
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#FCC200]/5">
                <div className="absolute inset-0 -z-10 bg-[url('/images/career-hero-bg.png')] bg-cover bg-center opacity-10" />
                <div className="relative mx-auto min-h-screen max-w-6xl px-4 py-8">
                    {/* Breadcrumb */}
                    <motion.div className="mb-8" initial="hidden" animate="visible" variants={fadeInUp}>
                        <nav className="hidden items-center text-sm md:flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1">
                                <li>
                                    <Link href="/" className="text-gray-500 transition-colors hover:text-[#FCC200] hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <span className="mx-2 text-gray-400">›</span>
                                    <Link href="/career" className="text-gray-500 transition-colors hover:text-[#FCC200] hover:underline">
                                        Career
                                    </Link>
                                </li>
                                <li>
                                    <span className="mx-2 text-gray-400">›</span>
                                    <span className="font-semibold text-gray-900">Jobs</span>
                                </li>
                            </ol>
                        </nav>
                    </motion.div>

                    {/* Header */}
                    <motion.div className="mb-8 text-center" initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.h1
                            className="mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-[#FCC200] bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
                            variants={fadeInUp}
                        >
                            Open Positions
                        </motion.h1>
                        <motion.p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl" variants={fadeInUp}>
                            Join our team and help us build the future. Discover opportunities that match your skills and passion.
                        </motion.p>
                    </motion.div>

                    {/* Jobs Grid */}
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pb-16">
                        {loading ? (
                            <LoadingSkeleton />
                        ) : filteredJobs.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredJobs.map((job, index) => (
                                    <JobCard key={job.id} job={job} index={index} />
                                ))}
                            </div>
                        ) : searchTerm ? (
                            <EmptyState />
                        ) : (
                            <motion.div className="flex flex-col items-center justify-center py-16 text-center" variants={fadeInUp}>
                                <div className="mb-4 rounded-full bg-gray-100 p-6">
                                    <Briefcase className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">No positions available</h3>
                                <p className="text-gray-600">We're not hiring at the moment, but check back soon for new opportunities!</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
