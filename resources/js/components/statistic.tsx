import { motion } from 'framer-motion';
import React from 'react';
import ServiceStat from '../../assets/image/service-stat.jpeg';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CountUp = ({ end, duration }: { end: number; duration: number }) => {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const countRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;

        if (count < end) {
            const incrementTime = (duration * 1000) / end;
            const timer = setTimeout(() => {
                setCount((prevCount) => Math.min(prevCount + 1, end));
            }, incrementTime);

            return () => clearTimeout(timer);
        }
    }, [count, end, duration, isVisible]);

    return <span ref={countRef}>{count}</span>;
};

const Statistic = () => {
    return (
        <motion.section
            className="relative bg-cover bg-fixed bg-center py-10"
            style={{ backgroundImage: `url(${ServiceStat})` }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
        >
            {/* Ubah disini jadi lebih gelap */}
            <div className="absolute inset-0 z-10 bg-black/60"></div>

            <motion.div
                className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                {[
                    { value: 18, suffix: 'K+', label: 'Happy Customers' },
                    { value: 20, suffix: 'K+', label: 'Total Unit Sold' },
                    { value: 100, suffix: '%', label: 'Client Satisfaction' },
                    { value: 50, suffix: '+', label: 'Expert Team Members' },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="transform rounded p-6 text-center transition-all hover:scale-105"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="mb-2">
                            <span className="text-5xl font-bold text-yellow-500">
                                <CountUp end={stat.value} duration={2} />
                            </span>
                            <span className="text-5xl font-bold text-yellow-500">{stat.suffix}</span>
                        </div>
                        <p className="font-medium text-white">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default Statistic;
