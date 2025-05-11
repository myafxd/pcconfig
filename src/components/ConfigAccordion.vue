<template>
    <div class="p-4 min-w-36 mx-auto">
      <div v-for="(tab, i) in tabs" :key="tab.title" class="mb-6 last:mb-0">
        <h2 @click="toggle(i)"
            class="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 cursor-pointer select-none">
          <svg :class="[
              'w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform shrink-0',
              openIndex === i ? 'rotate-90' : 'rotate-0'
          ]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span class="ml-2">{{ tab.title }}</span>
        </h2>
        <transition name="fade">
          <ul v-show="openIndex === i" class="relative pl-6 space-y-2 dark:text-white">
            <div class="absolute left-2 top-0 bottom-0 border-l-2 border-dashed border-gray-400 dark:border-gray-600"></div>
            <li v-for="(line, idx) in tab.content" :key="idx" class="relative pl-2">
              <span
                class="absolute top-1/2 -left-2 w-3 border-t-2 border-dashed border-gray-400 dark:border-gray-600"></span>
              <a :href="'#' + slugify(line.label)"
                 class="flex text-neutral-400 items-center gap-2 transition-colors"
                 :class="{
                   'text-zinc-950 dark:text-white': activeSlug === slugify(line.label),
                   'hover:text-blue-400': activeSlug !== slugify(line.label)
                 }">
                <component :is="line.icon" class="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                <span>{{ line.label }}</span>
              </a>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import slugify from '../scripts/slugify.js'
  
  const props = defineProps({
    components: {
      type: Array,
      required: true
    }
  })
  
  const tabs = computed(() => [
    {
      title: 'Комплектующие',
      content: props.components.map(comp => ({
        label: comp.name,
        icon: comp.icon
      }))
    }
  ])
  
  const openIndex = ref(0)
  function toggle(i) {
    openIndex.value = openIndex.value === i ? -1 : i
  }
  
  const activeSlug = ref('')
  
  const allSlugs = computed(() =>
    tabs.value.flatMap(tab => tab.content.map(item => slugify(item.label)))
  )
  
  let observer = null
  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            activeSlug.value = e.target.id
            break
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px' }
    )
  
    allSlugs.value.forEach(slug => {
      const el = document.getElementById(slug)
      if (el) observer.observe(el)
    })
  })
  onUnmounted(() => observer && observer.disconnect())
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
      transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
      opacity: 0;
  }
  </style>
  