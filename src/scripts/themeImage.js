import { ref } from 'vue'

export const imageSrc = ref('/image.png')
export const placeholderSrc = ref('/placeholder1.png')
export const componentSrc = ref('/component.png')

function updateImage() {
  imageSrc.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'image.png'
    : 'image-light.png'
  placeholderSrc.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? '/placeholder1.png'
    : '/placeholder1-light.png'
  componentSrc.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? '/component.png'
    : '/component-light.png'  
}

export function getThemeImage(theme, darkSrc, lightSrc) {
  return theme !== 'light' ? darkSrc : lightSrc;
}

if (typeof window !== 'undefined') {
  updateImage()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateImage)
}
