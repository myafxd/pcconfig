import { defineStore } from 'pinia'
import { Cpu, BoomBox, CircuitBoard, Plug, HardDrive, Fan, Thermometer, MemoryStick, Smartphone as Case } from 'lucide-vue-next'

// Маппинг типов компонентов на иконки
const typeIconMap = {
  'GPU': BoomBox,
  'CPU': Cpu,
  'Motherboard': CircuitBoard,
  'PSU': Plug,
  'RAM': MemoryStick,
  'Storage': HardDrive,
  'CoolerFan': Fan,
  'ThermalPaste': Thermometer,
  'Case': Case
};

// Маппинг типов компонентов на русские названия
const typeNameMap = {
  'GPU': 'Видеокарта',
  'CPU': 'Процессор',
  'Motherboard': 'Материнская плата',
  'PSU': 'Блок питания',
  'RAM': 'Оперативная память',
  'Storage': 'Хранилище',
  'CoolerFan': 'Охлаждение',
  'ThermalPaste': 'Термоинтерфейс',
  'Case': 'Корпус'
};

const API_URL = import.meta.env.VITE_API_URL || '/api';

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
    getComponentsByType: (state) => (type) => state.allComponents[type] || [],
    getTotalPrice: (state) => {
      let total = 0
      Object.entries(state.selected).forEach(([type, selection]) => {
        if (selection.value) {
          const component = state.allComponents[type]?.find(c => String(c.id) === String(selection.value))
          if (component) {
            total += Number(component.price) || 0
          }
        }
      })
      return total
    }
  },
  actions: {
    async loadComponents() {
      this.isLoading = true
      this.lastError = null

      try {
        const response = await fetch(`${API_URL}/api/components/grouped`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
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
          if (!(type in this.selected)) {
            this.selected[type] = { value: null }
          }
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        this.lastError = `Ошибка загрузки компонентов: ${errorMessage}`
        console.error(this.lastError, error)
      } finally {
        this.isLoading = false
      }
    },
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
});

// Маппинг типов компонентов на русские названия
const typeNameMap = {
  'GPU': 'Видеокарта',
  'CPU': 'Процессор',
  'Motherboard': 'Материнская плата',
  'PSU': 'Блок питания',
  'RAM': 'Оперативная память',
  'Storage': 'Хранилище',
  'CoolerFan': 'Охлаждение',
  'ThermalPaste': 'Термоинтерфейс',
  'Case': 'Корпус'
};

const API_URL = import.meta.env.VITE_API_URL || '/api';

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
    getComponentsByType: (state) => (type) => {
      return state.allComponents[type] || [];
    },
    getTotalPrice: (state) => {
      let total = 0;
      Object.entries(state.selected).forEach(([type, selection]) => {
        if (selection.value) {
          const component = state.allComponents[type]?.find(c => c.id === selection.value);
          if (component) {
            total += component.price;
          }
        }
      });
      return total;
    }
  },

  actions: {
    async loadComponents() {
      this.isLoading = true;
      this.lastError = null;

      try {
        const response = await fetch(`${API_URL}/api/components/grouped`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Заполняем allComponents данными из API
        this.allComponents = data;

        // Создаем массив components для использования в компонентах
        this.components = Object.keys(data)
          .filter(type => type in typeIconMap)
          .map(type => ({
            key: type,
            name: typeNameMap[type],
            items: data[type],
            icon: typeIconMap[type]
          }));

        // Инициализируем selected для новых типов компонентов
        Object.keys(data).forEach(type => {
          if (!(type in this.selected)) {
            this.selected[type] = { value: null };
          }
        });

        console.log('Компоненты успешно загружены из БД');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.lastError = `Ошибка загрузки компонентов: ${errorMessage}`;
        console.error(this.lastError, error);
      } finally {
        this.isLoading = false;
      }
    },

    setSelected(key, value) {
      if (this.selected[key]) {
        this.selected[key].value = value;
      }
    },

    clearSelected() {
      Object.keys(this.selected).forEach(key => {
        this.selected[key].value = null;
      });
    }
  },

  persist: {
    paths: ['selected']
  }
});
