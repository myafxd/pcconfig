<template>
  <div class="flex items-center gap-2 mb-2">
    <component :is="icon" v-if="icon" class="w-7 h-7 dark:text-white mb-2" />
    <h2 class="text-3xl font-semibold mb-2">{{ title }}</h2>
  </div>

  <div class="text-lg dark:text-white rounded-2xl mb-8">
    <div v-if="filterOptions.length > 1" class="relative flex bg-gray-200 dark:bg-[#35383b] rounded-full w-fit mb-4">
      <div 
        class="absolute top-0 bottom-0 left-0 transition-all duration-300 ease-out bg-neutral-300 dark:bg-[#535353] rounded-full"
        :style="pillStyle" 
      />
      <button 
        v-for="(opt, index) in filterOptions" 
        :key="opt" 
        :ref="el => { if (el) itemRefs[index] = el }"
        @click="selectedFilter = opt"
        class="relative z-10 px-5 py-1 text-xl transition-colors duration-300 cursor-pointer"
        :class="selectedFilter === opt ? 'text-black dark:text-white' : 'text-neutral-400'"
      >
        {{ opt }}
      </button>
    </div>

    <div class="grid grid-cols-1 2xl:grid-cols-[auto_1fr] gap-4 items-start mt-3">
      
        <div 
        class="rounded-2xl p-4 w-full 2xl:w-[280px] h-[216px] flex justify-center items-center transition-colors overflow-hidden flex-shrink-0"
        :class="selectedItem ? 'bg-white' : 'bg-[#35373c]'"
        >
        <img 
            :src="selectedImage" 
            class="w-full h-full object-contain" 
            :alt="title" 
        />
        </div>

      <ul class="space-y-2">
        <li 
          v-for="item in filteredItems" 
          :key="item.id" 
          @click="onItemSelect(item.id)"
          class="relative flex items-center p-4 rounded-2xl cursor-pointer transition-all bg-neutral-100 dark:bg-neutral-800 border border-transparent overflow-hidden"
          :class="{ 'bg-white dark:bg-neutral-700 shadow-sm': localSelected === item.id }"
        >
          <div 
            class="absolute left-0 top-0 bottom-0 w-8 transition-all duration-200"
            :class="localSelected === item.id ? 'bg-blue-500' : 'bg-transparent'" 
          />

          <div class="flex-1 flex items-center ml-8 mr-4">
            <span class="flex-1 text-lg">
              {{ item.shortName || item.name }}
              <span v-if="item.details" class="text-gray-400 text-sm ml-1">[{{ item.details }}]</span>
            </span>
          </div>

          <span class="ml-auto text-xl font-semibold">{{ formatPrice(item.price) }} ₽</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { componentSrc } from '../scripts/themeImage'

const props = defineProps({
  title: String,
  icon: [Object, Function],
  items: { type: Array, default: () => [] },
  selected: Object,
  componentKey: String
})

const emit = defineEmits(['update:selected'])

// --- ФИЛЬТРАЦИЯ ---
const selectedFilter = ref('Все')
const filterOptions = computed(() => ['Все', ...new Set(props.items.map(i => i.type).filter(Boolean))])

const filteredItems = computed(() => 
  selectedFilter.value === 'Все' ? props.items : props.items.filter(i => i.type === selectedFilter.value)
)

// --- ЛОГИКА ВЫБОРА ---
const localSelected = computed(() => props.selected?.value ?? null)

const onItemSelect = (id) => {
  emit('update:selected', id)
}

const selectedItem = computed(() => 
  props.items.find(i => String(i.id) === String(localSelected.value))
)

const selectedImage = computed(() => selectedItem.value?.image || componentSrc.value)

// --- ВИЗУАЛ (PILL) ---
const itemRefs = ref([])
const pillStyle = ref({ width: '0px', transform: 'translateX(0px)', transition: 'none' })

const updatePill = async (isImmediate = false) => {
  await nextTick()
  const el = itemRefs.value[filterOptions.value.indexOf(selectedFilter.value)]
  if (el) {
    pillStyle.value = {
      width: `${el.offsetWidth}px`,
      transform: `translateX(${el.offsetLeft}px)`,
      transition: isImmediate ? 'none' : 'all 0.3s ease-out'
    }
  }
}

watch(selectedFilter, () => updatePill(false))
onMounted(() => {
  updatePill(true)
  // Небольшая задержка для корректного просчета после рендеринга шрифтов
  setTimeout(() => updatePill(true), 60)
})

const formatPrice = (val) => val?.toLocaleString('ru-RU') ?? ''
</script>