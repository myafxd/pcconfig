<template>
    <div class="bg-[#DFDFDF] dark:bg-[#202020] text-black dark:text-white text-lg mt-6 rounded-2xl mb-8">
        <img src="/placeholder1.png" class="object-cover w-full h-auto rounded-t-2xl">
        <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-4xl text-left font-semibold">Сборка #8840</h3>
            <hr class="mb-4 mt-1 w-auto border-neutral-700">
            <p class="text-blue-500/80 font-medium text-3xl mt-1">
                {{ totalPrice }}₽
            </p>
            <p class="-mt-1 font-thin text-xl">
                {{ monthlyPayment }}₽/мес
            </p>
            <div class="flex items-center gap-2 mt-2">
                <a href="/order" class="flex-[2]">
                    <button class="w-full bg-blue-500/80 text-white font-semibold py-2 rounded-lg text-xl">
                        Купить
                    </button>
                </a>
                <button type="button"
                    class="flex-[1] flex items-center justify-center h-10 bg-neutral-400 dark:bg-neutral-700 rounded-lg cursor-pointer"
                    aria-label="Сохранить">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                    </svg>
                </button>
                <button type="button"
                    class="flex-[1] flex items-center justify-center h-10 bg-neutral-400 dark:bg-neutral-700 rounded-lg cursor-pointer"
                    aria-label="Очистить" @click="$emit('clear')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>


            <hr class="mt-2 w-auto border-neutral-700">

            <div class="mt-2">
                <p class="text-center text-2xl mb-2">Конфигурация</p>
                <div v-if="selected" class="flex flex-col gap-2">
                    <template v-for="comp in components" :key="comp.key">
                        <div v-if="selected[comp.key]?.value" class="text-sm">
                            <div class="text-gray-600 dark:text-gray-400 text-lg">{{ comp.name }}</div>
                            <div class="-mt-2 text-xl">{{ selected[comp.key].value.name }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    selected: {
        type: Object,
        default: () => ({
            gpu: { value: null },
            cpu: { value: null },
            mobo: { value: null },
            ram: { value: null },
            psu: { value: null }
        })
    },
    components: {
        type: Array,
        default: () => []
    }
})

const totalPrice = computed(() => {
    if (!props.selected) return '0'

    let total = 0
    const componentKeys = ['gpu', 'cpu', 'mobo', 'ram', 'psu']

    total = componentKeys.reduce((sum, key) => {
        const component = props.selected[key]?.value
        return sum + (component?.price || 0)
    }, 0)

    return total > 0 ? total.toLocaleString('ru-RU') : '0.00'
})

const monthlyPayment = computed(() => {
    if (!props.selected) return '50 000'

    const total = parseInt(totalPrice.value.replace(/\s/g, ''), 10) || 0
    const monthly = Math.round(total / 3)

    return monthly.toLocaleString('ru-RU')
})
</script>