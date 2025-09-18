import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, usePage } from '@inertiajs/react';

interface Business {
    id: number;
    title: string;
    slug: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    business: Business;
    [key: string]: any;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function BusinessDetail() {
    const { business } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen flex-col">
            <Head title={business.title} />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">{business.title}</h1>
            </div>
            <main className="flex flex-1 flex-col items-center px-4 py-4">
                <div className="w-full max-w-6xl">
                    <div className="mx-auto rounded-2xl p-10 text-justify text-lg leading-relaxed">
                        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: business.description }} />
                    </div>
                </div>
            </main>
            <FloatingQuickActions />
            <Footer7 />
        </div>
    );
}

export default BusinessDetail;
