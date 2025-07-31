import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, LaptopMinimal, MapPin, Search } from 'lucide-react';
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

type Job = {
    id: number;
    title: string;
    division: string;
    location: string;
    type: string;
    salary: string;
    slug: string;
};

const JobCard = ({ job, index }: { job: Job; index: number }) => (
    <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full max-w-3xl sm:w-[48%]"
    >
        <Link href={`/career/jobs/${job.slug}`} className="block h-full">
            <div className="grid h-full transform grid-cols-2 gap-2 rounded-xl border p-6 shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <div className="col-span-2">
                    <p className="mb-2 text-2xl font-semibold text-[#FCC200] hover:underline">{job.title}</p>
                </div>
                <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {job.division}
                </div>
                <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                </div>
                <div className="flex items-center text-sm">
                    <LaptopMinimal className="mr-2 h-4 w-4" />
                    {job.type}
                </div>
                <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {job.salary}
                </div>
                <div className="col-span-2 mt-2">
                    <span className="inline-block font-semibold text-[#FCC200] hover:underline">View Details →</span>
                </div>
            </div>
        </Link>
    </motion.div>
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
            job.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
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
            <div className="mx-auto min-h-screen max-w-6xl px-4 py-8">
                <motion.div className="mx-auto mb-4 w-full max-w-6xl" initial="hidden" animate="visible" variants={fadeInUp}>
                    <nav className="flex items-center text-sm" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="mx-2">›</span>
                                <Link href="/career" className="hover:underline">
                                    Career
                                </Link>
                            </li>
                            <li>
                                <span className="mx-2">›</span>
                                <span className="font-semibold">Jobs</span>
                            </li>
                        </ol>
                    </nav>
                </motion.div>

                <motion.p className="mb-4 text-center text-3xl font-bold md:text-5xl" initial="hidden" animate="visible" variants={fadeInUp}>
                    Open Positions
                </motion.p>

                <motion.div className="mb-6 flex justify-center" initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="relative w-full max-w-2xl">
                        <span className="pointer-events-none absolute top-5 left-3 flex -translate-y-1/2 items-center">
                            <Search className="h-5 w-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4 w-full rounded-lg border px-4 py-2 pl-10 shadow-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                        />
                    </div>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {loading ? (
                        <div className="flex w-full flex-wrap justify-center gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-full max-w-sm animate-pulse rounded-xl border p-6 shadow">
                                    <div className="mb-4 h-8 w-2/3 rounded bg-gray-200" />
                                    <div className="mb-2 flex items-center">
                                        <div className="mr-2 h-4 w-4 rounded bg-gray-200" />
                                        <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="mr-2 h-4 w-4 rounded bg-gray-200" />
                                        <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="mr-2 h-4 w-4 rounded bg-gray-200" />
                                        <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="mr-2 h-4 w-4 rounded bg-gray-200" />
                                        <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    </div>
                                    <div className="mt-4 h-6 w-1/3 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    ) : jobs.length > 0 ? (
                        filteredJobs.map((job, index) => <JobCard key={job.id} job={job} index={index} />)
                    ) : (
                        <p className="text-center">No jobs available.</p>
                    )}
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
