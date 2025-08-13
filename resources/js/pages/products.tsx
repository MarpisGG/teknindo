import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import SliderImageProduct from '@/components/slider-image-product';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Types {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

function Products() {
    const [types, setTypes] = useState<Types[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/types')
            .then((response) => setTypes(response.data))
            .catch((error) => console.error('Error fetching types:', error))
            .finally(() => setLoading(false));
    }, []);

    // Skeleton Card
    const SkeletonCard = () => (
        <div className="mx-auto my-4 flex w-full max-w-6xl animate-pulse flex-col rounded-2xl bg-gray-200 shadow-lg md:flex-row dark:bg-[#232326]">
            {/* Left Side */}
            <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/2 md:p-8">
                <div className="mb-4 h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-48 w-full rounded bg-gray-300 md:h-64 dark:bg-gray-600"></div>
            </div>
            {/* Right Side */}
            <div className="flex w-full flex-col p-4 md:w-1/2 md:p-8">
                <div className="mb-4 h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mb-4 h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mt-auto h-10 w-48 rounded bg-gray-300 dark:bg-gray-600"></div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Products" />
            <div className="mb-16 md:mb-0">
                <Navbar />
            </div>
            <SliderImageProduct />
            <div className="dark flex items-center justify-center bg-[#d9d9d9] py-8 text-gray-800 dark:text-gray-200">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">Products Page</h1>
                    <p className="text-lg">Explore our range of products.</p>
                </div>
            </div>
            <div className="flex flex-col py-8">
                <div className="flex flex-wrap justify-center">
                    {loading
                        ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
                        : types.map((type, idx) => {
                              const isGray = idx % 4 === 1 || idx % 4 === 2;
                              return (
                                  <motion.div
                                      key={type.id}
                                      className={`mx-auto my-4 flex w-full max-w-6xl flex-col rounded-2xl shadow-lg transition-all duration-300 md:flex-row ${isGray ? 'bg-[#fcc200] dark:bg-[#232326]' : 'bg-white dark:bg-[#18181b]'} hover:scale-[1.02] hover:shadow-xl`}
                                      initial={{ opacity: 0, y: 50 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.2, ease: 'easeOut' }}
                                      viewport={{ once: true }}
                                  >
                                      {/* Left Side */}
                                      <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/2 md:p-8">
                                          <h1 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                                              {type.name}
                                          </h1>
                                          <div className="flex h-48 w-full items-center justify-center md:h-64">
                                              <img
                                                  src={`/storage/${type.image}`}
                                                  alt={type.name}
                                                  className="max-h-full max-w-full object-contain dark:bg-[#232326]"
                                              />
                                          </div>
                                      </div>
                                      {/* Right Side */}
                                      <div className="flex w-full flex-col p-4 md:w-1/2 md:p-8">
                                          <h3 className="mb-6 text-base text-gray-700 md:text-lg dark:text-gray-300">{type.description}</h3>
                                          <div className="flex">
                                              <Link href={`/products/${type.slug ?? type.id}`} className="w-full">
                                                  <InteractiveHoverButton
                                                      className={`w-full py-2 text-base font-medium md:w-48 ${isGray ? '' : 'bg-[#d9d9d9]'} rounded-lg`}
                                                  >
                                                      Learn More
                                                  </InteractiveHoverButton>
                                              </Link>
                                          </div>
                                      </div>
                                  </motion.div>
                              );
                          })}
                </div>
            </div>
            <motion.div className="dark:bg-[#0a0a0a]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <motion.div
                    className="mx-auto bg-[#fcc200] dark:bg-[#0a0a0a]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h1 className="mb-4 pt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Discover More of Our Products</h1>
                    <p className="mx-auto pb-8 text-justify text-lg text-gray-600 md:text-center dark:text-gray-400">
                        Explore our full product catalog for more solutions to fit your needs.
                        <br />
                        <a
                            href="https://www.mitrateknindosejati.com/product"
                            className="mx-1 font-bold text-gray-800 hover:underline dark:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See More Products in www.mitrateknindosejati.com
                        </a>
                    </p>
                </motion.div>
            </motion.div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}

export default Products;
