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

function convertirHeure(chaineHeure) {
  const heures = chaineHeure.slice(0, 2);
  const minutes = chaineHeure.slice(2);
  const date = new Date();
  date.setHours(heures);
  date.setMinutes(minutes);
  const heureFormatee = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return heureFormatee;
}

export function genererTableauHoraires(horaires) {
  let html = '<table className=""><tbody className="">';
  console.log(horaires);
  const day = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  for (let i = 0; i < 7; i++) {
    html += `<tr className="">
              <th className="">${day[i]}</th>
              <td className="">
                <div className="">`;

    horaires.map((hour) => {
      if (hour.day === (i + 1)) {
        html += `<p className="">${convertirHeure(hour.start)} - ${convertirHeure(hour.end)}</p>`;
      }
    });

    html += `</div>
          </td>
        </tr>`;
  }

  html += '</tbody></table>';
  return html;
}
