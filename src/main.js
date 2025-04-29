import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
// компоненты для маршрутизации бро
import HomeView from './views/HomeView.vue'
import ReadyView from './views/ReadyView.vue'
import ConfigView from './views/ConfigView.vue'
import ServicesView from './views/ServicesView.vue'
import CartView from './views/CartView.vue'

// Маршрутизация 
const router = createRouter({
    routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/config',
      component: ConfigView
    },
    {
      path: '/ready',
      component: ReadyView
    },
    {
      path: '/service',
      component: ServicesView
    },
    {
      path: '/cart',
      component: CartView
    }
    ],
    history: createWebHistory()
})
const app = createApp(App) 
app.use(router)
app.mount("#app")