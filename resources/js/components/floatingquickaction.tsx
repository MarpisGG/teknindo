import { MapPin, PencilLine, Phone } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const actions = [
    {
        icon: <PencilLine size={20} />,
        label: 'Request Quote',
        bg: 'bg-yellow-500',
        link: '/request-quote',
    },
    {
        icon: <MapPin size={20} />,
        label: 'Find Location',
        bg: 'bg-gray-300',
        link: '/location',
    },
    {
        icon: <Phone size={20} />,
        label: '1500228',
        bg: 'bg-yellow-500',
    },
    {
        icon: <FaWhatsapp size={20} />,
        label: 'Contact Our WhatsApp',
        bg: 'bg-gray-300',
        link: 'https://wa.me/62895330475188',
    },
];

const FloatingQuickActions: React.FC = () => {
    return (
        <div
            className={`fixed right-0 bottom-0 z-50 m-0 flex w-full flex-row items-center justify-between p-0 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:top-1/3 md:right-0 md:bottom-auto md:w-auto md:translate-y-0 md:flex-col md:items-end md:justify-normal md:space-y-0 md:shadow-none`}
        >
            {actions.map((action, index) => (
                <a
                    key={index}
                    href={action.link || '#'}
                    className={`group relative overflow-hidden ${action.bg} flex-1 text-white transition-all duration-300 ease-in-out md:flex-auto ${
                        index === 0 ? 'rounded-tl-lg md:rounded-tl-lg' : ''
                    } ${index === actions.length - 1 ? 'rounded-bl-lg md:rounded-bl-lg' : ''}`}
                >
                    <div
                        className={`group relative overflow-hidden ${action.bg} flex-1 text-black transition-all duration-300 ease-in-out group-hover:rounded-l-lg ${
                            index === 0 ? 'rounded-tl-lg md:rounded-tl-lg' : ''
                        } ${index === actions.length - 1 ? 'rounded-bl-lg md:rounded-bl-lg' : ''}`}
                    >
                        <button
                            className={`flex w-full items-center justify-center rounded-none px-2 py-3 transition-all duration-300 ease-in-out group-hover:rounded-l-lg md:w-auto md:justify-start md:px-4 ${
                                index === 0 ? 'rounded-tl-lg md:rounded-tl-lg' : ''
                            } ${index === actions.length - 1 ? 'rounded-bl-lg md:rounded-bl-lg' : ''}`}
                        >
                            {action.icon}
                            <span
                                className={`ml-2 hidden max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-xs md:inline`}
                            >
                                {action.label}
                            </span>
                        </button>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default FloatingQuickActions;
