<template>
    <div class="flex items-center gap-2 mb-2">
      <component :is="icon" class="w-7 h-7 dark:text-white mb-2" v-if="icon" />
      <h2 class="text-3xl font-semibold mb-2">{{ title }}</h2>
    </div>
    <div class="bg-neutral-200 text-lg dark:bg-neutral-800 dark:text-white rounded-2xl p-6 mb-8">
      <div>
        <div class="flex gap-2 mx-2" v-if="filterOptions.length">
          <button
            v-for="(opt, index) in filterOptions"
            :key="opt"
            @click="selectedFilter = opt"
            class="relative"
          >
            <span :class="[
              'text-lg px-1 py-2 cursor-pointer',
              selectedFilter === opt ? 'text-black dark:text-white border-neutral-400 font-semibold' : 'text-neutral-400',
              index === 0 ? 'border-r border-neutral-400 pr-4 mr-2' : ''
            ]">
              {{ opt }}
            </span>
          </button>
        </div>
        <hr class="bg-neutral-400 border-none mt-[6px] h-[1px] w-full">
      </div>
      <div class="flex flex-col 2xl:flex-row gap-4 justify-between items-start mt-2 h-full">
        <div :class="[
          'rounded-xl p-2 mb-4 mt-2 w-full 2xl:w-56 flex justify-center items-center min-h-[140px] h-full',
          selectedImage !== '/component.png' ? 'bg-white' : 'bg-[#35373c]'
        ]">
          <img :src="selectedImage" class="h-50 w-auto" :alt="title" />
        </div>
        <ul class="flex-1 w-full h-full">
          <li
            v-for="item in filteredItems"
            :key="item.id"
            class="flex items-center py-3 border-b border-neutral-400 last:border-none"
          >
            <input
              type="radio"
              :name="title"
              :id="`opt-${componentKey}-${item.id}`"
              :value="item.id"
              v-model="localSelected"
              class="accent-blue-400 mr-4 cursor-pointer"
            />
            <label :for="`opt-${componentKey}-${item.id}`" class="flex-1 flex items-center cursor-pointer">
              <!-- <span
                class="w-3 h-3 rounded-full mr-2"
                :class="'ыые' ? 'bg-green-400' : 'bg-red-400'"
              ></span> -->
              <span
                class="w-3 h-3 rounded-full mr-2 bg-green-400">
              </span>
              <span class="flex-1">
                {{ item.shortName || item.name }}
                <span v-if="item.details" class="text-gray-400 text-sm">[{{ item.details }}]</span>
              </span>
            </label>
            <span class="ml-auto text-md font-medium">{{ formatPrice(item.price) }} ₽</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue'
  import { componentSrc } from '../scripts/themeImage'

  const props = defineProps({
    title: String,
    icon: [Object, Function],
    items: Array,
    selected: Object,
    componentKey: String
  })
  
  const emit = defineEmits(['update:selected'])
  
  // всегда "Все", плюс уникальные type если есть
  const filterOptions = computed(() => {
    const types = props.items.map(i => i.type).filter(Boolean)
    const unique = Array.from(new Set(types))
    // если нет type, будет только "Все"
    return ['Все', ...unique]
  })
  
  const selectedFilter = ref('Все')
  
  // фильтрация по выбранному табу 
  const filteredItems = computed(() => {
    if (selectedFilter.value === 'Все') return props.items
    return props.items.filter(i => i.type === selectedFilter.value)
  })
  
  // v-model для radio 
  const localSelected = computed({
    get: () => props.selected?.value || null,
    set: (id) => {
      emit('update:selected', id)
    }
  })
  
  function formatPrice(val) {
    return val?.toLocaleString('ru-RU') ?? ''
  }

  const selectedImage = computed(() => {
    const selectedId = props.selected?.value;
    if (!selectedId) return componentSrc.value;
    
    const selected = props.items.find(i => i.id === selectedId);
    return selected?.image || componentSrc.value;
  })
  </script>
