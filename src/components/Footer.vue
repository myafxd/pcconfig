<template>
    <div class="bg-[#DEDEDE] dark:bg-[#191919] text-white py-12 mt-48">
        <div class="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-around items-start gap-10">
            <div class="flex flex-col ">
                <a href="http://goo.gl/eEeXsY" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/image_2025-03-31_23-07-25.png" alt="Config" class="w-10">
                    <span
                        class="self-center text-2xl font-semibold whitespace-nowrap  text-black dark:text-white">PC.config</span>
                </a>
                <div class="text-md text-[#9CA3AF]">Конфигурация компьютеров</div>
                <div class="text-sm text-[#9CA3AF] mt-4">© 2025 PC.config</div>
                <a href="#" class="text-md text-[#3C7CFF] hover:underline">Политика конфиденциальности</a>
            </div>
            <div class=" text-black dark:text-white grid grid-cols-2 sm:grid-cols-2 gap-8 text-md">
                <div class="flex flex-col gap-2">
                    <router-link to="/" class="hover:underline">Главная</router-link>
                    <router-link to="/config" class="hover:underline">Конфигуратор</router-link>
                    <router-link to="/ready" class="hover:underline">Готовые сборки</router-link>
                    <router-link to="/cart" class="hover:underline">Корзина</router-link>
                </div>
                <div class="flex flex-col gap-2">
                    <router-link to="" class="hover:underline">О нас</router-link>
                    <router-link to="" class="hover:underline">Галерея</router-link>
                    <router-link to="/service" class="hover:underline">Услуги</router-link>
                    <a href="#contacts" class="hover:underline">Контакты</a>
                </div>
            </div>
            <div :class="[
                'flex flex-col gap-3 text-md transition-all duration-500 ease-out',
                isHighlighted ? 'bg-blue-500/50 shadow-[0_0_0_12px_rgba(59,130,246,0.5)]' : ''
            ]" id="contacts">
                <div class="flex items-center text-black dark:text-white gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="24" width="24"
                        viewBox="0 0 24 24">
                        <path d="M2 21 23 12 2 3v7l15 2-15 2Z" />
                    </svg>
                    <span>pc_config</span>
                </div>
                <div class="flex items-center text-black dark:text-white gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"
                        class="fill-current">
                        <path
                            d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.58.57 1 1 0 011 1v3.61a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.05l-2.31 2.16Z" />
                    </svg>
                    <span>8 800-555-35-35</span>
                </div>
                <div class="flex items-center text-black dark:text-white gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="24" width="24"
                        viewBox="0 0 24 24">
                        <path
                            d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.58.57 1 1 0 011 1v3.61a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.05l-2.31 2.16Z" />
                    </svg>
                    <span>8 808-808-80-80</span>
                </div>
                <div class="flex items-center text-black dark:text-white gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="24" width="24"
                        viewBox="0 0 24 24">
                        <path
                            d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z" />
                    </svg>
                    <span>pc_config@mail.ru</span>
                </div>
            </div>
            <button v-show="isVisible" @click="scrollToTop" id="topBtn"
                class="w-[48px] h-[56px] bg-[#3C7CFF] flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" viewBox="0 0 24 24"
                    class="stroke-current text-[#DEDEDE] dark:text-black" stroke-width="3">
                    <path d="M12 39V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            isVisible: false,
            isHighlighted: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.toggleVisibility);
        this.handleHighlight(); // на случай перехода сразу с якорем
        window.addEventListener("hashchange", this.handleHighlight);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.toggleVisibility);
        window.removeEventListener("hashchange", this.handleHighlight);
    },
    methods: {
        toggleVisibility() {
            this.isVisible = window.scrollY > 300;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        handleHighlight() {
            if (window.location.hash === '#contacts') {
                this.isHighlighted = true;
                setTimeout(() => {
                    this.isHighlighted = false;
                }, 1500);
            }
        },
    },
};
</script>
