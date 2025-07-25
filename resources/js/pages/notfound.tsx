import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import FuzzyText from '@/components/ui/FuzzyText';
import { Head, Link } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <>
            <Head title="404 - Page Not Found" />
            <Navbar />

            <div className="flex min-h-[100vh] flex-col items-center justify-center bg-white px-4 text-gray-800">
                <div className="w-full max-w-md text-center">
                    {/* Fuzzy Header */}
                    <div className="mb-8 flex flex-col items-center gap-6">
                        <FuzzyText
                            fontSize="clamp(4rem, 10vw, 7rem)"
                            fontWeight={900}
                            color="#fcc200" // Tailwind's red-600
                            enableHover={false}
                        >
                            404
                        </FuzzyText>
                        <FuzzyText fontSize="clamp(1.5rem, 4vw, 2.5rem)" fontWeight={700} color="#fcc200" enableHover={false}>
                            Page Not Found
                        </FuzzyText>
                    </div>

                    {/* Explanation */}
                    <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                        The page you are looking for might have been removed had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Action Button */}
                    <Link
                        href="/"
                        className="group inline-flex items-center rounded-lg bg-[#fcc200] px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-yellow-200"
                    >
                        <MoveLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-2" />
                        Back to Homepage
                    </Link>
                </div>
            </div>

            <Footer7 />
        </>
    );
};

export default NotFound;
