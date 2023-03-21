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

// export function genererTableauHoraires(openingHours) {
//   const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

//   const formattedHours = [];

//   for (let i = 0; i < weekdays.length; i++) {
//     const dayHours = openingHours.filter((o) => o.day === i + 1);

//     if (dayHours.length === 1) {
//       const { start, end } = dayHours[0];
//       formattedHours.push(`${weekdays[i]} ${start.slice(0, 2)}h${start.slice(2)} : ${end.slice(0, 2)}h${end.slice(2)}`);
//     }
//     else if (dayHours.length === 2) {
//       const { start, end } = dayHours[0];
//       const { start: start2, end: end2 } = dayHours[1];
//       formattedHours.push(`${weekdays[i]} ${start.slice(0, 2)}h${start.slice(2)} : ${end.slice(0, 2)}h${end.slice(2)} / ${start2.slice(0, 2)}h${start2.slice(2)} : ${end2.slice(0, 2)}h${end2.slice(2)}`);
//     }
//     else {
//       formattedHours.push(`${weekdays[i]} Fermé`);
//     }
//   }

//   return formattedHours;
// }

export function genererTableauHoraires(openingHours) {
  const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const formattedHours = [];

  for (let i = 0; i < weekdays.length; i++) {
    const dayHours = openingHours.filter((o) => o.day === i + 1);

    if (dayHours.length === 1) {
      const { start, end } = dayHours[0];
      formattedHours.push({
        day: weekdays[i],
        start: `${start.slice(0, 2)}:${start.slice(2)}`,
        end: `${end.slice(0, 2)}:${end.slice(2)}`,
      });
    }
    if (dayHours.length === 2) {
      const { start, end } = dayHours[0];
      const { start: start2, end: end2 } = dayHours[1];
      formattedHours.push({
        day: weekdays[i],
        start: `${start.slice(0, 2)}:${start.slice(2)}`,
        end: `${end.slice(0, 2)}:${end.slice(2)}`,
        start2: `${start2.slice(0, 2)}:${start2.slice(2)}`,
        end2: `${end2.slice(0, 2)}:${end2.slice(2)}`,
      });
    }
  }
  return formattedHours;
}

export function genererTableauHorairesGoogle(openingHours) {
  const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const formattedHours = [];

  for (let i = 0; i < weekdays.length; i++) {
    const dayHours = openingHours.periods.filter((o) => o.open.day === i);

    if (dayHours.length === 1) {
      const { time: start } = dayHours[0].open;
      const { time: end } = dayHours[0].close;
      formattedHours.push({
        day: weekdays[i],
        start: start,
        end: end,
      });
    }
    else if (dayHours.length === 2) {
      const { time: start1 } = dayHours[0].open;
      const { time: end1 } = dayHours[0].close;
      const { time: start2 } = dayHours[1].open;
      const { time: end2 } = dayHours[1].close;
      formattedHours.push({
        day: weekdays[i],
        start: start1,
        end: end1,
        start2: start2,
        end2: end2,
      });
    }
  }
  return formattedHours;
}

export function hasDecimal(number) {
  const test = /[.,]\d+/.test(number.toString());
  return test;
}
