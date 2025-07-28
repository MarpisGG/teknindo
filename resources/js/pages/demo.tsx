'use client';

import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HorizontalScrollCarouselDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/landing-products').then((res) => {
            setProducts(
                res.data.slice(0, 4).map((product: any) => ({
                    src: `/storage/${product.image}`,
                    label: product.name,
                    link: `/products/heavyweight-equipment/${product.slug}`, // tambahkan link
                })),
            );
        });
    }, []);

    return (
        <div className="bg-[#181818] dark:bg-stone-900">
            <h1 className="pt-10 text-center text-5xl font-bold text-white dark:text-white">Our Best Product</h1>
            <HorizontalScrollCarousel images={products} />
        </div>
    );
}
