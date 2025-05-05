<template>
    <nav class="bg-transparent mt-8 p-4">
        <div class="max-w-screen-xl flex items-center justify-around mx-auto">
            <a href="https://rutube.ru/video/ac1caf5cbb710e9e7d9b7812762c9def/?r=wd" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/image_2025-03-31_23-07-25.png" alt="Config" class="w-12">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PC.config</span>
            </a>
            <ul class="hidden md:flex space-x-8 text-white text-xl">
                <li><router-link to="/" class="text-black dark:text-white hover:text-gray-400">Главная</router-link></li>
                <li><router-link to="/config" class="text-black dark:text-white hover:text-gray-400">Конфигуратор</router-link></li>
                <li><router-link to="/ready" class="text-black dark:text-white hover:text-gray-400">Готовые сборки</router-link></li>
                <li><router-link to="/service" class="text-black dark:text-white hover:text-gray-400">Услуги</router-link></li>
            </ul>
            <div class="flex items-center space-x-4 text-white">
                <router-link to="" class="text-black dark:text-white hover:text-gray-400 cursor-pointer">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-4.35-4.35m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z">
                        </path>
                    </svg>
                </router-link>
                <router-link to="/order" class="text-black dark:text-white hover:text-gray-400 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </router-link>
            </div>
        </div>
    </nav>
</template>