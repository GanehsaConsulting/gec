export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function unslugify(slug) {
  return slug
    .replace(/-/g, ' ') // Ganti dash dengan spasi
    .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi huruf pertama tiap kata
}
