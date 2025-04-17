import { createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
// компоненты для маршрутизации бро
import HomeView from './views/HomeView.vue'
import ReadyView from './views/ReadyView.vue'
import ConfigView from './views/ConfigView.vue'
// Маршрутизация бро
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
    ],
    history: createWebHistory()
})

// createApp(App).mount('#app')
const app = createSSRApp(App) 
app.use(router)
app.mount("#app")