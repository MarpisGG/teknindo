import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Handshake, MessageCircle, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

function useWindowSize() {
    const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}

const cultureValues = [
    {
        title: 'DISCIPLINE',
        logo: Clock,
        points: [
            'Maintain clear and organized documentation of work',
            'Arrive and leave according to official working hours',
            'Create a daily to-do list and track its progress',
            'Take responsibility for every commitment made',
            'Be punctual for meetings and deadlines',
            'Complete tasks according to standard operating procedures (SOP)',
        ],
    },
    {
        title: 'ACTIVE & PROACTIVE',
        logo: Zap,
        points: [
            'Take initiative without waiting for instructions',
            'Stay engaged in every task and seek opportunities to contribute',
            'Propose ideas or solutions before being asked',
            'Monitor project progress and follow up on any issues',
            'Provide constructive feedback for process improvement',
        ],
    },
    {
        title: 'INTERPERSONAL COMMUNICATION',
        logo: MessageCircle,
        points: [
            'Listen to colleagues without interrupting',
            'Express opinions politely and clearly',
            'Use company chat or group tools professionally',
            'Don’t hesitate to ask questions or seek clarification',
        ],
    },
    {
        title: 'RESPECT',
        logo: Handshake,
        points: [
            'Listen to and consider others’ perspectives',
            'Deliver feedback in a constructive, non-offensive manner',
            'Avoid gossip or negative comments about coworkers',
            'Appreciate diverse backgrounds, cultures, and viewpoints',
        ],
    },
    {
        title: 'COLLABORATION',
        logo: Users,
        points: [
            'Share helpful information with the team',
            'Respond actively during discussions or brainstorming sessions',
            'Respect ideas from other teams',
            'Prioritize collective solutions over personal ego',
        ],
    },
    {
        title: 'GROWTH MINDSET',
        logo: TrendingUp,
        points: [
            'Be open to feedback and learning',
            'View failures as opportunities to grow',
            'Seek out new learning experiences',
            'Celebrate progress, no matter how small',
            'Believe that skills can be developed through effort and persistence',
        ],
    },
];

export default function CardCareerCulture() {
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const width = useWindowSize();

    let itemsPerPage = 3;
    if (width < 768) itemsPerPage = 1;
    else if (width < 1024) itemsPerPage = 2;

    const handleNext = () => {
        setDirection('right');
        setStartIndex((prev) => (prev + 1) % cultureValues.length);
    };

    const handlePrev = () => {
        setDirection('left');
        setStartIndex((prev) => (prev - 1 + cultureValues.length) % cultureValues.length);
    };

    const getVisibleItems = () => Array.from({ length: itemsPerPage }, (_, i) => cultureValues[(startIndex + i) % cultureValues.length]);

    const variants = {
        enter: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-8 text-center text-2xl font-bold">Our Ways of Working</h1>
            <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="h-10 w-10 rounded-full border bg-white shadow hover:bg-gray-100">
                    ←
                </button>

                <div className="relative min-h-[350px] flex-1 overflow-hidden">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={`${startIndex}-${itemsPerPage}`}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className={`grid gap-6 ${itemsPerPage === 1 ? 'grid-cols-1' : itemsPerPage === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
                        >
                            {getVisibleItems().map((item, i) => (
                                <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-md md:min-h-[56vh]">
                                    <div className="mb-3 flex justify-center">
                                        <item.logo className="h-8 w-8 text-yellow-500" />
                                    </div>
                                    <p className="mb-4 text-center text-xl font-semibold">{item.title}</p>
                                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                        {item.points.map((pt, j) => (
                                            <li key={j}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button onClick={handleNext} className="h-10 w-10 rounded-full border bg-white shadow hover:bg-gray-100">
                    →
                </button>
            </div>
        </div>
    );
}
