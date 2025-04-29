<template>
    <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
        <div class="flex flex-wrap text-5xl mb-6">
            <span class="text-neutral-500">Дополнительные</span>
            <span class="font-semibold">Услуги</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="service in services" :key="service.id">
                <ServiceCard 
                :name="service.name" 
                :description="service.description" 
                :id="service.id"
                :price="service.price" />
            </div>
        </div>
    </div>
</template>
<script setup>
import ServiceCard from '../components/ServiceCard.vue';
const services = [
    {
        id: 1,
        name: 'Сборка ПК',
        description: 'Опытный мастер займется сбором комплектующих в готовую к использованию рабочую станцию',
        price: '3500'
    },
    {
        id: 2,
        name: 'Диагностика',
        description: 'Поиск и устранение проблем с программным обеспечением для стабильной работы ПК.',
        price: '1500'
    },
    {
        id: 3,
        name: 'Перенос данных',
        description: 'Перенос данных и настроек с одного ПК на другой без потери информации.',
        price: '3000'
    },
    {
        id: 4,
        name: 'Улучшение дизайна',
        description: 'Уникальная аэрография или виниловая покраска для изменения внешнего вида ПК.',
        price: '5000'
    },
    {
        id: 5,
        name: 'Защита данных',
        description: 'Настройка резервного копирования для защиты данных в случае сбоя.',
        price: '3000'
    },
    {
        id: 6,
        name: 'Модернизация',
        description: 'Замена компонентов ПК для лучшей производительности (стоимость не включена).',
        price: '4000'
    },
    {
        id: 7,
        name: 'Техническое обслуживание',
        description: 'Продувка от пыли и замена термопасты для улучшения температурных показателей.',
        price: '2500'
    },
    {
        id: 8,
        name: 'Скальпирование процессора',
        description: 'Удаление крышки с процессора и замена заводской термопасты на жидкий металл.',
        price: '3500'
    }
];
</script>