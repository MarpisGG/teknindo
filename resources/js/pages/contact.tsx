import FloatingQuickActions from '@/components/floatingquickaction';
import { Footer7 } from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';

interface FormData {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
    country?: string;
    company?: string;
    message: string;
}

interface SubmitStatus {
    success: boolean;
    message: string;
}

export default function ContactPage() {
    const defaultSocialLinks = [
        { icon: <FaInstagram className="size-5" />, href: 'https://www.instagram.com/teknindo.group/', label: 'Instagram' },
        { icon: <FaFacebook className="size-5" />, href: 'https://www.facebook.com/pt.mitrateknindosejati', label: 'Facebook' },
        { icon: <FaTiktok className="size-5" />, href: 'https://www.tiktok.com/@mitra_teknindo_sejati', label: 'Tiktok' },
        { icon: <FaLinkedin className="size-5" />, href: 'https://www.linkedin.com/company/pt-mitra-teknindo-sejati/', label: 'LinkedIn' },
    ];

    const [formData, setFormData] = React.useState<FormData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        message: '',
    });

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            await axios.post('/messages', formData);
            setSubmitStatus({
                success: true,
                message: 'Thank you! Your message has been sent.',
            });
            (e.target as HTMLFormElement).reset();
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                country: '',
                company: '',
                message: '',
            });
        } catch (error) {
            console.error(error);
            setSubmitStatus({
                success: false,
                message: 'Sorry, there was an error sending your message. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Contact Us" />
            <Navbar />

            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <nav className="mx-auto my-6 flex w-full max-w-6xl text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li>
                            <a href="/" className="font-medium text-gray-600 hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <span className="mx-2 text-gray-400">{'>'}</span>
                        </li>
                        <li aria-current="page" className="font-semibold text-gray-800">
                            Contact
                        </li>
                    </ol>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 mb-12 text-center"
                >
                    <h1 className="relative inline-block text-5xl font-extrabold text-slate-800 drop-shadow-lg">
                        <span className="relative z-10">Contact Us</span>
                        <span className="absolute -bottom-1 -left-1 z-0 text-gray-300">Contact Us</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 drop-shadow-sm">
                        Feel free to reach out to us with any questions, feedback, or collaboration opportunities.
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 overflow-hidden rounded-lg bg-white shadow-2xl md:grid-cols-5">
                    {/* LEFT CONTACT INFO */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-[#FCC200] px-8 py-10 text-slate-800 md:col-span-2"
                    >
                        <h2 className="mb-2 text-3xl font-bold">Contact Information</h2>
                        <p className="mb-6 text-lg font-medium opacity-90">Say something to start a conversation</p>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="mr-2 h-5 w-5" />
                                <span className="font-medium">+628123456789</span>
                            </div>
                            <div className="flex items-center">
                                <FaWhatsapp className="mr-2 h-5 w-5" />
                                <span className="font-medium">+628123456789</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-2 h-5 w-5" />
                                <span className="font-medium">teknindo@gmail.com</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-slate-800" />
                                <span className="leading-relaxed font-medium">
                                    Komplek Galeri Niaga Mediterania, Pantai Indah No.1 Blok. X3 No. G8A-8B, Kapuk, Kec. Penjaringan, Jkt Utara,
                                    Daerah Khusus Ibukota Jakarta 14460
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <iframe
                                title="Our Location"
                                src="https://maps.google.com/maps?q=-6.117374,106.770885&z=15&output=embed"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow-md"
                            ></iframe>
                        </div>

                        <div className="mt-6">
                            <p className="mb-2 text-lg font-medium opacity-90">Connect With Us</p>
                            <ul className="flex space-x-4">
                                {defaultSocialLinks.map((social, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={social.href}
                                            aria-label={social.label}
                                            title={social.label}
                                            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white hover:shadow-md"
                                        >
                                            <span className="scale-125 text-slate-800">{social.icon}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* RIGHT FORM */}
                    <motion.form
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-white px-8 py-10 md:col-span-3"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            First Name<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                            </div>
                            <div>
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Last Name<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Email<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                    required
                                />
                            </div>
                            <div>
                                <label>
                                    <p>
                                        <span className="mb-1 block text-sm font-bold">
                                            Phone<span className="text-red-500">*</span>
                                        </span>
                                    </p>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-bold">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-bold">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                                />
                            </div>
                        </div>

                        <div>
                            <label>
                                <p>
                                    <span className="mb-1 block text-sm font-bold">
                                        Message<span className="text-red-500">*</span>
                                    </span>
                                </p>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={8}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[#FCC200]"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <motion.button
                                whileHover={{ y: -2 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md bg-[#FCC200] px-6 py-2 font-medium text-slate-800 transition hover:bg-[#e0af00] disabled:opacity-70"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </div>

                        {submitStatus && (
                            <div
                                className={`mt-4 rounded-md p-3 ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                            >
                                {submitStatus.message}
                            </div>
                        )}
                    </motion.form>
                </div>
            </div>
            <FloatingQuickActions />
            <Footer7 />
        </>
    );
}
