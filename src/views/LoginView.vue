<template>  <div class="mx-auto max-w-[1300px] px-4 md:px-12 xl:px-20 mt-16">
    <div class="text-5xl mb-6 pt-16">
      <span class="text-neutral-500">Личный</span>
      <span class="font-semibold">Кабинет</span>
    </div>    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 xl:gap-12 items-start">
      <!-- Авторизация -->
      <div class="flex flex-col col-span-1 md:col-span-1 xl:col-span-3 order-1">
        <h2 class="text-3xl font-bold mb-6">Авторизация</h2>
        <div class="mb-2">
          <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="auth-email">
            E-mail
          </label>
          <input
            v-model="authEmail"
            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
            id="auth-email"
            type="email"
            placeholder="pc@config.com"
          />
          <span v-if="authErrors.email" class="text-red-500 text-sm mt-1 block">{{ authErrors.email }}</span>
        </div>

        <div class="mb-2">
          <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="auth-password">
            Пароль
          </label>
          <input
            v-model="authPassword"
            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
            id="auth-password"
            type="password"
            placeholder="••••••••"
          />
          <span v-if="authErrors.password" class="text-red-500 text-sm mt-1 block">{{ authErrors.password }}</span>
        </div>        <button
          @click="handleLogin"
          class="w-full bg-blue-500/80 text-white font-semibold py-3 text-xl cursor-pointer mt-4"
        >
          Войти
        </button>
      </div>      <!-- Регистрация -->
      <div class="flex flex-col col-span-1 md:col-span-1 xl:col-span-2 xl:col-start-4 order-2">
        <h2 class="text-3xl font-bold mb-6">Регистрация</h2>
        <div class="mb-2">
          <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="reg-name">
            Имя
          </label>
          <input
            v-model="regName"
            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
            id="reg-name"
            type="text"
            placeholder="Иван Иванов"
          />
          <span v-if="regErrors.name" class="text-red-500 text-sm mt-1 block">{{ regErrors.name }}</span>
        </div>

        <div class="mb-2">
          <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="reg-email">
            E-mail
          </label>
          <input
            v-model="regEmail"
            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
            id="reg-email"
            type="email"
            placeholder="pc@config.com"
          />
          <span v-if="regErrors.email" class="text-red-500 text-sm mt-1 block">{{ regErrors.email }}</span>
        </div>

        <div class="mb-2">
          <label class="block text-neutral-600 dark:text-neutral-400 text-lg font-base" for="reg-password">
            Пароль
          </label>
          <input
            v-model="regPassword"
            class="border border-neutral-700 dark:bg-neutral-800 w-full text-2xl py-2 px-3 text-neutral-700 dark:text-neutral-200 h-16 focus:outline-none focus:shadow-outline"
            id="reg-password"
            type="password"
            placeholder="••••••••"
          />
          <span v-if="regErrors.password" class="text-red-500 text-sm mt-1 block">{{ regErrors.password }}</span>
        </div>        <button
          @click="handleRegister"
          class="w-full bg-blue-500/80 text-white font-semibold py-3 text-xl cursor-pointer mt-4"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const authEmail = ref('')
const authPassword = ref('')
const authErrors = ref({})

const handleLogin = () => {
  authErrors.value = {}
  if (!/^\S+@\S+\.\S+$/.test(authEmail.value)) {
    authErrors.value.email = 'Некорректный e-mail'
  }
  if (!authPassword.value.trim()) {
    authErrors.value.password = 'Введите пароль'
  }

  if (Object.keys(authErrors.value).length > 0) return
}

const regName = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regErrors = ref({})

const handleRegister = () => {
  regErrors.value = {}
  
  if (!regName.value.trim()) {
    regErrors.value.name = 'Введите имя'
  } else if (regName.value.length < 2) {
    regErrors.value.name = 'Имя слишком короткое'
  }

  if (!/^\S+@\S+\.\S+$/.test(regEmail.value)) {
    regErrors.value.email = 'Некорректный e-mail'
  }

  if (regPassword.value.length < 6) {
    regErrors.value.password = 'Минимум 6 символов'
  }

  if (Object.keys(regErrors.value).length > 0) return
}
</script>