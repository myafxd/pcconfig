<template>
  <div class="flex items-center gap-2 mb-2">
    <component :is="icon" class="w-7 h-7 dark:text-white mb-2" v-if="icon" />
    <h2 class="text-3xl font-semibold mb-2">{{ title }}</h2>
  </div>
  <div class="bg-neutral-200 text-lg dark:bg-neutral-800 dark:text-white rounded-2xl p-6 mb-8">
    <div>
      <div class="flex gap-2 mx-2" v-if="filterOptions.length">
        <button v-for="(opt, index) in filterOptions" :key="opt" @click="selectedFilter = opt" class="relative">
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
    <div class="flex flex-col  2xl:flex-row gap-4 justify-between items-start mt-2 h-full">
      <div :class="[
      'rounded-xl p-2 mb-4 mt-2 w-full 2xl:w-56 flex justify-center items-center min-h-[140px] h-full',
      selectedImage !== '/placeholder1.png' ? 'bg-white' : 'bg-[#363836]']">
        <img :src="selectedImage" class="h-50 w-auto" :alt="title" />
      </div>
      <ul class="flex-1 w-full h-full">
        <li v-for="item in filteredItems" :key="item.id"
          class="flex items-center py-3 border-b border-neutral-400 last:border-none">
          <input type="radio" :name="title" :id="`opt-${componentKey}-${item.id}`" :value="item.id"
            v-model="localSelected" class="accent-blue-400 mr-4 cursor-pointer" />
          <label :for="`opt-${componentKey}-${item.id}`" class="flex-1 flex items-center cursor-pointer">
            <!-- <span
              class="w-3 h-3 rounded-full mr-2"
              :class="item.compatible ? 'bg-green-400' : 'bg-gray-600'"
            ></span> -->
            <span class="w-3 h-3 rounded-full mr-2 bg-green-400"></span>
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

// console.log(`ConfigList ${props.componentKey} props:`, {
//   title: props.title,
//   items: props.items,
//   componentKey: props.componentKey,
//   selected: props.selected
// })

const emit = defineEmits(['update:selected'])

const filterOptions = computed(() => {
  if (!props.items?.length) return ['Все']
  const types = props.items.map(i => i.type).filter(Boolean)
  const unique = Array.from(new Set(types))
  return ['Все', ...unique]
})

const selectedFilter = ref('Все')

const filteredItems = computed(() => {
  if (!props.items?.length) return []
  if (selectedFilter.value === 'Все') return props.items
  return props.items.filter(i => i.type === selectedFilter.value)
})

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

const selectedImage = computed(() => {
  return props.selected?.value?.image || '/placeholder1.png'
})

</script>
