import { ReactNode, useEffect, useRef, useState } from 'react';
import bg from '../../assets/image/bg-about.jpeg';
import thumbnail from '../../assets/image/thumbnail-about.jpeg';
import video from '../../assets/video/Compro Potongan.mp4';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
    const [touchStartY, setTouchStartY] = useState(0);
    const [isMobileState, setIsMobileState] = useState(false);

    const sectionRef = useRef(null);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }, [mediaType]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollDelta = e.deltaY * 0.002; // Increased sensitivity
                const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }
            }
        };

        const handleTouchStart = (e) => {
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e) => {
            if (!touchStartY) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }

                setTouchStartY(touchY);
            }
        };

        const handleTouchEnd = () => {
            setTouchStartY(0);
        };

        const handleScroll = () => {
            if (!mediaFullyExpanded) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [scrollProgress, mediaFullyExpanded, touchStartY]);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
    const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
    const textTranslateX = scrollProgress * (isMobileState ? 120 : 200); // Increased for better expansion effect

    const firstWord = title ? title.split(' ').slice(0, 2).join(' ') : '';
    const restOfTitle = title ? title.split(' ').slice(2).join(' ') : '';

    return (
        <div ref={sectionRef} className="overflow-x-hidden transition-colors duration-700 ease-in-out">
            <section className="relative flex min-h-screen flex-col items-center justify-start">
                <div className="relative flex min-h-screen w-full flex-col items-center">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-10 h-full transition-opacity duration-300" style={{ opacity: 1 - scrollProgress }}>
                        <img src={bgImageSrc} alt="Background" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="relative z-10 container mx-auto my-4 flex flex-col items-center justify-start px-4">
                        <div className="relative flex h-screen w-full flex-col items-center justify-center">
                            {/* Media Container */}
                            <div
                                className="relative z-20 overflow-hidden rounded-2xl shadow-2xl"
                                style={{
                                    width: `${Math.min(mediaWidth, window.innerWidth * 0.75)}px`,
                                    height: `${Math.min(mediaHeight, window.innerHeight * 0.8)}px`,
                                    transition: 'all 0.1s ease-out',
                                }}
                            >
                                {mediaType === 'video' ? (
                                    <div className="relative h-full w-full">
                                        <video
                                            src={mediaSrc}
                                            poster={posterSrc}
                                            autoPlay
                                            loop
                                            playsInline
                                            preload="auto"
                                            className="h-full w-full object-cover"
                                            controls={false}
                                            disablePictureInPicture
                                            disableRemotePlayback
                                            ref={(videoElement) => {
                                                if (videoElement) {
                                                    videoElement.volume = 0.01; // Set volume programmatically
                                                }
                                            }}
                                        />
                                        {/* Overlay */}
                                        <div
                                            className="absolute inset-0 bg-black/30 transition-opacity duration-300"
                                            style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative h-full w-full">
                                        <img src={mediaSrc} alt={title || 'Media content'} className="h-full w-full object-cover" />
                                        <div
                                            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
                                            style={{ opacity: 0.7 - scrollProgress * 0.3 }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div
                                className={`pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center text-center ${
                                    textBlend ? 'mix-blend-difference' : ''
                                }`}
                            >
                                {/* Title */}
                                {title && (
                                    <div className="mb-8">
                                        <h1
                                            className="mb-2 text-4xl font-bold text-white transition-transform duration-300 md:text-6xl lg:text-7xl"
                                            style={{ transform: `translateX(-${textTranslateX}px)`, opacity: 1 - scrollProgress * 1.2 }}
                                        >
                                            {firstWord}
                                        </h1>
                                        <h1
                                            className="text-4xl font-bold text-white transition-transform duration-300 md:text-6xl lg:text-7xl"
                                            style={{ transform: `translateX(${textTranslateX}px)`, opacity: 1 - scrollProgress * 1.2 }}
                                        >
                                            {restOfTitle}
                                        </h1>
                                    </div>
                                )}

                                {/* Date and Scroll Text */}
                                <div className="space-y-4">
                                    {scrollToExpand && (
                                        <p
                                            className="text-lg font-medium text-blue-200 transition-transform duration-300 md:text-xl"
                                            style={{ transform: `translateX(${textTranslateX}px)`, opacity: 1 - scrollProgress * 1.2 }}
                                        >
                                            {scrollToExpand}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Scroll Indicator */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ScrollExpansion = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFFF] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
            <ScrollExpandMedia
                mediaType="video"
                mediaSrc={video}
                posterSrc={thumbnail}
                bgImageSrc={bg}
                title="Get To Know Us"
                scrollToExpand="Scroll to Expand Media"
                textBlend={false}
            ></ScrollExpandMedia>
        </div>
    );
};

export default ScrollExpansion;
