import { defineStore } from 'pinia'
import { Cpu, BoomBox, CircuitBoard, Plug, HardDrive, Fan, Thermometer, MemoryStick, Smartphone as Case } from 'lucide-vue-next'

export const allComponents = {
  gpu: [
    { id: 1, chip: 'NVIDIA', type: 'NVIDIA', name: 'GeForce RTX 4090', image: '', power: 450, price: 220000, compatible: true },
    { id: 2, chip: 'NVIDIA', type: 'NVIDIA', name: 'GeForce RTX 4070 Ti', image: '', power: 285, price: 95000, compatible: true },
    { id: 3, chip: 'AMD', type: 'AMD', name: 'Radeon RX 7900 XTX', image: '', power: 355, price: 120000, compatible: true },
    { id: 4, chip: 'AMD', type: 'AMD', name: 'Radeon RX 7800 XT', image: '', power: 263, price: 65000, compatible: true },
    { id: 5, chip: 'Intel', type: 'Intel', name: 'Arc A770', image: '', power: 225, price: 35000, compatible: true },
    { id: 6, chip: 'NVIDIA', type: 'NVIDIA', name: 'GeForce RTX 3060', image: '', power: 170, price: 35000, compatible: true },
    { id: 7, chip: 'AMD', type: 'AMD', name: 'Radeon RX 6600', image: '', power: 132, price: 20000, compatible: true },
    { id: 8, chip: 'NVIDIA', type: 'NVIDIA', name: 'GeForce RTX 4070 Super', image: '', power: 220, price: 80000, compatible: true },
    { id: 9, chip: 'AMD', type: 'AMD', name: 'Radeon RX 7700 XT', image: '', power: 245, price: 60000, compatible: true }
  ],
  cpu: [
    { id: 1, socket: 'LGA1700', type: 'Intel', name: 'Intel Core i9-14900K', image: '', price: 65000, compatible: true },
    { id: 2, socket: 'LGA1700', type: 'Intel', name: 'Intel Core i7-14700K', image: '', price: 48000, compatible: true },
    { id: 3, socket: 'AM5', type: 'AMD', name: 'AMD Ryzen 9 7950X', image: '', price: 68000, compatible: true },
    { id: 4, socket: 'AM5', type: 'AMD', name: 'AMD Ryzen 7 7800X3D', image: '', price: 52000, compatible: true },
    { id: 5, socket: 'AM4', type: 'AMD', name: 'AMD Ryzen 5 5600X', image: '', price: 15000, compatible: true },
    { id: 6, socket: 'LGA1200', type: 'Intel', name: 'Intel Core i5-11400F', image: '', price: 12000, compatible: true },
    { id: 7, socket: 'Baikal', type: 'Other', name: 'Baikal BE-T1000', image: '', price: 9000, compatible: false }
  ],
  mobo: [
    { id: 1, socket: 'LGA1700', type: 'Intel', ramType: 'DDR5', name: 'ASUS ROG Strix Z790-E', image: '', price: 38000, compatible: true },
    { id: 2, socket: 'LGA1700', type: 'Intel', ramType: 'DDR4', name: 'MSI PRO Z690-A DDR4', image: '', price: 21000, compatible: true },
    { id: 3, socket: 'AM5', type: 'AMD', ramType: 'DDR5', name: 'Gigabyte X670E AORUS PRO X', image: '', price: 40000, compatible: true },
    { id: 4, socket: 'AM4', type: 'AMD', ramType: 'DDR4', name: 'ASUS TUF Gaming B550-PLUS', image: '', price: 17000, compatible: true },
    { id: 5, socket: 'LGA1200', type: 'Intel', ramType: 'DDR4', name: 'ASRock B560M-HDV', image: '', price: 9000, compatible: true },
    { id: 6, socket: 'AM4', type: 'AMD', ramType: 'DDR4', name: 'Gigabyte B450M DS3H', image: '', price: 7000, compatible: true }
  ],
  ram: [
    { id: 1, type: 'DDR5', name: 'Kingston Fury Beast 32GB (2x16GB) 6000MHz', image: '', price: 17000, compatible: true },
    { id: 2, type: 'DDR4', name: 'Corsair Vengeance LPX 16GB (2x8GB) 3200MHz', image: '', price: 6500, compatible: true },
    { id: 3, type: 'DDR5', name: 'G.Skill Trident Z5 64GB (2x32GB) 6400MHz', image: '', price: 35000, compatible: true },
    { id: 4, type: 'DDR4', name: 'Patriot Viper Steel 32GB (2x16GB) 3600MHz', image: '', price: 11000, compatible: true },
    { id: 5, type: 'DDR5', name: 'Corsair Vengeance 32GB (2x16GB) 5600MHz', image: '', price: 15000, compatible: true }
  ],
  storage: [
    { id: 1, type: 'SSD', name: 'Samsung 990 PRO 1TB NVMe', price: 9000, compatible: true },
    { id: 2, type: 'SSD', name: 'Kingston NV2 1TB NVMe', price: 5500, compatible: true },
    { id: 3, type: 'SSD', name: 'WD Blue SN570 1TB NVMe', price: 6000, compatible: true },
    { id: 4, type: 'HDD', name: 'Seagate Barracuda 2TB', price: 5000, compatible: true },
    { id: 5, type: 'SSD', name: 'ADATA XPG SX8200 Pro 2TB', price: 12000, compatible: true }
  ],
  psu: [
    { id: 1, name: 'Corsair RM1000x', wattage: 1000, price: 18000, compatible: true },
    { id: 2, name: 'be quiet! Pure Power 12M 850W', wattage: 850, price: 14000, compatible: true },
    { id: 3, name: 'Chieftec Proton 650W', wattage: 650, price: 7000, compatible: true },
    { id: 4, name: 'Deepcool PK550D', wattage: 550, price: 5000, compatible: true },
    { id: 5, name: 'Thermaltake Smart 430W', wattage: 430, price: 3500, compatible: true },
    { id: 6, name: 'AeroCool VX Plus 600W', wattage: 600, price: 3400, compatible: true }
  ],
  fan: [
    { id: 1, name: 'be quiet! Pure Rock 2', price: 3500, compatible: true },
    { id: 2, name: 'Deepcool GAMMAXX 400 V2', price: 1800, compatible: true },
    { id: 3, name: 'Noctua NH-D15', price: 11000, compatible: true },
    { id: 4, name: 'ID-COOLING SE-224-XT', price: 2200, compatible: true }
  ],
  thermo: [
    { id: 1, name: 'Arctic MX-4 4g', price: 600, compatible: true },
    { id: 2, name: 'Deepcool Z5 3g', price: 400, compatible: true },
    { id: 3, name: 'Thermal Grizzly Kryonaut 1g', price: 900, compatible: true }
  ],
  case: [
    { id: 1, name: 'DEEPCOOL MATREXX 55 V3', price: 4000, compatible: true },
    { id: 2, name: 'Zalman S2', price: 3500, compatible: true },
    { id: 3, name: 'NZXT H510', price: 9000, compatible: true },
    { id: 4, name: 'Cougar MX330-G', price: 4800, compatible: true }
  ]
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
