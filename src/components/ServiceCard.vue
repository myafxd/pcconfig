<template>
  <div
    class="service-card h-full bg-[#DFDFDF] dark:bg-[#202020] text-white rounded-2xl max-w-xl min-w-xs overflow-hidden flex flex-col">
    <div class="p-5 flex flex-col items-left justify-center text-left flex-grow">
      <p class="service-name text-black text-3xl font-bold dark:text-white pb-1">{{ name }}</p>
      <p class="service-description text-neutral-600 text-xl font-normal dark:text-neutral-400 mt-1 line-clamp-3 overflow-hidden">
        {{ description }}
      </p>
      <div class="flex items-center justify-end gap-2 mt-4">
        <p class="service-price font-semibold text-[28px] text-right text-black dark:text-white">{{ price }}₽</p>
        <button class="h-10 w-12 bg-[#D3D3D3] dark:bg-[#2C2C2C] rounded-md font-semibold text-[42px] 
         flex items-center justify-center cursor-pointer pb-[10px] text-black dark:text-white">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  description: String,
  id: Number,
  price: Number
})
</script>