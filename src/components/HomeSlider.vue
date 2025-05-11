<template>
    <div class="mx-auto max-w-[1300px]">
        <div class="relative group w-full">
            <div ref="slider"
                class="flex overflow-x-hidden gap-[8px] scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                @mouseenter="pauseAutoScroll" @mouseleave="resumeAutoScroll">
                <div v-for="(partner, index) in duplicatedPartners" :key="`${index}-${partner.id}`"
                    class="flex-shrink-0 w-[221px]">
                    <div
                        class="bg-[#DFDFDF] dark:bg-[#202020] rounded-lg h-36 flex items-center justify-center transition-all hover:scale-102">
                        <img :src="partner.logo" :alt="partner.name"
                            class="rounded-md max-h-30 max-w-full object-contain">
                    </div>
                </div>
            </div>
            <button @click="slide(-1)"
                class="absolute cursor-pointer left-[-6px] top-1/2 -translate-y-1/2 -ml-14 bg-none dark:bg-none rounded-full p-3 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button @click="slide(+1)"
                class="absolute cursor-pointer right-[-6px] top-1/2 -translate-y-1/2 -mr-14 bg-none dark:bg-none rounded-full p-3 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
const partners = [
    { id: 1, name: 'СИТИЛИНК', logo: '/image.png' },
    { id: 2, name: 'М.Видео', logo: '/image.png' },
    { id: 3, name: 'OZON', logo: '/image.png' },
    { id: 4, name: 'DNS', logo: '/image.png' },
    { id: 5, name: 'Google', logo: '/image.png' }
];
const slider = ref(null);
let scrollInterval = null;
let isScrolling = false;
const duplicatedPartners = [...partners, ...partners, ...partners];
const slide = (direction) => {
    if (isScrolling) return;
    isScrolling = true;
    const scrollAmount = 229 * direction;
    const newScrollLeft = slider.value.scrollLeft + scrollAmount;
    if (newScrollLeft >= slider.value.scrollWidth / 3 * 2) {
        slider.value.scrollLeft = slider.value.scrollWidth / 3 - 1300 + scrollAmount;
    } else if (newScrollLeft <= 0) {
        slider.value.scrollLeft = slider.value.scrollWidth / 3 + scrollAmount;
    } else {
        slider.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setTimeout(() => { isScrolling = false; }, 500);
};

const startAutoScroll = () => {
    scrollInterval = setInterval(() => slide(1), 10000);
};

const pauseAutoScroll = () => clearInterval(scrollInterval);
const resumeAutoScroll = () => startAutoScroll();

onMounted(() => {
    startAutoScroll();
    setTimeout(() => { slider.value.scrollLeft = slider.value.scrollWidth / 3; }, 100);
});

onBeforeUnmount(() => clearInterval(scrollInterval));
</script>