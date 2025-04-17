<template>
  <div class="bg-[#DFDFDF] dark:bg-[#202020] text-white rounded-2xl max-w-xl min-w-xs overflow-hidden flex flex-col">
    <div class="p-5 mb-2 flex flex-col items-left justify-center text-left flex-grow">
      <p class="text-black text-3xl font-bold dark:text-white pb-2">{{ dynamicText1 }}</p>
      <p class="text-black text-xl font-normal dark:text-white mt-2">
        {{ dynamicText2 }}
      </p>
    </div>
    <!-- <div class="aspect-ratio">
      <img class="w-full h-full object-cover" src="/placeholder1.png" alt="Название модели">
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    dynamicText1: { type: String, required: true },
    dynamicText2: { type: String, required: true }
  }
}
</script>