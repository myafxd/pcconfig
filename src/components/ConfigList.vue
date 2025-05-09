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
      <ul>
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
            <span
              class="w-3 h-3 rounded-full mr-2"
              :class="item.compatible ? 'bg-green-400' : 'bg-gray-600'"
            ></span>
            <span class="flex-1">
              {{ item.name }}
              <span v-if="item.details" class="text-gray-400 text-sm">[{{ item.details }}]</span>
            </span>
          </label>
          <span class="ml-auto text-md font-medium">{{ formatPrice(item.price) }} ₽</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    title: String,
    icon: [Object, Function],
    items: {
      type: Array,
      default: () => []
    },
    selected: Object,
    componentKey: String
  })

  console.log(`ConfigList ${props.componentKey} props:`, {
    title: props.title,
    items: props.items,
    componentKey: props.componentKey,
    selected: props.selected
  })
  
  const emit = defineEmits(['update:selected'])
  
  // Табы: всегда "Все", плюс уникальные type если есть
  const filterOptions = computed(() => {
    if (!props.items?.length) return ['Все']
    const types = props.items.map(i => i.type).filter(Boolean)
    const unique = Array.from(new Set(types))
    // если нет type, будет только "Все"
    return ['Все', ...unique]
  })
  
  const selectedFilter = ref('Все')
  
  // Фильтрация по выбранному табу (type)
  const filteredItems = computed(() => {
    if (!props.items?.length) return []
    if (selectedFilter.value === 'Все') return props.items
    return props.items.filter(i => i.type === selectedFilter.value)
  })
  
  // v-model для radio (по id)
  const localSelected = computed({
    get: () => props.selected?.value?.id ?? null,
    set: (id) => {
      const item = props.items?.find(i => i.id === id)
      emit('update:selected', { value: item })
    }
  })
  
  function formatPrice(val) {
    return val?.toLocaleString('ru-RU') ?? ''
  }
  </script>
