<template>
  <div class="bg-[#DFDFDF] dark:bg-[#202020] text-white rounded-2xl max-w-xl min-w-xs overflow-hidden flex flex-col">
    <div class="px-6 pt-4 pb-6 flex flex-col items-left justify-center text-left flex-grow">
      <div class="flex justify-between">
        <p class="text-black text-3xl font-bold dark:text-white pb-2">{{ dynamicText1 }}</p><span
          class="text-neutral-500 text-4xl font-bold">{{ dynamicText3 }}</span>
      </div>
      <p class="text-black text-xl font-normal dark:text-white mt-2">
        {{ dynamicText2 }}
      </p>
    </div>
    <div class="aspect-ratio">
      <img class="w-full h-full object-cover" :src="imageSrc" alt="Название модели">
    </div>
  </div>
</template>

<script setup>
import { imageSrc } from '../scripts/themeImage.js'
const props = defineProps({
  dynamicText1: { type: String, required: true },
  dynamicText2: { type: String, required: true },
  dynamicText3: { type: String, required: true }
})
</script>