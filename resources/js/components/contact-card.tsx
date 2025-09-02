import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Contact = [
    {
        icon: <FaWhatsapp className="h-6 w-6" />,
        href: 'https://wa.me/6281355616263',
        label: '+62 813-5561-6263',
        name: (
            <p className="flex items-center justify-center text-sm font-medium">
                Teknindo <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
            </p>
        ),
        type: 'WhatsApp',
    },
    {
        icon: <Phone className="h-6 w-6" />,
        href: '',
        label: '021 38769054',
        name: '',
        type: 'Phone',
    },
    {
        icon: <Mail className="h-6 w-6" />,
        href: '',
        label: 'teknindo@gmail.com',
        name: '',
        type: 'Email',
    },
    {
        icon: <MapPin className="h-6 w-6" />,
        href: 'https://maps.app.goo.gl/xyBjwypbdDLiSVi4A',
        label: 'View on Google Maps',
        name: '',
        type: 'Location',
    },
];

const defaultSocialLinks = [
    {
        icon: <FaInstagram className="h-6 w-6" />,
        href: 'https://www.instagram.com/teknindo.group/',
        label: 'Instagram',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: <FaFacebook className="h-6 w-6" />,
        href: 'https://www.facebook.com/pt.mitrateknindosejati',
        label: 'Facebook',
        color: 'from-blue-600 to-blue-700',
    },
    {
        icon: <FaTiktok className="h-6 w-6" />,
        href: 'https://www.tiktok.com/@mitra_teknindo_sejati',
        label: 'TikTok',
        color: 'from-gray-800 to-gray-900',
    },
    {
        icon: <FaLinkedin className="h-6 w-6" />,
        href: 'https://www.linkedin.com/company/pt-mitra-teknindo-sejati/',
        label: 'LinkedIn',
        color: 'from-blue-500 to-blue-600',
    },
];

function ContactCard() {
    return (
        <div className="">
            {/* Header */}
            {/* Contact Cards */}
            <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Contact.map((item, idx) => (
                    <div
                        key={idx}
                        className="group relative transform overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FCC200]/10 to-yellow-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Icon container with enhanced styling */}
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FCC200] to-yellow-400 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <span className="text-white">{item.icon}</span>
                            </div>

                            {/* Type label */}
                            <span className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">{item.type}</span>

                            {/* Main contact info */}
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="mb-2 text-lg font-semibold text-gray-800 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[#FCC200] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="mb-2 text-lg font-semibold text-gray-800">{item.label}</span>
                            )}

                            {/* Additional name/info */}
                            {item.name && <div className="mt-1 text-gray-600">{item.name}</div>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Social Media Section */}
            <div className="mx-auto mb-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-gray-800">Follow Us</h3>
                    <p className="text-gray-600">Stay connected on social media</p>
                </div>

                <div className="flex justify-center">
                    <ul className="flex flex-wrap justify-center gap-4">
                        {defaultSocialLinks.map((social, idx) => (
                            <li key={idx}>
                                <a
                                    href={social.href}
                                    aria-label={social.label}
                                    title={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex h-16 w-16 transform items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Gradient background on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                    ></div>

                                    {/* Icon */}
                                    <span className="relative z-10 transform text-gray-700 transition-colors duration-300 group-hover:scale-110 group-hover:text-white">
                                        {social.icon}
                                    </span>

                                    {/* Ripple effect */}
                                    <div className="absolute inset-0 animate-ping rounded-2xl bg-white opacity-0 group-hover:opacity-20"></div>
                                </a>

                                {/* Label below icon */}
                                <p className="mt-2 text-center text-xs font-medium text-gray-600">{social.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
