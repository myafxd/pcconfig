<template>
  <main class="pb-20">
    <div
      class="mx-auto max-w-[1700px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 px-4 sm:px-8 md:px-16 lg:px-20 mt-8 sm:mt-16 mb-16">
      <div class="sticky top-4 self-start hidden lg:block lg:col-span-2">
        <ConfigAccordion :components="components" />
      </div>
      <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-3 w-full">
        <div v-for="component in components" :key="component.key" :id="slugify(component.name)">
          <ConfigList :title="component.name" :componentKey="component.key" :items="component.items"
            :icon="component.icon" :selected="selected[component.key]"
            @update:selected="val => onSelect(component.key, val.value)" />
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
import { onMounted, onUnmounted, watch, computed } from 'vue';
import ConfigAccordion from '../components/ConfigAccordion.vue';
import ConfigList from '../components/ConfigList.vue';
import ConfigTotal from '../components/ConfigTotal.vue';
import useCompatibility from '../scripts/useCompatibility.js';
import slugify from '../scripts/slugify.js'
import { components, useConfigStore } from '../stores/store.js';

const configStore = useConfigStore();
const selected = configStore.selected;

const { checkAll, lastError } = useCompatibility(selected);

watch(
  () => [...Object.values(selected).map(s => s.value)],
  checkAll,
  { deep: true }
);

function clearBuild() {
  configStore.clearSelected();
}

function onSelect(categoryKey, val) {
  configStore.setSelected(categoryKey, val);
}

onMounted(() => {
  document.body.style.overflowX = 'visible';
});

onUnmounted(() => {
  document.body.style.overflowX = 'hidden';
});
</script>
