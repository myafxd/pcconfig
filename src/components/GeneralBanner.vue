<template>
    <div class="relative bg-gray-800 text-white h-[700px] my-20 flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-neutral-300 dark:bg-neutral-800 bg-opacity-50 z-0"></div>
  <img src="/image.png" alt="Banner"
    class="absolute inset-0 w-full h-full object-contain z-0 aspect-video" />
  <div class="relative z-20 text-left max-w-7xl text-center px-0">
    <h1 class="text-4xl md:text-5xl font-bold mb-2">
      Ваше воображение, <span class="text-white">наше воплощение</span>
    </h1>
    <p class="text-sm md:text-xl text-gray-200 mb-6">
      Инновационный подход к конфигурации компьютера<br />
      Гарантируем совместимость
    </p>
    <div class="flex justify-left font-semibold gap-2 text-lg">
      <router-link to="/config" class="bg-[#4173F0] hover:bg-blue-700 text-white px-5 py-2 rounded-md">
        Конфигуратор
      </router-link>
      <router-link to="/ready" class="bg-white text-gray-800 hover:bg-gray-100 px-5 py-2 rounded-md">
        Готовые варианты
      </router-link>
    </div>
  </div>
</div>
</template>