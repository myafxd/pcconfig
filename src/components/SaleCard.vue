<script setup>
import { placeholderSrc } from '../scripts/themeImage.js'
</script>

<template>
  <div class="bg-[#DFDFDF] dark:bg-[#202020] text-white rounded-2xl max-w-xl min-w-[300px] overflow-hidden flex flex-col">
    <div class="aspect-ratio">
      <img class="w-full h-full object-cover" :src="placeholderSrc" alt="Название модели">
    </div>
    <div class="p-4 flex flex-col items-center justify-center text-center flex-grow">
      <h3 class="text-black text-4xl font-semibold dark:text-white">Название модели</h3>
      <p class="text-neutral-400 mt-1 text-lg">
        Универсальный выбор, сочетающий высокую производительность и доступность.
      </p>
      <p class="text-black dark:text-white mt-2 font-semibold text-3xl">
        от 150 000 ₽
      </p>
      <router-link to="/config">
        <button
          class="cursor-pointer mt-2 outline-[1.5px] outline-blue-400 text-blue-400 font-semibold py-2 px-4 rounded-lg">
          Конфигурировать и купить
        </button>
      </router-link>
      <div class="mt-4">
        <p class="text-xs pt-2 lg:text-base text-neutral-400">Процессор</p>
        <p class="text-black dark:text-white text-xl">Intel Pentium</p>
        <p class="text-xs pt-2 lg:text-base text-neutral-400">Видеокарта</p>
        <p class="text-black dark:text-white text-xl">3050</p>
        <p class="text-xs pt-2 lg:text-base text-neutral-400">Оперативная память</p>
        <p class="text-black dark:text-white text-xl">16 ГБ</p>
        <p class="text-xs pt-2 lg:text-base text-neutral-400">Постоянная память</p>
        <p class="text-black dark:text-white text-xl">1 ТБ</p>
        <p class="text-xs pt-2 lg:text-base text-neutral-400">Охлаждение</p>
        <p class="text-black dark:text-white text-xl">СВО</p>
      </div>
    </div>
  </div>
</template>