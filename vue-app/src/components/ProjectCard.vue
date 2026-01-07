<script setup lang="ts">
defineProps<{
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div
    @click="emit('click')"
    class="project-item break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in border border-gray-100/50"
  >
    <img
      :src="imageUrl"
      :alt="title"
      class="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
      loading="lazy"
    />

    <!-- Overlay with Centered Title -->
    <div
      class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center p-6"
    >
      <div class="text-center">
        <h3
          class="text-white text-2xl font-black tracking-tight leading-tight transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
        >
          {{ title }}
        </h3>
        <span
          class="mt-2 inline-block text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          {{ category }}
        </span>
      </div>
    </div>
  </div>
</template>
