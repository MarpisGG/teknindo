'use client';

import { HorizontalScrollCarousel } from '@/components/ui/horizontal-scroll-carousel';

import DrillingRig from '../../assets/image/drilling-rig.png';
import DumpTruck from '../../assets/image/dump-truck.png';
import Excavator from '../../assets/image/excavator.png';
import WheelLoader from '../../assets/image/wheel-loader.png';

const images = [
    { src: Excavator, label: 'Excavator' },
    { src: DumpTruck, label: 'Dump Truck' },
    { src: WheelLoader, label: 'Wheel Loader' },
    { src: DrillingRig, label: 'Drilling Rig' },
];

export default function HorizontalScrollCarouselDemo() {
    return (
        <div className="bg-[#181818] dark:bg-stone-900">
            <h1 className="pt-10 text-center text-5xl font-bold text-white dark:text-white">Our Best Product</h1>
            <HorizontalScrollCarousel images={images} />
        </div>
    );
}
