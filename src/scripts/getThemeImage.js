export function getThemeImage(theme, darkSrc, lightSrc) {
  return theme !== 'light' ? darkSrc : lightSrc;
}
