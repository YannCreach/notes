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

export function convertDate(inputFormat) {
  const d = new Date(inputFormat);
  let day = d.getDate().toString();
  let month = (d.getMonth() + 1).toString();
  const year = d.getFullYear().toString();

  if (day.length < 2) {
    day = `0${day}`;
  }

  if (month.length < 2) {
    month = `0${month}`;
  }

  return `${day}/${month}/${year}`;
}
