export function UrlExists(url, imgPlaceholder) {
  const http = new XMLHttpRequest();
}

export function slugify(str) {
  let newStr;
  newStr = str.toLowerCase();
  newStr = newStr.trim();
  newStr = newStr.replace(/[^\w\s-]/g, '');
  newStr = newStr.replace(/[\s_-]+/g, '-');
  newStr = newStr.replace(/^-+|-+$/g, '');

  return newStr;
}
