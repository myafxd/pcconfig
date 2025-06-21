import { defineStore } from 'pinia'
import products from '../scripts/products.json'
import { Cpu, BoomBox, CircuitBoard, Plug, HardDrive, Fan, Thermometer, MemoryStick, Smartphone as Case } from 'lucide-vue-next'

function limitItems(arr, max) {
  return arr ? arr.slice(0, max) : [];
}

export const allComponents = {
  gpu: limitItems(products.gpu, 6),
  cpu: limitItems(products.cpu, 6),
  mobo: limitItems(products.mobo, 5),
  ram: limitItems(products.ram, 5),
  storage: limitItems(products.storage, 5),
  psu: limitItems(products.psu, 5),
  fan: limitItems(products.fan, 4),
  thermo: limitItems(products.thermo, 4),
  case: limitItems(products.case, 5)
};

export const components = [
  { key: 'gpu', name: 'Видеокарта', items: allComponents.gpu, icon: BoomBox },
  { key: 'psu', name: 'Блок питания', items: allComponents.psu, icon: Plug },
  { key: 'cpu', name: 'Процессор', items: allComponents.cpu, icon: Cpu },
  { key: 'mobo', name: 'Материнская плата', items: allComponents.mobo, icon: CircuitBoard },
  { key: 'ram', name: 'Оперативная память', items: allComponents.ram, icon: MemoryStick },
  { key: 'storage', name: 'Хранилище', items: allComponents.storage, icon: HardDrive },
  { key: 'fan', name: 'Охлаждение', items: allComponents.fan, icon: Fan },
  { key: 'thermo', name: 'Термоинтерфейс', items: allComponents.thermo, icon: Thermometer },
  { key: 'case', name: 'Корпус', items: allComponents.case, icon: Case }
];

export const useConfigStore = defineStore('config', {
  state: () => ({
    allComponents,
    selected: {
      gpu: { value: null },
      cpu: { value: null },
      mobo: { value: null },
      ram: { value: null },
      psu: { value: null },
      storage: { value: null },
      fan: { value: null },
      thermo: { value: null },
      case: { value: null }
    }
  }),
  actions: {
    setSelected(key, value) {
      if (this.selected[key]) {
        this.selected[key].value = value
      }
    },
    clearSelected() {
      Object.keys(this.selected).forEach(key => {
        this.selected[key].value = null
      })
    }
  },
  persist: {
    paths: ['selected']
  }
})