import { ref } from 'vue'

// Безопасно парсим числовые значения из строк/чисел
export function parseNumberField(val) {
  if (val == null) return 0
  const s = String(val).replace(/[^0-9.,-]/g, '').replace(',', '.')
  const n = Number(s)
  return Number.isFinite(n) ? n : 0
}

// Получить объект компонента по ключу (selected содержит id-значения, а allComponents — сгруппированную коллекцию)
export function getItemByKey(selected, allComponents, key) {
  const sel = selected?.[key]?.value ?? selected?.[key] ?? null
  if (!sel) return null
  const list = allComponents?.[key] ?? []
  return list.find(i => String(i.id) === String(sel)) || null
}

export function getTotalPrice(selected, allComponents) {
  if (!selected || !allComponents) return 0
  return Object.keys(selected).reduce((sum, key) => {
    try {
      const item = getItemByKey(selected, allComponents, key)
      const price = item ? parseNumberField(item.price) : 0
      return sum + price
    } catch (e) {
      return sum
    }
  }, 0)
}

export function validateCompatibility(selected, allComponents) {
  const errors = []

  const cpu = getItemByKey(selected, allComponents, 'CPU') || getItemByKey(selected, allComponents, 'cpu')
  const gpu = getItemByKey(selected, allComponents, 'GPU') || getItemByKey(selected, allComponents, 'gpu')
  const psu = getItemByKey(selected, allComponents, 'PSU') || getItemByKey(selected, allComponents, 'psu')
  const mobo = getItemByKey(selected, allComponents, 'Motherboard') || getItemByKey(selected, allComponents, 'mobo')
  const ram = getItemByKey(selected, allComponents, 'RAM') || getItemByKey(selected, allComponents, 'ram')

  const cpuPower = parseNumberField(cpu?.power || cpu?.watt || cpu?.tdp)
  const gpuPower = parseNumberField(gpu?.power || gpu?.tdp)
  const requiredPower = cpuPower + gpuPower + 100 // запас

  const psuPower = parseNumberField(psu?.power || psu?.watt || psu?.wattage || psu?.watts)

  if ((cpuPower || gpuPower) && psu) {
    if (psuPower < requiredPower) {
      errors.push(`Недостаточная мощность блока питания: нужно ~${requiredPower}W, выбран БП ${psuPower}W`)
    }
  }

  // Сокеты
  if (cpu?.socket && mobo?.socket && String(cpu.socket) !== String(mobo.socket)) {
    errors.push(`Несовместимость CPU и материнской платой (socket): ${cpu.socket} ≠ ${mobo.socket}`)
  }

  // ОЗУ — строгая проверка DDR4 / DDR5 по материнской плате и памяти
  const moboRamType = mobo?.ramType || mobo?.supportedRam || ''
  const ramType = ram?.type || ram?.ramType || ''

  const moboRamNorm = String(moboRamType).trim().toUpperCase()
  const ramNorm = String(ramType).trim().toUpperCase()

  if (mobo && !moboRamNorm) {
    errors.push('Материнская плата не содержит информации о поддерживаемом типе RAM (ramType).')
  }

  if (ram && !ramNorm) {
    errors.push('Оперативная память не содержит информации о типе RAM (type/ramType).')
  }

  if (mobo && ram && moboRamNorm && ramNorm && moboRamNorm !== ramNorm) {
    errors.push(`Несовместимость RAM и материнской платы: ${ramNorm} vs ${moboRamNorm}.`)
  }

  // Ретрофит: если есть supportedRam жесткая строка, применяем мягкую проверку
  if (ram && mobo && ramNorm && mobo?.supportedRam && !String(mobo.supportedRam).toUpperCase().includes(ramNorm)) {
    errors.push(`Оперативная память (${ramNorm}) может не поддерживаться материнской платой (${mobo.supportedRam}).`)
  }

  return {
    ok: errors.length === 0,
    errors,
    requiredPower,
    psuPower
  }
}

// Backwards-compatible default export: принимает `selected` (как в старом коде) и опционально allComponents
export default function useCompatibility(selected, allComponents = null) {
  const lastError = ref('')

  function checkAll() {
    lastError.value = ''
    try {
      const result = validateCompatibility(selected, allComponents || (window?.__ALL_COMPONENTS__ ?? {}))
      if (!result.ok) {
        lastError.value = result.errors.join('; ')
      }
    } catch (e) {
      lastError.value = e?.message || 'Ошибка проверки совместимости.'
    }
  }

  return { checkAll, lastError }
}
