<script setup>
import SaleCard from '../components/SaleCard.vue'
</script>
<template>
  <main>
    <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
      <div class="flex flex-wrap text-5xl mb-6">
        <span class="text-neutral-500">Конфигурации</span>
        <span class="font-semibold">Игровые</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
      </div>
      <div class="flex flex-wrap text-5xl mb-6 pt-16">
        <span class="text-neutral-500">Конфигурации</span>
        <span class="font-semibold">Серверные</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SaleCard></SaleCard>
        <SaleCard></SaleCard>
      </div>
    </div>
  </main>
</template>
