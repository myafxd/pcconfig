<template>
  <main class="pb-20">
    <div
      class="mx-auto max-w-[1700px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 px-4 sm:px-8 md:px-16 lg:px-20 mt-8 sm:mt-16 mb-16">
      <div class="sticky top-4 self-start hidden lg:block lg:col-span-2">
        <ConfigAccordion />
      </div>
      <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-3 w-full">
        <div v-for="component in components" :key="component.key" :id="slugify(component.name)">
        <ConfigList :title="component.name" :componentKey="component.key" :items="component.items"
          :selected="selected[component.key]" @update:selected="val => onSelect(component.key, val.value)" />
</div>

      </div>
      <div class="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-7">
        <div class="sticky top-4">
          <ConfigTotal :selected="selected" :components="components" @clear="clearBuild" />

        </div>
      </div>
    </div>
    <div v-if="lastError" class="fixed bottom-24 right-4 p-4 bg-red-500 text-white rounded shadow-lg z-50">
      {{ lastError }}
    </div>
  </main>
</template>


<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import ConfigAccordion from '../components/ConfigAccordion.vue';
import ConfigList from '../components/ConfigList.vue';
import ConfigTotal from '../components/ConfigTotal.vue';
import useCompatibility from '../composables/useCompatibility.js';
import slugify from '../composables/slugify.js'


const allComponents = {
  gpu: [
    { id: 1, chip: 'NVIDIA', name: 'GeForce RTX 4090', image: '', power: 450, price: 220000, compatible: true },
    { id: 2, chip: 'NVIDIA', name: 'GeForce RTX 4070 Ti', image: '', power: 285, price: 95000, compatible: true },
    { id: 3, chip: 'AMD', name: 'Radeon RX 7900 XTX', image: '', power: 355, price: 120000, compatible: true },
    { id: 4, chip: 'AMD', name: 'Radeon RX 7800 XT', image: '', power: 263, price: 65000, compatible: true },
    { id: 5, chip: 'Intel', name: 'Arc A770', image: '', power: 225, price: 35000, compatible: true },
    { id: 6, chip: 'NVIDIA', name: 'GeForce RTX 3060', image: '', power: 170, price: 35000, compatible: true },
    { id: 7, chip: 'AMD', name: 'Radeon RX 6600', image: '', power: 132, price: 20000, compatible: true }
  ],
  psu: [
    { id: 1, name: 'Corsair RM1000x', wattage: 1000, price: 18000, compatible: true },
    { id: 2, name: 'be quiet! Pure Power 12M 850W', wattage: 850, price: 14000, compatible: true },
    { id: 3, name: 'Chieftec Proton 650W', wattage: 650, price: 7000, compatible: true },
    { id: 4, name: 'Deepcool PK550D', wattage: 550, price: 5000, compatible: true },
    { id: 5, name: 'Thermaltake Smart 430W', wattage: 430, price: 3500, compatible: true }
  ],
  cpu: [
    { id: 1, socket: 'LGA1700', name: 'Intel Core i9-14900K', image: '', price: 65000, compatible: true },
    { id: 2, socket: 'LGA1700', name: 'Intel Core i7-14700K', image: '', price: 48000, compatible: true },
    { id: 3, socket: 'AM5', name: 'AMD Ryzen 9 7950X', image: '', price: 68000, compatible: true },
    { id: 4, socket: 'AM5', name: 'AMD Ryzen 7 7800X3D', image: '', price: 52000, compatible: true },
    { id: 5, socket: 'AM4', name: 'AMD Ryzen 5 5600X', image: '', price: 15000, compatible: true },
    { id: 6, socket: 'LGA1200', name: 'Intel Core i5-11400F', image: '', price: 12000, compatible: true }
  ],
  mobo: [
    { id: 1, socket: 'LGA1700', ramType: 'DDR5', name: 'ASUS ROG Strix Z790-E', image: '', price: 38000, compatible: true },
    { id: 2, socket: 'LGA1700', ramType: 'DDR4', name: 'MSI PRO Z690-A DDR4', image: '', price: 21000, compatible: true },
    { id: 3, socket: 'AM5', ramType: 'DDR5', name: 'Gigabyte X670E AORUS PRO X', image: '', price: 40000, compatible: true },
    { id: 4, socket: 'AM4', ramType: 'DDR4', name: 'ASUS TUF Gaming B550-PLUS', image: '', price: 17000, compatible: true },
    { id: 5, socket: 'LGA1200', ramType: 'DDR4', name: 'ASRock B560M-HDV', image: '', price: 9000, compatible: true }
  ],
  ram: [
    { id: 1, type: 'DDR5', name: 'Kingston Fury Beast 32GB (2x16GB) 6000MHz', image: '', price: 17000, compatible: true },
    { id: 2, type: 'DDR4', name: 'Corsair Vengeance LPX 16GB (2x8GB) 3200MHz', image: '', price: 6500, compatible: true },
    { id: 3, type: 'DDR5', name: 'G.Skill Trident Z5 64GB (2x32GB) 6400MHz', image: '', price: 35000, compatible: true },
    { id: 4, type: 'DDR4', name: 'Patriot Viper Steel 32GB (2x16GB) 3600MHz', image: '', price: 11000, compatible: true }
  ]
}



const components = reactive([
  { key: 'gpu', name: 'Видеокарта', items: allComponents.gpu },
  { key: 'psu', name: 'Блок питания', items: allComponents.psu },
  { key: 'cpu', name: 'Процессор', items: allComponents.cpu },
  { key: 'mobo', name: 'Материнская плата', items: allComponents.mobo },
  { key: 'ram', name: 'Оперативная память', items: allComponents.ram },
]);

const selected = reactive({
  gpu: { value: null },
  cpu: { value: null },
  mobo: { value: null },
  ram: { value: null },
  psu: { value: null }
});

const { checkAll, lastError } = useCompatibility(selected);

watch(
  () => [...Object.values(selected).map(s => s.value)],
  checkAll,
  { deep: true }
);

function clearBuild() {
  for (const key in selected) {
    selected[key].value = null;
  }
}

function onSelect(categoryKey, val) {
  selected[categoryKey].value = val;
}

onMounted(() => {
  document.body.style.overflowX = 'visible';
});
onUnmounted(() => {
  document.body.style.overflowX = 'hidden';
});
</script>
