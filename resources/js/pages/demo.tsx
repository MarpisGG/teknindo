'use client';

import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HorizontalScrollCarouselDemo() {
    const [products, setProducts] = useState<{ src: string; label: string; link: string }[]>([]);

    useEffect(() => {
        axios.get('/api/landing-products').then((res) => {
            setProducts(
                res.data.slice(0, 4).map((product: any) => ({
                    src: `/storage/${product.image}`,
                    label: product.name,
                    // pakai optional chaining biar aman kalau type null
                    link: `/products/${product.type?.slug || 'unknown'}/${product.slug}`,
                })),
            );
        });
    }, []);

    return (
        <div className="bg-[#181818] dark:bg-stone-900">
            <h1 className="pt-10 text-center text-5xl font-bold text-white dark:text-white">Our Best Service</h1>
            <HorizontalScrollCarousel images={products} />
        </div>
    );
}
