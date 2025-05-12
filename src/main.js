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

const router = createRouter({
    routes: [
    {
      path: '/',
      component: HomeView,
      meta: { title: 'Главная - PConfig' }
    },
    {
      path: '/config',
      component: ConfigView,
      meta: { title: 'Конфигуратор - PConfig' }
    },
    {
      path: '/ready',
      component: ReadyView,
      meta: { title: 'Готовые сборки - PConfig' }
    },
    {
      path: '/service',
      component: ServicesView,
      meta: { title: 'Услуги - PConfig' }
    },
    {
      path: '/order',
      component: OrderView,
      meta: { title: 'Оформление заказа - PConfig' }
    },
    {
      path: '/login',
      component: LoginView,
      meta: { title: 'Вход - PConfig' }
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