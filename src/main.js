import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia' 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
// компоненты для маршрутизации 
import HomeView from './views/HomeView.vue'
import ReadyView from './views/ReadyView.vue'
import ConfigView from './views/ConfigView.vue'
import ServicesView from './views/ServicesView.vue'
import OrderView from './views/OrderView.vue'
import LoginView from './views/LoginView.vue'
import TestView from './views/TestView.vue'
const name = 'Pcconfig'

const router = createRouter({
    routes: [
    {
      path: '/',
      component: HomeView,
      meta: { title: `Главная - ${name}` }
    },
    {
      path: '/config',
      component: ConfigView,
      meta: { title: `Конфигуратор - ${name}` }
    },
    {
      path: '/ready',
      component: ReadyView,
      meta: { title: `Готовые сборки - ${name}` }
    },
    {
      path: '/service',
      component: ServicesView,
      meta: { title: `Услуги - ${name}` }
    },
    {
      path: '/order',
      component: OrderView,
      meta: { title: `Оформление заказа - ${name}` }
    },
    {
      path: '/login',
      component: LoginView,
      meta: { title: `Вход - ${name}` }
    },
    {
      path: '/testpage',
      component: TestView,
      meta: { title: 'test page' }
    }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? 'PConfig'
  next()
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia) 
app.use(router)
app.mount("#app")