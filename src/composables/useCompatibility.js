import { ref } from 'vue'

export default function useCompatibility(selected) {
  const lastError = ref('')

  function checkAll() {
    lastError.value = '';

    if (selected.gpu?.value && selected.psu?.value) {
      if (selected.psu.value.wattage < selected.gpu.value.power) {
        lastError.value = 'Недостаточная мощность блока питания.';
        return;
      }
    }

    if (selected.cpu?.value && selected.mobo?.value) {
      if (selected.cpu.value.socket !== selected.mobo.value.socket) {
        lastError.value = 'Сокет ЦП не совпадает с сокетом материнской платы.';
        return;
      }
    }

    if (selected.mobo?.value && selected.ram?.value) {
      if (selected.mobo.value.ramType !== selected.ram.value.type) {
        lastError.value = 'Тип ОЗУ не поддерживается материнской платой.';
        return;
      }
    }
  }

  return { checkAll, lastError }
}
