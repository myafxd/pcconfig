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

const categoryTypeMap = {
  gpu: 'GPU',
  cpu: 'CPU',
  mobo: 'Motherboard',
  ram: 'RAM',
  psu: 'PSU',
  storage: 'Storage',
  fan: 'CoolerFan',
  thermo: 'ThermalPaste',
  case: 'Case'
}

function normalizeComponentsPayload(data) {
  const normalized = {}

  Object.entries(data).forEach(([key, items]) => {
    const normalizedKey = categoryTypeMap[key.toLowerCase()] || key
    if (!normalizedKey || !(normalizedKey in typeNameMap)) return

    normalized[normalizedKey] = Array.isArray(items) ? items : []
  })

  return normalized
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

      const endpoint = API_URL === '/api' ? '/api/components/grouped' : `${API_URL}/api/components/grouped`

      try {
        const res = await fetch(endpoint)
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

        const data = await res.json()
        const normalizedData = normalizeComponentsPayload(data)

        this.allComponents = normalizedData
        this.components = Object.keys(normalizedData)
          .filter(type => type in typeIconMap)
          .map(type => ({
            key: type,
            name: typeNameMap[type] || type,
            items: normalizedData[type],
            icon: typeIconMap[type]
          }))

        Object.keys(normalizedData).forEach(type => {
          if (!(type in this.selected)) this.selected[type] = { value: null }
        })
      } catch (err) {
        console.warn('loadComponents api fallback:', err)
        await this.loadComponentsFromStatic() // fallback to static data
      } finally {
        this.isLoading = false
      }
    },

    async loadComponentsFromStatic() {
      try {
        const module = await import('../scripts/products.json')
        const rawData = module.default || module
        const normalizedData = normalizeComponentsPayload(rawData)

        this.allComponents = normalizedData
        this.components = Object.keys(normalizedData)
          .filter(type => type in typeIconMap)
          .map(type => ({
            key: type,
            name: typeNameMap[type] || type,
            items: normalizedData[type],
            icon: typeIconMap[type]
          }))

        Object.keys(normalizedData).forEach(type => {
          if (!(type in this.selected)) this.selected[type] = { value: null }
        })

        this.lastError = null
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        this.lastError = `Ошибка загрузки компонентов: ${msg}`
        console.error(this.lastError, err)
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