<script setup lang="ts">
import { onMounted, watch } from 'vue';
import BottomMenu from '../components/BottomMenu.vue';
import profileData from '../data/profile.json';
import '../styles/global.css';

const props = defineProps<{
  title: string;
}>();

const siteName = profileData.name || "设计作品集";

const updateTitle = () => {
  document.title = `${props.title} | ${siteName}`;
};

onMounted(updateTitle);
watch(() => props.title, updateTitle);
</script>

<template>
  <div class="bg-gray-50 text-gray-900 font-sans antialiased pb-20 min-h-screen">
    <main>
      <slot />
    </main>
    <BottomMenu />
  </div>
</template>
