<template>
    <div class="flex items-center gap-2 mb-2">
        <component :is="iconMap[title]" class="w-7 h-7 dark:text-white mb-2" v-if="iconMap[title]" />
        <h2 class="text-3xl font-semibold mb-2">{{ title }}</h2>
    </div>
    <div class="bg-neutral-200 text-lg dark:bg-neutral-800 dark:text-white rounded-2xl p-6 mb-8">
        <div>
            <div v-if="filterOptions.length" class="flex gap-2 mx-2">
                <button v-for="(opt, index) in filterOptions" :key="opt" @click="selectedFilter = opt" class="relative">
                    <span :class="[
                        'text-lg  px-1 py-2 cursor-pointer',
                        selectedFilter === opt ? 'text-black dark:text-white border-neutral-400' : 'text-neutral-400',
                        index === 0 ? 'border-r border-neutral-400 pr-4 mr-2' : ''
                    ]">
                        {{ opt }}
                    </span>
                </button>
            </div>
            <hr class="bg-neutral-400 border-none mt-[6px] h-[1px] w-full">
        </div>
        <ul>
            <li v-for="item in filteredItems" :key="item.id"
                class="flex items-center py-3 border-b border-neutral-400 last:border-none">
                <input 
                type="radio" 
                :name="title"
                :id="`opt-${componentKey}-${item.id}`"
                :value="item"
                v-model="localSelected"
                class="accent-blue-400 mr-4 cursor-pointer"
                 />  
                <label :for="`opt-${componentKey}-${item.id}`" class="flex-1 flex items-center cursor-pointer">
                    <span class="w-3 h-3 rounded-full mr-2"
                        :class="item.compatible ? 'bg-green-400' : 'bg-gray-600'"></span>
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
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import { Cpu, BoomBox, CircuitBoard, Plug, HardDrive, Fan, Thermometer, MemoryStick, Smartphone as Case } from 'lucide-vue-next'

const iconMap = {
    'Процессор': Cpu,
    'Видеокарта': BoomBox,
    'Материнская плата': CircuitBoard,
    'Оперативная память': MemoryStick,
    'Охлаждение': Fan,
    'Блок питания': Plug,
    'Накопители': HardDrive,
    'Термоинтерфейс': Thermometer,
    'Корпус': Case
}

const props = defineProps({
  title: String,
  items: Array,
  selected: Object,
  componentKey: String
});

const emit = defineEmits(['update:selected']);

// Опции для табов (например, чипы)
const filterOptions = computed(() => {
    const vals = props.items.map(i => i.chip).filter(Boolean);
    return ['Все', ...new Set(vals)];
});
const selectedFilter = ref('Все');

// Отфильтрованные элементы по выбранному табу
const filteredItems = computed(() => {
    if (selectedFilter.value === 'Все') return props.items;
    return props.items.filter(i => i.chip === selectedFilter.value);
});

// Используем computed для selectedId вместо ref
const localSelected = computed({
  get: () => props.selected?.value ?? null,
  set: (item) => {
    emit('update:selected', { value: item });
  }
});

// Форматирование цены
function formatPrice(val) {
    return val.toLocaleString('ru-RU');
}
</script>