// components/navbar-admin.tsx
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

const menuItems = ['users', 'roles', 'blogs', 'jobs', 'products', 'categories', 'types', 'messages', 'subscriptions', 'quotations'];

const NavbarAdmin = () => {
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
        <nav className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                                key={item}
                                href={`/admin/${item}`}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    window.location.pathname === `/admin/${item}`
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="mt-4 hidden space-y-2 md:hidden">
                {menuItems.map((item) => (
                    <Link
                        key={item}
                        href={`/admin/${item}`}
                        className="block rounded px-3 py-2 text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-700"
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavbarAdmin;
