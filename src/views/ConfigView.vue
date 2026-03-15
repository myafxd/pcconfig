<template>
<<<<<<< HEAD
  <div class="relative pb-20">
    <div class="mx-auto max-w-[1700px] px-4 sm:px-6 md:px-8 xl:px-12 mt-8 sm:mt-16 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_350px] xl:grid-cols-[250px_1fr_350px]">
      <aside class="hidden xl:block sticky top-4 self-start">
        <ConfigAccordion :components="components" />
      </aside>
      <main>
        <div v-for="component in components" :key="component.key" :id="slugify(component.name)">
          <ConfigList
            :title="component.name"
            :componentKey="component.key"
            :items="component.items"
            :icon="component.icon"
            :selected="selected[component.key]"
            @update:selected="val => onSelect(component.key, val.value)"
          />
        </div>
      </main>
      <aside class="sticky top-4 self-start lg:col-span-1 xl:col-span-1">
        <ConfigTotal :selected="selected" :components="components" @clear="clearBuild" />
      </aside>
    </div>
    <div
      v-if="lastError"
      class="fixed bottom-24 right-4 p-4 bg-red-500 text-white rounded shadow-lg z-50"
    >
      {{ lastError }}
=======
  <main class="pb-20">
    <!-- Загрузка -->
    <div v-if="configStore.isLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <p class="text-lg font-semibold text-neutral-600 dark:text-neutral-300">Загрузка компонентов...</p>
      </div>
    </div>

    <!-- Основной контент -->
    <div v-else class="mx-auto max-w-[1700px] px-4 sm:px-6 md:px-8 xl:px-12 mt-8 sm:mt-16 
     grid grid-cols-1 gap-6 
     lg:grid-cols-[1fr_350px] 
     xl:grid-cols-[250px_1fr_350px]">
  
  <aside class="hidden xl:block sticky top-4 self-start">
    <ConfigAccordion :components="configStore.components" />
  </aside>

  <main class="w-full">
    <div v-for="component in configStore.components" :key="component.key" :id="slugify(component.name)">
      <ConfigList 
        :title="component.name" 
        :componentKey="component.key" 
        :items="component.items"
        :icon="component.icon" 
        :selected="selected[component.key]"
        @update:selected="val => onSelect(component.key, val)" 
      />
    </div>
  </main>

  <aside class="hidden lg:block sticky top-4 self-start">
    <ConfigTotal :selected="selected" :components="configStore.components" @clear="clearBuild" />
  </aside>
  
</div>

    <!-- Ошибка -->
    <div class="fixed bottom-24 right-4 z-50">
      <div v-if="Array.isArray(configStore.lastError) && configStore.lastError.length" class="space-y-2">
        <div v-for="(err, idx) in configStore.lastError" :key="idx"
          class="p-4 bg-red-500 text-white rounded-2xl shadow-lg">
          {{ err }}
        </div>
      </div>
      <div v-else-if="configStore.lastError" class="p-4 bg-red-500 text-white rounded shadow-lg">
        {{ configStore.lastError }}
      </div>
>>>>>>> e731792 (test ver 2.0)
    </div>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import ConfigAccordion from '../components/ConfigAccordion.vue';
import ConfigList from '../components/ConfigList2.vue';
import ConfigTotal from '../components/ConfigTotal.vue';
import useCompatibility from '../scripts/useCompatibility.js';
import slugify from '../scripts/slugify.js'
import { useConfigStore } from '../stores/store.js';

const configStore = useConfigStore();
const selected = configStore.selected;

const { checkAll, lastError } = useCompatibility(selected, configStore.allComponents);

watch(
  () => [...Object.values(selected).map(s => (s && s.value != null) ? s.value : s)],
  checkAll,
  { deep: true }
);

// Синхронизируем локальную ошибку проверки совместимости с хранилищем, чтобы показать toast
watch(lastError, (val) => {
  configStore.lastError = val ? val : null;
});

function clearBuild() {
  configStore.clearSelected();
  configStore.lastError = null;
}

function onSelect(categoryKey, val) {
  configStore.setSelected(categoryKey, val);
}

onMounted(async () => {
  // Загружаем компоненты из БД при монтировании
  await configStore.loadComponents();
  // после загрузки компонентов — прогоняем проверку совместимости
  checkAll();
  document.body.style.overflowX = 'visible';
});

onUnmounted(() => {
  document.body.style.overflowX = 'hidden';
});
</script>
