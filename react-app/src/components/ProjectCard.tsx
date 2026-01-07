import React from 'react';

/**
 * ProjectCard component summary:
 * Represents a single project in the portfolio grid.
 * Features an image with a title/category overlay that appears on hover.
 */

interface ProjectCardProps {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    images?: string[];
    description: string;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, imageUrl, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="project-item break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in border border-gray-100/50"
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
            />

            {/* Overlay with Centered Title */}
            <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center p-6"
            >
                <div className="text-center">
                    <h3
                        className="text-white text-2xl font-black tracking-tight leading-tight transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                    >
                        {title}
                    </h3>
                    <span
                        className="mt-2 inline-block text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                        {category}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
