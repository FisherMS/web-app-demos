import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CategoryFilter from '../components/CategoryFilter';
import ProjectCard from '../components/ProjectCard';
import ImageLightbox from '../components/ImageLightbox';
import portfolioData from '../data/portfolio.json';

/**
 * Home page summary:
 * The main landing page of the portfolio.
 * Displays a Masonry-style grid of project cards with filtering and lightbox functionality.
 */

const Home: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("最新项目");
    const [lightboxState, setLightboxState] = useState({
        isOpen: false,
        gallery: [] as string[],
        initialIndex: 0,
        title: "",
        description: "",
    });

    const projects = portfolioData.filter((project) => project.visible !== false);

    const filteredProjects = activeCategory === "最新项目"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const openLightbox = (project: typeof projects[0]) => {
        const gallery = project.images && project.images.length > 0 ? project.images : [project.imageUrl];
        setLightboxState({
            isOpen: true,
            gallery,
            initialIndex: 0,
            title: project.title,
            description: project.description,
        });
    };

    const closeLightbox = () => {
        setLightboxState(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <MainLayout title="作品集">
            <header className="pt-8 pb-3 px-6 bg-white shrink-0">
                <h1 className="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">
                    作品集
                </h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">
                    精选作品与创意项目
                </p>
            </header>

            <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <div className="p-4 pb-24 min-h-screen">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                            onClick={() => openLightbox(project)}
                        />
                    ))}
                </div>
            </div>

            <ImageLightbox
                {...lightboxState}
                onClose={closeLightbox}
            />
        </MainLayout>
    );
};

export default Home;
