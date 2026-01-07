<script setup lang="ts">
import { ref, computed } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import ProjectCard from '../components/ProjectCard.vue';
import ImageLightbox from '../components/ImageLightbox.vue';
import portfolioData from '../data/portfolio.json';

const activeCategory = ref("最新项目");
const lightboxState = ref({
  isOpen: false,
  gallery: [] as string[],
  initialIndex: 0,
  title: "",
  description: "",
});

const projects = portfolioData.filter((project) => project.visible !== false);

const filteredProjects = computed(() => {
  if (activeCategory.value === "最新项目") return projects;
  return projects.filter(p => p.category === activeCategory.value);
});

const openLightbox = (project: any) => {
  const gallery = project.images && project.images.length > 0 ? project.images : [project.imageUrl];
  lightboxState.value = {
    isOpen: true,
    gallery,
    initialIndex: 0,
    title: project.title,
    description: project.description,
  };
};

const closeLightbox = () => {
  lightboxState.value.isOpen = false;
};
</script>

<template>
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
      :activeCategory="activeCategory" 
      @categoryChange="(cat) => activeCategory = cat" 
    />

    <div className="p-4 pb-24 min-h-screen">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <ProjectCard 
          v-for="project in filteredProjects"
          :key="project.id" 
          v-bind="project"
          @click="openLightbox(project)"
        />
      </div>
    </div>

    <ImageLightbox 
      v-bind="lightboxState"
      @close="closeLightbox"
    />
  </MainLayout>
</template>
