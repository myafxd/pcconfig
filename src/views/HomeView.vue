<script setup>
import GeneralBanner from '../components/GeneralBanner.vue';
import TextCard from '../components/TextCard.vue';
import NowCard from '../components/NowCard.vue';
import HomeSlider from '../components/HomeSlider.vue';
</script>
<template>
  <main>
    <GeneralBanner></GeneralBanner>
    <div class="mx-auto max-w-[1300px] px-4 md:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Мы предлагаем</span>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-3 gap-4">
        <TextCard dynamicText1="Сборка профессионалами"
          dynamicText2="Наши инженеры соберут ПК с безупречным кабель-менеджментом и настройкой BIOS" />
        <TextCard dynamicText1="Гарантируем долговечность"
          dynamicText2="Каждый компонент проверен на заводе, а готовая сборка тестируется 24 часах" />
        <TextCard dynamicText1="Индивидуальный дизайн"
          dynamicText2="Выберите цвет корпуса, подсветку и форм-фактор — мы воплотим ваши идеи" />


      </div>

    </div>
    <div class="mx-auto max-w-[1300px] px-4 md:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Приступайте сейчас</span>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-3 gap-4">
        <NowCard dynamicText1="Подбор комплектующих" dynamicText3="1."
          dynamicText2="В конфигураторе представлены совместимые друг с другом комплектующие. Вы не ошибетесь при создании собственного ПК" />
        <NowCard dynamicText1="Выбор доп. переферии" dynamicText3="2."
          dynamicText2="Помимо системного блока, вы также можете заказать периферию и установку программного обеспечения" />
        <NowCard dynamicText1="Сохранение и оформление" dynamicText3="3."
          dynamicText2="Выбранная сборка ПК сохраняется на сайте. Добавьте ее в корзину и оформите заказ. Мы сразу же приступим к сборке компьютера." />
      </div>
    </div>
    <div class="mx-auto max-w-[1300px] md:px-4 px-10 md:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Наши партнеры</span>
      </div>
    <HomeSlider></HomeSlider>
    </div>
  </main>
</template>