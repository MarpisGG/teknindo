import React from 'react';

interface AboutCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  return (
    <div className="w-72 rounded-xl overflow-hidden shadow-lg bg-[#FDFDFC] dark:bg-[#0a0a0a] group relative">
      <img
        className="w-full h-56 object-fill p-4"
        src={imageSrc}
        alt={imageAlt}
      />
      <div className="px-6 py-4">
        <p className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm  dark:text-gray-400 text-justify break-words">
          {description}
        </p>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-2 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-full rounded-lg px-4 py-2 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="text-sm text-center text-gray-800 dark:text-gray-200">
            Click to visit the website
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
