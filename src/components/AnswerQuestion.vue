<template>
  <div>
    <button @click="toggle()"
      class="w-full flex justify-between items-center py-4 text-left transition-colors duration-200 cursor-pointer">
      <span class="text-xl font-base text-black dark:text-white pr-4">{{ dynamicText1 }}</span>
      <svg class="w-6 h-5 transition-transform duration-200 text-black dark:text-white shrink-0"
        :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <transition enter-active-class="overflow-hidden grid transition-all duration-200 ease-out"
      leave-active-class="overflow-hidden grid transition-all duration-200 ease-in" enter-from-class="grid-rows-[0fr]"
      enter-to-class="grid-rows-[1fr]" leave-from-class="grid-rows-[1fr]" leave-to-class="grid-rows-[0fr]">
      <div v-show="isOpen" class="min-h-0 row-[span_1/span_1]">
        <div class="overflow-hidden">
          <p class="text-lg text-neutral-700 leading-6 dark:text-neutral-400 pb-5 transition-colors duration-200">
            {{ dynamicText2 }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  dynamicText1: { type: String, required: true },
  dynamicText2: { type: String, default: '' }
})
const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
</script>