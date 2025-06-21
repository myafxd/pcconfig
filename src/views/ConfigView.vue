<template>
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
    </div>
  </div>
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
