import { Briefcase, MapPin, PencilLine, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const actions = [
    {
        icon: <PencilLine size={16} />,
        label: 'Request Quote',
        bg: 'bg-yellow-500',
        iconBg: 'bg-yellow-400',
        link: '/request-quote',
    },
    {
        icon: <MapPin size={16} />,
        label: 'Find Location',
        bg: 'bg-gray-300',
        iconBg: 'bg-yellow-300',
        link: '/location',
    },
    {
        icon: <Phone size={16} />,
        label: ' 021 38769054',
        bg: 'bg-yellow-500',
        iconBg: 'bg-yellow-500',
    },
    {
        icon: <FaWhatsapp size={16} />,
        label: 'Contact by WhatsApp',
        bg: 'bg-gray-300',
        iconBg: 'bg-yellow-300',
        hasSubmenu: true,
        submenu: [
            { label: 'Heavy Equipment', link: 'https://wa.me/6281355616263?text=I%20need%20help%20with%20Heavy%20Equipment' },
            { label: 'Spare Part', link: 'https://wa.me/628118885331?text=I%20need%20help%20with%20Spare%20Part' },
        ],
    },
];

interface FloatingQuickActionsProps {
    currentUrl?: string;
}

const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({ currentUrl = '/' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleActionClick = (action: (typeof actions)[0], index: number) => {
        if (action.hasSubmenu) {
            setOpenIndex(openIndex === index ? null : index);
        } else if (action.link) {
            window.location.href = action.link;
        } else {
            // Handle phone number click
            if (action.label.includes('021')) {
                window.location.href = `tel:${action.label.trim()}`;
            }
        }
    };

    return (
        <div
            className={`fixed right-0 bottom-0 z-50 m-0 flex w-full flex-row items-center justify-between p-0 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] hover:pointer-events-auto md:top-1/2 md:right-0 md:bottom-auto md:w-auto md:translate-y-0 md:flex-col md:items-end md:justify-normal md:space-y-0 md:shadow-none`}
        >
            {actions.map((action, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={index} className="group relative w-full md:w-auto">
                        <div
                            className={`overflow-hidden ${action.bg} flex-1 transition-all duration-300 ease-in-out md:flex-auto ${
                                index === 0 ? 'md:rounded-tl-lg' : ''
                            } ${index === actions.length - 1 ? 'md:rounded-bl-lg' : ''}`}
                        >
                            <button
                                onClick={() => handleActionClick(action, index)}
                                className={`flex w-full items-center justify-center rounded-none px-2 py-2 transition-all duration-300 ${action.iconBg} ease-in-out group-hover:rounded-l-lg md:w-auto md:justify-start md:px-3 ${
                                    index === 0 ? 'md:rounded-tl-lg' : ''
                                } ${index === actions.length - 1 ? 'md:rounded-bl-lg' : ''}`}
                            >
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full`}>{action.icon}</div>
                                <span
                                    className={`ml-2 hidden max-w-0 overflow-hidden text-xs font-medium whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-xs md:inline`}
                                >
                                    {action.label}
                                </span>
                            </button>
                        </div>
                        {/* Submenu */}
                        {action.hasSubmenu && (
                            <div
                                className={`absolute bottom-full left-0 w-50 rounded-l-lg border bg-white p-2 text-sm shadow-lg transition-all duration-200 ease-out md:right-0 md:left-auto ${
                                    isOpen
                                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                                        : 'pointer-events-none translate-y-2 scale-95 opacity-0'
                                } md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100`}
                            >
                                {action.submenu?.map((sub, subIndex) => (
                                    <a
                                        key={subIndex}
                                        href={sub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded px-3 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-100"
                                    >
                                        {sub.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {currentUrl === '/career' && (
                <a
                    href="/career/jobs"
                    className={`group relative flex-1 overflow-hidden bg-yellow-500 text-white transition-all duration-300 ease-in-out hover:bg-yellow-600 md:mt-12 md:flex-auto md:rounded-l-lg`}
                >
                    <div className="group relative flex-1 overflow-hidden bg-yellow-500 text-black transition-all duration-300 ease-in-out group-hover:rounded-l-lg">
                        <div className="flex w-full items-center justify-center rounded-none px-2 py-3 transition-all duration-300 ease-in-out md:w-auto md:justify-start md:px-4">
                            <Briefcase size={20} />
                            <span className="ml-2 hidden text-sm font-medium whitespace-nowrap md:inline">Explore Our Open Position</span>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
};

export default FloatingQuickActions;
