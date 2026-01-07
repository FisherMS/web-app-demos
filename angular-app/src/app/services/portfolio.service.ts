import { Injectable, signal, computed } from '@angular/core';
import portfolioData from '../data/portfolio.json';
import categoriesData from '../data/categories.json';

export interface Project {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    images?: string[];
    description: string;
    visible: boolean;
}

export interface Category {
    id: number;
    name: string;
    visible: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private allProjects = signal<Project[]>(portfolioData as Project[]);
    private allCategories = signal<Category[]>(categoriesData as Category[]);

    selectedCategory = signal<string>('最新项目');

    categories = computed(() => this.allCategories().filter(c => c.visible));

    projects = computed(() => {
        const category = this.selectedCategory();
        const visibleProjects = this.allProjects().filter(p => p.visible !== false);

        if (category === '最新项目') {
            return visibleProjects;
        }
        return visibleProjects.filter(p => p.category === category);
    });

    // Lightbox State
    lightboxOpen = signal<boolean>(false);
    currentProject = signal<Project | null>(null);

    openLightbox(project: Project) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        this.currentProject.set(project);
        this.lightboxOpen.set(true);
        document.body.style.overflow = 'hidden';
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
    }

    closeLightbox() {
        this.lightboxOpen.set(false);
        this.currentProject.set(null);
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    setCategory(category: string) {
        this.selectedCategory.set(category);
    }
}
