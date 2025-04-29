<script setup>
import GeneralBanner from '../components/GeneralBanner.vue'
import TextCard from '../components/TextCard.vue'
import NowCard from '../components/NowCard.vue'
import HomeSlider from '../components/HomeSlider.vue'
import AnswerQuestion from '../components/AnswerQuestion.vue'
import { ref } from 'vue'
const faqs = ref([
  {
    question: 'Как проверить совместимость компонентов?',
    answer: 'Чтобы проверить совместимость, обратитесь к спецификациям на сайте производителя или воспользуйтесь нашим онлайн-конфигуратором.'
  },
  {
    question: 'Как долго будет длиться доставка?',
    answer: 'Срок доставки составляет от 3 до 7 рабочих дней в зависимости от региона.'
  },
  {
    question: 'Для чего могут пригодиться упаковки от комплектующих?',
    answer: 'Упаковки можно использовать для хранения кабелей и мелких деталей при переездах или ремонтах.'
  },
  {
    question: 'Зачем предлагать вывести провода для накопителей?',
    answer: 'Это облегчает будущую замену или установку накопителей без разбора корпуса.'
  },
  {
    question: 'Можно ли будет поменять цвет подсветки компьютера?',
    answer: 'Да, RGB-подсветку можно настроить в программном обеспечении или через контроллер внутри корпуса.'
  },
  {
    question: 'Стоит ли устанавливать антивирусную программу на ПК?',
    answer: 'Рекомендуется установить надежный антивирус сразу после сборки для защиты от вредоносных программ.'
  }
])
</script>
<template>
  <main>
    <GeneralBanner></GeneralBanner>
    <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Мы предлагаем</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <TextCard dynamicText1="Сборка профессионалами"
          dynamicText2="Наши инженеры соберут ПК с безупречным кабель-менеджментом и настройкой BIOS" />
        <TextCard dynamicText1="Гарантируем долговечность"
          dynamicText2="Каждый компонент проверен на заводе, а готовая сборка тестируется 24 часах" />
        <TextCard dynamicText1="Индивидуальный дизайн"
          dynamicText2="Выберите цвет корпуса, подсветку и форм-фактор — мы воплотим ваши идеи" />


      </div>
    </div>
    <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Приступайте сейчас</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NowCard dynamicText1="Подбор комплектующих" dynamicText3="1."
          dynamicText2="В конфигураторе представлены совместимые друг с другом комплектующие. Вы не ошибетесь при создании собственного ПК" />
        <NowCard dynamicText1="Выбор доп. переферии" dynamicText3="2."
          dynamicText2="Помимо системного блока, вы также можете заказать периферию и установку программного обеспечения" />
        <NowCard dynamicText1="Сохранение и оформление" dynamicText3="3."
          dynamicText2="Выбранная сборка ПК сохраняется на сайте. Добавьте ее в корзину и оформите заказ. Мы сразу же приступим к сборке компьютера." />
      </div>
    </div>
    <div class="mx-auto max-w-[1300px] md:px-4 px-10 md:px-12 xl:px-20 mt-16">
      <div class="text-5xl mb-6 pt-16">
        <span class="font-semibold">Наши партнеры</span>
      </div>
      <HomeSlider/>
    </div>
    <div class="mx-auto max-w-[1300px] md:px-4 px-10 md:px-12 xl:px-20 mt-32">
      <div class="grid grid-cols-1 xl:grid-cols-7 xl:gap-5 items-start">
        <div class="text-5xl mb-10 col-span-3">
          <h2 class="font-semibold">Остались вопросы?</h2>
          <h3 class="font-semibold text-neutral-500">У нас есть ответы.</h3>
        </div>
        <div class="space-y-3 col-span-4">
          <div class="divide-y divide-neutral-600">
            <AnswerQuestion
              v-for="(item, idx) in faqs"
              :key="idx"
              :dynamicText1="item.question"
              :dynamicText2="item.answer"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>