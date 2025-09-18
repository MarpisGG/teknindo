  import React from 'react';

  interface AboutCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    web: string;
  }

  const AboutCard: React.FC<AboutCardProps> = ({
    imageSrc,
    imageAlt,
    title,
    description,
    web,
  }) => {
    return (
      <div className="w-72 rounded-xl overflow-hidden shadow-lg border border-gray-200  group relative">
        <img
          className="w-full h-56 object-cover px-4"
          src={`/storage/${imageSrc}`}
          alt={imageAlt}
        />
        <div className="px-6 py-4">
          <p className="font-bold text-lg mb-2 text-gray-900 ">{title}</p>
          <div
            className="text-sm text-justify break-words"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        {/* Tooltip */}
      {web && (
        <div className="absolute bottom-2 left-0 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-full rounded-lg px-4 py-2 backdrop-blur-md bg-white/60 border border-gray-200 shadow-lg">
            <a href={web} target="_blank" rel="noopener noreferrer">
              <p className="text-sm text-center text-gray-800">
                Click to visit the website
              </p>
            </a>
          </div>
        </div>
      )}
      </div>  );
  };

  export default AboutCard;
