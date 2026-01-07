<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  gallery: string[];
  initialIndex: number;
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentIndex = ref(props.initialIndex);
const isLoading = ref(true);

watch(() => props.isOpen, (val) => {
  if (val) {
    currentIndex.value = props.initialIndex;
    document.body.style.overflow = 'hidden';
    updateContent(props.initialIndex);
  } else {
    document.body.style.overflow = '';
  }
});

const updateContent = (index: number) => {
  if (!props.gallery[index]) return;
  isLoading.value = true;
  const tempImg = new Image();
  tempImg.onload = () => {
    isLoading.value = false;
  };
  tempImg.src = props.gallery[index];
  currentIndex.value = index;
};

const nextImage = () => {
  if (props.gallery.length <= 1) return;
  const newIndex = (currentIndex.value + 1) % props.gallery.length;
  updateContent(newIndex);
};

const prevImage = () => {
  if (props.gallery.length <= 1) return;
  const newIndex = (currentIndex.value - 1 + props.gallery.length) % props.gallery.length;
  updateContent(newIndex);
};

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;
  if (e.key === 'Escape') emit('close');
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});

// Swipe Logic
const touchStart = ref<number | null>(null);
const touchEnd = ref<number | null>(null);

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.targetTouches[0].clientX;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEnd.value = e.targetTouches[0].clientX;
};

const handleTouchEnd = () => {
  if (!touchStart.value || !touchEnd.value) return;
  const distance = touchStart.value - touchEnd.value;
  if (distance > 50) nextImage();
  else if (distance < -50) prevImage();
  touchStart.value = null;
  touchEnd.value = null;
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] transition-opacity duration-300"
    :class="isOpen ? 'opacity-100' : 'opacity-0 invisible'"
    aria-modal="true"
    role="dialog"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/95 backdrop-blur-md" @click="emit('close')"></div>

    <!-- Close Button -->
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Nav Buttons -->
    <template v-if="gallery.length > 1">
      <button
        @click.stop="prevImage"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        @click.stop="nextImage"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </template>

    <!-- Content Container -->
    <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
      <div class="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center pointer-events-auto">
        <!-- Image -->
        <img
          :src="gallery[currentIndex]"
          :alt="title"
          class="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl transition-all duration-300 transform"
          :class="isLoading ? 'scale-95 opacity-50' : 'scale-100 opacity-100'"
        />

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>

        <!-- Description Box -->
        <div class="mt-6 text-center max-w-2xl px-4">
          <h3 class="text-2xl font-bold text-white mb-2 tracking-tight">{{ title }}</h3>
          <p class="text-white/80 text-sm leading-relaxed font-light">{{ description }}</p>
          <div v-if="gallery.length > 1" class="text-white/40 text-xs mt-2">
            {{ currentIndex + 1 }} / {{ gallery.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
