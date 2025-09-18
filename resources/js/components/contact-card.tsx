import { BadgeCheck, Mail, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Contact = [
    {
        icon: <FaWhatsapp className="h-6 w-6" />,
        href: 'https://wa.me/6281355616263',
        label: '+62 813-5561-6263',
        name: (
            <p className="flex items-center justify-center font-medium">
                Teknindo Group <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
            </p>
        ),
        type: 'WhatsApp',
    },
    {
        icon: <Phone className="h-6 w-6" />,
        href: '',
        label: '021 38769054',
        name: 'Teknindo Group Head Office',
        type: 'Phone',
    },
    {
        icon: <Mail className="h-6 w-6" />,
        href: '',
        label: 'headoffice@teknindogroup.com',
        name: 'admin',
        type: 'Email',
    },
    // {
    //     icon: <MapPin className="h-6 w-6" />,
    //     href: 'https://maps.app.goo.gl/xyBjwypbdDLiSVi4A',
    //     label: 'View on Google Maps',
    //     name: '',
    //     type: 'Location',
    // },
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
            <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
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
                            <span className="-500 mb-2 text-xs font-semibold tracking-wider uppercase">{item.type}</span>

                            {/* Main contact info */}
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="-800 mb-2 text-lg font-semibold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[#FCC200] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="-800 mb-2 text-lg font-semibold">{item.label}</span>
                            )}

                            {/* Additional name/info */}
                            {item.name && <div className="-600 mt-1">{item.name}</div>}
                        </div>
                    </div>
                ))}
            </div>
            {/* Location Section */}
            <div className="mx-auto mb-16 max-w-4xl">
                <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-black">Our Location</h3>
                    <p className="text-black">Find us at our head office</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-300 shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0991570755964!2d106.77087999999999!3d-6.117352899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d4c9c3b99b7%3A0x628e329da406098f!2sPT.%20MITRA%20TEKNINDO%20SEJATI%20(Head%20Office)!5e0!3m2!1sen!2sid!4v1757306052849!5m2!1sen!2sid"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            {/* Social Media Section */}
            <div className="mx-auto mb-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <h3 className="-800 mb-2 text-2xl font-bold">Follow Us</h3>
                    <p className="-600">Stay connected on social media</p>
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
                                    <span className="-700 relative z-10 transform transition-colors duration-300 group-hover:scale-110 group-hover:text-white">
                                        {social.icon}
                                    </span>

                                    {/* Ripple effect */}
                                    <div className="absolute inset-0 animate-ping rounded-2xl bg-white opacity-0 group-hover:opacity-20"></div>
                                </a>

                                {/* Label below icon */}
                                <p className="-600 mt-2 text-center text-xs font-medium">{social.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
