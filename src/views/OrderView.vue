<template>
    <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
        <div class="text-5xl mb-6 pt-16">
            <span class="text-neutral-500">Оформление </span>
            <span class="font-semibold">Сборка#8840</span>
        </div>
        <div class="grid grid-cols-2 xl:grid-cols-5 xl:gap-12 items-start">
            <div class="flex flex-col col-span-3 order-1">
                <div class="mb-2">
                    <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="name">
                        Фамилия Имя Отчество
                    </label>
                    <input
                        class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                        id="name" type="text">
                </div>
                <div class="mb-2">
                    <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="phone">
                        Телефон
                    </label>
                    <input
                        class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                        id="phone" type="tel" placeholder="8 (800) 555 35-35">
                </div>
                <div class="mb-2">
                    <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="email">
                        e-mail
                    </label>
                    <input
                        class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="pc@config.com">
                </div>
                <div class="mb-2">
                    <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="address">
                        Адрес доставки
                    </label>
                    <input
                        class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                        id="address" type="text" placeholder="">
                </div>
                <div class="mb-2">
                    <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="cardnum">
                        Номер карты
                    </label>
                    <input
                        class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                        id="cardnum" type="text" placeholder="0000 0000 0000 0000">
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div class="mb-2">
                        <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="carddate">
                            Срок действия
                        </label>
                        <input
                            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                            id="carddate" type="text" placeholder="">
                    </div>
                    <div class="mb-2">
                        <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="cardcode">
                            CVV/CVC
                        </label>
                        <input
                            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
                            id="cardcode" type="text" placeholder="">
                    </div>

                </div>
            </div>
            <div class="flex flex-col col-span-2 xl:col-start-4 order-2 xl:mt-0 mt-12">
                <div class="bg-none text-black dark:text-white text-lg mt-6 mb-8">
                    <img :src="imageSrc" class="object-cover w-auto h-auto">
                    <div class="flex flex-col flex-grow">
                        <h3 class="text-4xl mt-4 text-left font-semibold">Сборка #8840</h3>
                        <hr class="mb-2 mt-2 w-auto border-neutral-500">

                        <ul class="mb-2">
                            <template v-for="comp in selectedComponents" :key="comp.key">
                                <div v-if="selected[comp.key]?.value" class="text-sm">
                                    <div class="text-gray-600 dark:text-gray-400 text-lg mt-1 -mb-1">{{ comp.name }}</div>
                                    <div class="text-xl">{{ getSelectedItem(comp.key)?.shortName || getSelectedItem(comp.key)?.name || String(selected[comp.key].value) }}</div>
                                </div>
                            </template>
                            <div v-if="hasMore" class="relative flex py-5 items-center">
                                <div class="flex-grow border-t border-neutral-600"></div>
                                <button 
                                    @click="isExpanded = !isExpanded"
                                    class="flex-shrink-0 mx-4 text-neutral-500 text-lg hover:text-neutral-300 cursor-pointer"
                                >
                                    {{ isExpanded ? 'Свернуть' : 'Показать все' }}
                                </button>
                                <div class="flex-grow border-t border-neutral-600"></div>
                            </div>
                        </ul>
                        <p class="text-blue-500/80 font-medium text-3xl mt-1">
                            {{ totalPrice.toLocaleString('ru-RU') }} ₽
                        </p>
                        <p class="-mt-1 font-thin text-xl">
                            {{ Math.round(totalPrice/3).toLocaleString('ru-RU') }} ₽/мес
                        </p>
                        <div class="flex items-center gap-2 mt-2">
                            <a href="/order" class="flex-[2]">
                                <button class="w-full bg-blue-500/80 text-white font-semibold py-2 text-xl  cursor-pointer">
                                    Купить
                                </button>
                            </a>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useConfigStore } from '../stores/store.js'
import { imageSrc } from '../scripts/themeImage.js'
import { getTotalPrice, validateCompatibility } from '../scripts/useCompatibility.js'

const configStore = useConfigStore()
const selected = configStore.selected
const isExpanded = ref(false)

onMounted(async () => {
    if (Object.keys(configStore.allComponents).length === 0) {
        await configStore.loadComponents()
    }
})

const selectedComponents = computed(() => {
    const filtered = configStore.components.filter(comp => comp && selected[comp.key]?.value)
    return isExpanded.value ? filtered : filtered.slice(0, 3)
})

const hasMore = computed(() => {
  return configStore.components.filter(comp => comp && selected[comp.key]?.value).length > 3
})

function getSelectedItem(key) {
    const id = selected?.[key]?.value
    if (!id) return null
    const list = configStore.allComponents?.[key] ?? []
    return list.find(i => String(i.id) === String(id)) || null
}

const totalPrice = computed(() => getTotalPrice(selected, configStore.allComponents))
const compatibility = computed(() => validateCompatibility(selected, configStore.allComponents))
</script>