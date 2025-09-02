// components/navbar-admin.tsx
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const menuItems = [
    { title: 'Users', href: '/admin/users', permission: 'user-create' },
    { title: 'Roles', href: '/admin/roles', permission: 'role-create' },
    { title: 'Blogs', href: '/admin/blogs', permission: 'blog-create' },
    { title: 'Jobs', href: '/admin/jobs', permission: 'job-create' },
    { title: 'Products', href: '/admin/products', permission: 'product-create' },
    { title: 'Category Products', href: '/admin/categories', permission: 'product-create' },
    { title: 'Product Types', href: '/admin/types', permission: 'product-create' },
    { title: 'Message', href: '/admin/messages', permission: 'message-list' },
    { title: 'Subscriptions', href: '/admin/subscriptions', permission: 'subscription-list' },
    { title: 'Quotation', href: '/admin/quotations', permission: 'product-list' },
    { title: 'Quotation Products', href: '/admin/quotation-products', permission: 'product-list' },
];

interface PageProps {
    auth?: {
        permissions?: string[];
    };
    [key: string]: any;
}

const NavbarAdmin = () => {
    const { props } = usePage<PageProps>();
    const userPermissions = props.auth?.permissions ?? [];
    useEffect(() => {
        // Optional: Untuk menutup menu saat ukuran layar berubah
        const handleResize = () => {
            const menu = document.getElementById('mobile-menu');
            if (menu && window.innerWidth >= 768) {
                menu.classList.add('hidden');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="mb-6 rounded-lg bg-white p-4">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center">
                {/* Kiri: Logo */}
                <div className="flex w-full items-center justify-between md:w-auto">
                    <Link href="/admin/dashboard" className="text-xl font-bold text-blue-600">
                        Dashboard
                    </Link>

                    {/* Tombol menu mobile */}
                    <button
                        className="text-gray-500 hover:text-gray-700 md:hidden"
                        onClick={() => {
                            const menu = document.getElementById('mobile-menu');
                            if (menu) menu.classList.toggle('hidden');
                        }}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Tengah: Desktop Menu */}
                <div className="hidden flex-grow items-center justify-center md:flex">
                    <div className="flex items-center gap-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    window.location.pathname === item.href
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="mt-4 hidden space-y-2 md:hidden">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded px-3 py-2 text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-700"
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavbarAdmin;
