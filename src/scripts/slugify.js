export default function slugify(text) {
    return text.trim().replace(/\s+/g, '-')
  }