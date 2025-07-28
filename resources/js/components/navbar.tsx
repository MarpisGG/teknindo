import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Globe, Menu, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Teknindo from '../../assets/image/Logo Teknindo Group - ORI (1).png';
import Teknindo1 from '../../assets/image/Teknindo Awal.png';

interface Types {
    id?: number;
    name?: string;
    slug?: string;
    description?: string;
}

const Navbar: React.FC = () => {
    const { t: translate, i18n } = useTranslation();
    const { auth: authData } = usePage().props;
    const [types, setTypes] = useState<Types[]>([]);
    const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [navhover, setNavHover] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 5);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setBusinessDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { href: '/contact', text: 'Contact Us' },
        { href: '/about', text: 'About Us' },
        { href: '/services', text: 'Services' },
        { href: '/career', text: 'Career' },
        { href: '/blogs', text: 'Blogs' },
        { href: '/products', text: 'Products' },
    ];

    useEffect(() => {
        axios
            .get('/api/types')
            .then((response) => setTypes(response.data))
            .catch((error) => console.error('Error fetching types:', error));
    }, []);

    const navTextClass = scrolled || hover ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700';

    const BusinessDropdownContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? 'space-y-1 pl-4' : 'absolute z-20 mt-5 w-64 bg-white'}`}>
            <div className={isMobile ? '' : 'group relative'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className="flex w-full items-center justify-between px-4 py-3 text-sm text-gray-900 hover:bg-yellow-50 hover:text-yellow-700">
                    <div className="flex items-center">
                        <Link href="/business/heavy-equipment" className="flex items-center">
                            <span className="mr-2">🔧</span> Heavy Equipment & Parts
                        </Link>
                        <div className="hidden md:flex">
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform" />
                        </div>
                    </div>
                </div>
                {!isMobile && hover && (
                    <div className="absolute top-0 left-full w-48 rounded-r-md bg-white opacity-100 transition-all duration-300">
                        {types.map((type) => (
                            <Link
                                key={type.id}
                                href={`/products/${type.slug}`}
                                className="block px-4 py-2 text-sm text-gray-900 hover:rounded-r-md hover:bg-yellow-50 hover:text-yellow-700"
                            >
                                {type.name}
                            </Link>
                        ))}
                        {types.length === 0 && <span className="block px-4 py-2 text-sm text-gray-500 italic">No types available</span>}
                    </div>
                )}
            </div>

            <Link
                href="/business/construction-equipment"
                className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-yellow-50 hover:text-yellow-700"
            >
                <span className="mr-2">🏗️</span> Construction Equipment
            </Link>
            <Link
                href="/business/mining-transportation"
                className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-yellow-50 hover:text-yellow-700"
            >
                <span className="mr-2">🚚</span> Mining Transportation
            </Link>
            <Link
                href="/business/mining-contractor"
                className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-yellow-50 hover:text-yellow-700"
            >
                <span className="mr-2">👷</span> Mining Contractor
            </Link>
            <Link
                href="/business/mining-services"
                className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-yellow-50 hover:text-yellow-700"
            >
                <span className="mr-2">⛏️</span> Mining Services
            </Link>
        </div>
    );

    return (
        <div
            className="group fixed top-0 z-50 w-full transition-all duration-300"
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}
        >
            <nav className={`transition-all duration-300 ${scrolled || navhover ? 'bg-[#181818]' : 'bg-transparent'} group-hover:bg-black`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className={`flex items-center ${typeof window !== 'undefined' && window.innerWidth < 768 ? '' : 'hover:bg-black'}`}
                        >
                            <img
                                src={scrolled || navhover ? Teknindo : Teknindo1}
                                alt="Logo"
                                className="mr-2 h-8 w-auto transition-all duration-300"
                            />
                        </Link>

                        <div className="hidden items-center space-x-6 md:flex">
                            <div className="relative inline-block text-left" ref={dropdownRef}>
                                <button
                                    onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                                    className={`relative flex items-center after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${navhover ? 'text-white hover:text-gray-200' : navTextClass}`}
                                >
                                    Business
                                    <ChevronDown
                                        className={`ml-1 h-4 w-4 transition-transform ${businessDropdownOpen ? 'rotate-180 transform' : ''}`}
                                    />
                                </button>
                                {businessDropdownOpen && <BusinessDropdownContent />}
                            </div>

                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${navhover ? 'text-white hover:text-gray-200' : navTextClass}`}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center md:space-x-4">
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    className={`${navhover ? 'text-white hover:text-gray-200' : navTextClass} mx-2`}
                                >
                                    <Search />
                                </button>
                                <div
                                    className={`absolute right-0 mt-2 transition-all duration-300 ${searchOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
                                >
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            router.get('/search', { query: formData.get('query') });
                                        }}
                                        className="flex items-center overflow-hidden rounded-md bg-white shadow-md"
                                    >
                                        <input name="query" placeholder="Search..." className="px-4 py-2 focus:outline-none" />
                                        <button type="submit" className="bg-gray-100 p-2 hover:bg-gray-200">
                                            <Search />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="relative mb-[6px] hidden md:block">
                                <button
                                    onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                                    className={`${navhover ? 'text-white hover:text-gray-200' : navTextClass} flex items-center`}
                                >
                                    <Globe className="h-5 w-5" />
                                    <span className="ml-1 text-sm">{i18n.language?.toUpperCase()}</span>
                                </button>
                                {languageDropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 rounded-md bg-white py-1 shadow-lg">
                                        <button
                                            onClick={() => {
                                                i18n.changeLanguage('en');
                                                setLanguageDropdownOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 text-left text-sm ${i18n.language === 'en' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => {
                                                i18n.changeLanguage('id');
                                                setLanguageDropdownOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 text-left text-sm ${i18n.language === 'id' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                        >
                                            Indonesia
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                className={`ml-4 md:hidden ${scrolled || navhover || mobileMenuOpen ? 'text-white' : 'text-gray-900'}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="bg-white shadow-md md:hidden">
                    <div className="space-y-2 px-4 pt-4 pb-2">
                        <button
                            onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                            className="flex w-full items-center justify-between py-2 text-left text-gray-900"
                        >
                            Business
                            <ChevronDown className={`h-4 w-4 transition-transform ${businessDropdownOpen ? 'rotate-180 transform' : ''}`} />
                        </button>
                        {businessDropdownOpen && <BusinessDropdownContent isMobile />}
                        {navLinks.map((item) => (
                            <Link key={item.href} href={item.href} className="block py-2 text-gray-900 hover:text-yellow-700">
                                {item.text}
                            </Link>
                        ))}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                router.get('/search', { query: formData.get('query') });
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center rounded-md border bg-white px-2 shadow-sm"
                        >
                            <input name="query" placeholder="Search..." className="flex-1 px-2 py-2 text-sm focus:outline-none" />
                            <button type="submit" className="p-2 text-gray-600">
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                        <button onClick={() => setLanguageDropdownOpen(true)} className="w-full py-2 text-left text-gray-900">
                            <Globe className="mr-1 inline" /> Change Language
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
