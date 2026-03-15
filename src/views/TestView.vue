<script setup lang="ts">
import ConfigList2 from '../components/ConfigList2.vue';
import { onMounted, onUnmounted, watch, computed } from 'vue';
import ConfigAccordion from '../components/ConfigAccordion.vue';
import ConfigList from '../components/ConfigList.vue';
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

<template>
<div v-for="component in configStore.components" :key="component.key" :id="slugify(component.name)">
          <ConfigList :title="component.name" :componentKey="component.key" :items="component.items"
            :icon="component.icon" :selected="selected[component.key]"
            @update:selected="val => onSelect(component.key, val)" />
        </div>
</template>