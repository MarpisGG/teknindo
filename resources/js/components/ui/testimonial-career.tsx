import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import image from '../../../assets/image/excavator.png'

// --- Helper Components & Data ---

// All text data and images are the updated versions.
const testimonials = [
  {
    quote:
      "There’s so much to learn at Teknindo Group, and the colleagues are super fun to work with!",
    name: "Abim",
    designation: "Finance",
    src: image,
  },
  {
    quote:
      "Teknindo Group is a growing company that’s always improving in many areas. Since I joined, I’ve seen so many positive changes. The work environment is comfortable and safe, and the relationships between colleagues are genuinely good.",
    name: "Sylvie",
    designation: "Finance",
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This is my first time working in the heavy equipment industry, but the team here has helped me adapt quickly. My work is dynamic and full of challenges, which I see as opportunities to learn new things and keep growing.",
    name: "Angel",
    designation: "Digital Marketing",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Working at Teknindo Group is really fun. The team here is solid and always supportive of each other.",
    name: "Tanti",
    designation: "HR - GA",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D",
  },
  {
    quote:
      "This company truly prioritizes employee safety, whether at the warehouse or on site.",
    name: "Deri",
    designation: "Service",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D",
  },
  {
    quote:
      "I enjoy working with my team. We help each other and always try to do our best.",
    name: "Rafi",
    designation: "Digital Marketing",
    src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// --- Main Animated Testimonials Component ---
// This is the core component that handles the animation and logic.32
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

return (
  <div className="w-full max-w-3xl mx-auto px-4 py-8 font-sans antialiased md:px-8 lg:px-12">
    <div className="flex flex-col items-center text-center gap-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
        >
          <blockquote className="text-xl italic text-gray-700leading-relaxed">
            “{testimonials[active].quote}”
          </blockquote>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-800">
              {testimonials[active].name}
            </h2>
            <p className="text-sm text-slate-500">
              {testimonials[active].designation}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <ArrowLeft className="h-5 w-5 text-slate-800 group-hover:-translate-x-1 transition-transform " />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <ArrowRight className="h-5 w-5 text-slate-800 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

};


// --- Demo Component ---
function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}


// --- Main App Component ---
// This is the root of our application.
export function TestimonialCareer() {
  return (
    <div className="relative flex  w-full items-center justify-center overflow-hidden bg-slate-50 ">
        {/* Animated grid background with 10% opacity */}
        <style>
            {`
                @keyframes animate-grid {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                .animated-grid {
                    width: 200%;
                    height: 200%;
                    /* Grid color for light and  mode */
                    background-image: 
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px), 
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
                    background-size: 3rem 3rem;
                    animation: animate-grid 40s linear infinite alternate;
                }
            `}
        </style>
        <div className="animated-grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        
        {/* Content */}
        <div className="z-10 py-8">
            <p className="mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">What Our Teams Says</p>
            <AnimatedTestimonialsDemo />
        </div>
    </div>
  );
}
