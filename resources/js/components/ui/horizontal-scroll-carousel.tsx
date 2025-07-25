import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import { MoveRight } from "lucide-react";



interface HorizontalScrollCarouselProps {
  images: { src: string; label: string }[];
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-95%"]) 

  return (
    
    <section
      ref={targetRef}
      className="relative h-[500vh] w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10">
          {images.map(({ src, label }, index) => (
            <Card src={src} label={label} key={index} />
          ))}

          {/* Tambahan konten di akhir carousel */}
          <div className="flex flex-col justify-center w-[80vw] max-w-[720px] aspect-[3/2] bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg text-white p-6 sm:p-8 text-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold p-4">Want to See More Amazing Products?</h2>
            <p className="text-lg sm:text-xl md:text-2xl p-4 text-justify">Explore our full collection of top-quality products and discover even more options tailored just for you.</p>
            <a
              href="/products"
              className="mt-4 inline-flex items-center text-sm text-white font-semibold py-1.5 px-3 rounded-lg "
            >
              View All Products 
              <MoveRight className="inline ml-2 h-4 w-4 transition-transform hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Card: React.FC<{ src: string; label: string }> = ({ src, label }) => {
  return (
    <div className="group relative w-[80vw] max-w-[720px] aspect-[3/2] overflow-hidden rounded-lg">
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md text-center">
          {label}
        </h2>
      </div>
    </div>
  );
};



export { HorizontalScrollCarousel };