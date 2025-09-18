// components/navbar-admin.tsx
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const menuItems = [
    { title: 'Users', href: '/admin/users', permission: 'user-create', icon: '👥' },
    { title: 'Roles', href: '/admin/roles', permission: 'role-create', icon: '🔑' },
    { title: 'Blogs', href: '/admin/blogs', permission: 'blog-create', icon: '📝' },
    { title: 'Jobs', href: '/admin/jobs', permission: 'job-create', icon: '💼' },
    { title: 'Products', href: '/admin/products', permission: 'product-create', icon: '📦' },
    { title: 'Category Products', href: '/admin/categories', permission: 'product-create', icon: '🏷️' },
    { title: 'Product Types', href: '/admin/types', permission: 'product-create', icon: '🔧' },
    { title: 'Message', href: '/admin/messages', permission: 'message-list', icon: '💬' },
    { title: 'Subscriptions', href: '/admin/subscriptions', permission: 'subscription-list', icon: '📧' },
    { title: 'Quotation', href: '/admin/quotations', permission: 'product-list', icon: '💰' },
    { title: 'Quotation Products', href: '/admin/quotation-products', permission: 'product-list', icon: '📋' },
    { title: 'Quotation Services', href: '/admin/quotation-services', permission: 'product-list', icon: '🛠️' },
    { title: 'Testimonials', href: '/admin/testimonials', permission: 'product-list', icon: '⭐' },
    { title: 'Locations', href: '/admin/locations', permission: 'product-list', icon: '📍' },
    { title: 'Location Footer', href: '/admin/location-footer', permission: 'product-list', icon: '🌐' },
    { title: 'Companies', href: '/admin/companies', permission: 'product-list', icon: '🏢' },
    { title: 'Landing Videos', href: '/admin/landing-videos', permission: 'product-list', icon: '🎥' },
    { title: 'Customers', href: '/admin/customers', permission: 'product-list', icon: '👨‍💼' },
];

interface PageProps {
    auth?: {
        permissions?: string[];
        user?: {
            name?: string;
            email?: string;
        };
    };
    [key: string]: any;
}

const NavbarAdmin = () => {
    const { props } = usePage<PageProps>();
    const userPermissions = props.auth?.permissions ?? [];
    const user = props.auth?.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Filter menu items based on permissions
    const filteredMenuItems = menuItems.filter((item) => userPermissions.includes(item.permission));

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('#profile-dropdown') && !target.closest('#profile-button')) {
                setIsProfileDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

    const isActiveRoute = (href: string) => {
        return window.location.pathname === href;
    };

    return (
        <nav className="sticky top-0 z-50 mb-6 border-b border-gray-200 bg-white shadow-lg">
            {/* First Line: Header with Logo and Profile */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <Link href="/admin/dashboard" className="flex items-center space-x-3 text-white transition-colors hover:text-blue-100">
                                <div className="bg-opacity-20 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-bold text-white backdrop-blur-sm">
                                    A
                                </div>
                                <div>
                                    <div className="text-xl font-bold">Admin Panel</div>
                                    <div className="text-xs text-blue-100">Management System</div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Profile Section */}
                        <div className="hidden items-center space-x-4 md:flex">
                            <div className="text-right text-white">
                                <div className="text-sm">Welcome back,</div>
                                <div className="font-semibold">{user?.name || 'Admin'}</div>
                            </div>

                            <div className="relative">
                                <button
                                    id="profile-button"
                                    onClick={toggleProfileDropdown}
                                    className="bg-opacity-20 hover:bg-opacity-30 flex items-center space-x-2 rounded-lg bg-white p-2 transition-all duration-200"
                                >
                                    <div className="bg-opacity-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-medium text-white backdrop-blur-sm">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <svg
                                        className={`h-4 w-4 text-white transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Profile Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div
                                        id="profile-dropdown"
                                        className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-xl"
                                    >
                                        <div className="border-b border-gray-100 px-4 py-3">
                                            <div className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</div>
                                            <div className="text-sm text-gray-500">{user?.email}</div>
                                        </div>
                                        <Link
                                            href="/admin/profile"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <span className="mr-3 text-lg">👤</span>
                                            <div>
                                                <div className="font-medium">Profile</div>
                                                <div className="text-xs text-gray-500">Manage your account</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/admin/settings"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <span className="mr-3 text-lg">⚙️</span>
                                            <div>
                                                <div className="font-medium">Settings</div>
                                                <div className="text-xs text-gray-500">System preferences</div>
                                            </div>
                                        </Link>
                                        <hr className="my-2" />
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            <span className="mr-3 text-lg">🚪</span>
                                            <div>
                                                <div className="font-medium">Logout</div>
                                                <div className="text-xs text-red-500">Sign out of your account</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="hover:bg-opacity-20 rounded-lg p-2 text-white transition-colors hover:bg-white md:hidden"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Second Line: Navigation Menu */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="scrollbar-hide hidden h-14 items-center overflow-x-auto md:flex">
                        <div className="flex min-w-max items-center space-x-1">
                            {filteredMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                        isActiveRoute(item.href)
                                            ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-b-2 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="text-base transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`transition-all duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden border-b border-gray-200 bg-white`}
            >
                <div className="space-y-2 px-4 py-4">
                    {/* Mobile Profile Section */}
                    <div className="mb-4 flex items-center space-x-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-lg font-medium text-white">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800">{user?.name || 'Admin'}</div>
                            <div className="text-xs text-gray-600">{user?.email}</div>
                        </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-1">
                        {filteredMenuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 rounded-lg p-3 transition-colors ${
                                    isActiveRoute(item.href)
                                        ? 'border-l-4 border-blue-600 bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Profile Actions */}
                    <div className="mt-4 space-y-1 border-t border-gray-200 pt-4">
                        <Link
                            href="/admin/profile"
                            className="flex items-center space-x-3 rounded-lg p-3 text-gray-600 transition-colors hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="text-lg">👤</span>
                            <span className="font-medium">Profile</span>
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center space-x-3 rounded-lg p-3 text-gray-600 transition-colors hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="text-lg">⚙️</span>
                            <span className="font-medium">Settings</span>
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center space-x-3 rounded-lg p-3 text-left text-red-600 transition-colors hover:bg-red-50"
                        >
                            <span className="text-lg">🚪</span>
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </nav>
    );
};

export default NavbarAdmin;
