<script setup lang="ts">
import categoriesData from "../data/categories.json";

interface Category {
  name: string;
  visible: boolean;
}

defineProps<{
  activeCategory: string;
}>();

const emit = defineEmits<{
  (e: 'categoryChange', category: string): void;
}>();

const categories = (categoriesData as Category[]).filter((cat) => cat.visible);
</script>

<template>
  <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100/50 py-4 overflow-x-auto no-scrollbar">
    <div class="flex px-4 space-x-3 min-w-max">
      <button
        v-for="cat in categories"
        :key="cat.name"
        @click="emit('categoryChange', cat.name)"
        class="px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 transform active:scale-95 whitespace-nowrap tracking-wide"
        :class="activeCategory === cat.name ? 'bg-black text-white shadow-lg shadow-black/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
