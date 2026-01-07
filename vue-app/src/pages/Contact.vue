<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue';
import profileData from '../data/profile.json';
</script>

<template>
  <MainLayout title="联系我">
    <header class="pt-8 pb-3 px-6 bg-white shrink-0">
      <h1 class="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">
        联系我
      </h1>
      <p class="text-gray-400 text-xs font-bold uppercase tracking-widest opacity-80">
        {{ profileData.contactTitle }}
      </p>
    </header>

    <main class="p-4 pb-24 max-w-2xl mx-auto">
      <!-- Profile Card -->
      <div
        class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 text-center mb-10 overflow-hidden relative"
      >
        <div
          class="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none"
        >
        </div>
        <div class="relative z-10">
          <div
            class="w-24 h-24 bg-black rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-black/10"
          >
            <img
              v-if="profileData.avatarUrl"
              :src="profileData.avatarUrl"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <template v-else>Me</template>
          </div>
          <h2 class="text-2xl font-black text-gray-900 mb-2">
            {{ profileData.name }}
          </h2>
          <p
            class="text-gray-400 text-sm font-medium mb-8 max-w-xs mx-auto leading-relaxed"
          >
            {{ profileData.contactText }}
          </p>

          <a
            :href="`mailto:${profileData.email}`"
            class="inline-block bg-black text-white text-sm font-bold px-10 py-3.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10 active:scale-95"
          >
            发送邮件
          </a>
        </div>
      </div>

      <!-- Social Links -->
      <div class="space-y-3 px-2">
        <h3
          class="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4"
        >
          社交媒体
        </h3>
        <template v-for="social in profileData.socials" :key="social.name">
          <a
            v-if="social.visible !== false"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group shadow-sm"
          >
            <span class="font-bold text-gray-700 group-hover:text-black transition-colors">
              {{ social.name }}
            </span>
            <span class="text-gray-300 group-hover:text-gray-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              ↗
            </span>
          </a>
        </template>
      </div>
    </main>
  </MainLayout>
</template>
