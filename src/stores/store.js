import { defineStore } from 'pinia'
import { Cpu, BoomBox, CircuitBoard, Plug, HardDrive, Fan, Thermometer, MemoryStick, Smartphone as Case } from 'lucide-vue-next'

// Маппинг типов компонентов на иконки
const typeIconMap = {
  GPU: BoomBox,
  CPU: Cpu,
  Motherboard: CircuitBoard,
  PSU: Plug,
  RAM: MemoryStick,
  Storage: HardDrive,
  CoolerFan: Fan,
  ThermalPaste: Thermometer,
  Case: Case
}

// Маппинг типов компонентов на русские названия
const typeNameMap = {
  GPU: 'Видеокарта',
  CPU: 'Процессор',
  Motherboard: 'Материнская плата',
  PSU: 'Блок питания',
  RAM: 'Оперативная память',
  Storage: 'Хранилище',
  CoolerFan: 'Охлаждение',
  ThermalPaste: 'Термоинтерфейс',
  Case: 'Корпус'
}

const rawApiUrl = import.meta.env.VITE_API_URL || '/api'
const API_URL = rawApiUrl.replace(/\/$/, '')

export const useConfigStore = defineStore('config', {
  state: () => ({
    allComponents: {},
    components: [],
    selected: {
      GPU: { value: null },
      CPU: { value: null },
      Motherboard: { value: null },
      RAM: { value: null },
      PSU: { value: null },
      Storage: { value: null },
      CoolerFan: { value: null },
      ThermalPaste: { value: null },
      Case: { value: null }
    },
    isLoading: false,
    lastError: null
  }),

  getters: {
    getComponentsByType: state => type => state.allComponents[type] || [],
    getTotalPrice: state => {
      let total = 0
      Object.entries(state.selected).forEach(([type, selection]) => {
        if (!selection?.value) return
        const item = state.allComponents[type]?.find(c => String(c.id) === String(selection.value))
        if (item) total += Number(item.price) || 0
      })
      return total
    }
  },

  actions: {
    async loadComponents() {
      this.isLoading = true
      this.lastError = null
      try {
        const endpoint = API_URL === '/api' ? '/api/components/grouped' : `${API_URL}/api/components/grouped`
      const res = await fetch(endpoint)
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        const data = await res.json()
        this.allComponents = data
        this.components = Object.keys(data)
          .filter(type => type in typeIconMap)
          .map(type => ({
            key: type,
            name: typeNameMap[type] || type,
            items: data[type],
            icon: typeIconMap[type]
          }))
        Object.keys(data).forEach(type => {
          if (!(type in this.selected)) this.selected[type] = { value: null }
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        this.lastError = `Ошибка загрузки компонентов: ${msg}`
        console.error(this.lastError, err)
      } finally {
        this.isLoading = false
      }
    },
    setSelected(categoryKey, value) {
      if (this.selected[categoryKey]) this.selected[categoryKey].value = value
    },
    clearSelected() {
      Object.keys(this.selected).forEach(key => (this.selected[key].value = null))
    }
  },

  persist: {
    paths: ['selected']
  }
})