// src/scripts/getThemeImage.js
// Возвращает относительный путь к картинке в зависимости от темы
export function getThemeImage(theme, darkSrc, lightSrc) {
  return theme !== 'light' ? darkSrc : lightSrc;
}
