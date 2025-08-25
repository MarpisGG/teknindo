import axios from 'axios';
import { MoveRight } from 'lucide-react';
import React, { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Teknindo from '../../assets/image/Logo Teknindo Group - ORI (1).png';

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string; icon?: React.ReactElement }>;
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactElement;
        href: string;
        label: string;
    }>;
}

const defaultSections = [
    {
        title: 'Navigation',
        links: [
            { name: 'Home', href: '/' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Services', href: '/services' },
            { name: 'About Us', href: '/about' },
            { name: 'Career', href: '/career' },
            { name: 'Blogs', href: '/blogs' },
            { name: 'Products', href: '/products' },
        ],
    },
    {
        title: 'Our Branches',
        links: [
            { name: 'Jakarta Branch', href: 'https://maps.app.goo.gl/cf6ouSoAfw8qTgAC9' },
            { name: 'Tangerang Branch', href: 'https://maps.app.goo.gl/22tPesVz2hKMtCPSA' },
            { name: 'Surabaya Branch', href: 'https://maps.app.goo.gl/rBQXgFDrTd3Qcuqg9' },
            { name: 'Samarinda Branch', href: 'https://maps.app.goo.gl/WzC1UBWAfN8f2XsJ6' },
            { name: 'Makassar Branch', href: 'https://maps.app.goo.gl/Fed3z69hbaVyuoHz6' },
        ],
    },
    {
        title: 'Our Contact',
        links: [
            {
                name: ' 021 38769054',
                href: '#',
                icon: <FaPhone className="mr-2 inline" />,
            },
            {
                name: '+62 813-5561-6263',
                href: 'https://wa.me/6281355616263',
                icon: <FaWhatsapp className="mr-2 inline" />,
            },
            {
                name: 'teknindo@gmail.com',
                href: '#',
                icon: <CiMail className="mr-2 inline" />,
            },
        ],
    },
];

const defaultSocialLinks = [
    { icon: <FaInstagram className="size-5" />, href: 'https://www.instagram.com/teknindo.group/', label: 'Instagram' },
    { icon: <FaFacebook className="size-5" />, href: 'https://www.facebook.com/pt.mitrateknindosejati', label: 'Facebook' },
    { icon: <FaTiktok className="size-5" />, href: 'https://www.tiktok.com/@mitra_teknindo_sejati', label: 'Twitter' },
    { icon: <FaLinkedin className="size-5" />, href: 'https://www.linkedin.com/company/pt-mitra-teknindo-sejati/', label: 'LinkedIn' },
];

export const Footer7 = ({
    logo = {
        url: '/',
        src: Teknindo,
        alt: 'logo',
    },
    sections = defaultSections,
    description = 'Teknindo Group is a truste\d distributor of heavy equipment, trucks, and material handling solutions in Indonesia Established 2018, serving major corporations and projects nationwide with reliable solutions and strong after-sales service.',
    socialLinks = defaultSocialLinks,
}: Footer7Props) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/subscriptions', { email });
            setMessage('Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            setMessage('Failed to subscribe. Please try again.');
        }
    };

    return (
        <section className="bg-[#181818] px-4 pt-8 pb-20 text-white md:px-0">
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
                    {/* Logo & description */}
                    <div className="flex flex-col gap-4 lg:w-1/4">
                        <a href={logo.url}>
                            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
                        </a>
                        <p className="max-w-sm text-start text-sm leading-relaxed text-white">{description}</p>
                        <ul className="flex space-x-4">
                            {socialLinks.map((social, idx) => (
                                <li key={idx} className="group rounded-full transition hover:bg-white">
                                    <a href={social.href} aria-label={social.label} className="flex p-2">
                                        <span className="text-white group-hover:text-black">{social.icon}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {/* <div className="relative hidden md:block">
                            <div id="google_translate_element"></div>
                        </div> */}
                    </div>

                    {/* Links Sections & Newsletter */}
                    <div className="grid w-full gap-8 lg:grid-cols-4">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                                <ul className="space-y-3 text-sm">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a href={link.href} className="flex items-center text-white hover:text-gray-400">
                                                {link.icon && <span>{link.icon}</span>}
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Newsletter column */}
                        <div>
                            <h3 className="mb-4 font-bold text-white">Subscribe to our Newsletter</h3>
                            <p className="mb-3 text-sm text-gray-300">Get updates about our latest products and offers.</p>
                            <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
                                <div className="flex w-[95%] max-w-sm items-center">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full rounded-l-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-r-lg bg-[#FCC200] px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:shadow-lg active:scale-95"
                                    >
                                        <MoveRight className="size-4" />
                                    </button>
                                </div>
                                {message && <p className="text-xs text-gray-400">{message}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
