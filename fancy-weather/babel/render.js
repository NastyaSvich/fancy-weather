function render(data) {
  try {
    if (timerId) {
      window.clearInterval(timerId);
    }

    if (localStorage.langi === 'be') {
      let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
      let formatter = {
        timeZone: timeWithZone,
        weekday: 'short',
        day: '2-digit',
        month: 'long'
      };
      const dateD = new Date();
      const dat = dateD.toLocaleString('ru', formatter);
      const datKon = dat[0].toUpperCase() + dat.slice(1).replace(/[,]/g, '');
      const request22 = new XMLHttpRequest();
      const yandex22 = `https://translate.yandex.net/api/v1.5/tr.json/detect?hint=en,ru&text=${datKon}&key=${keyforyandex}`;
      request22.open('GET', yandex22, true);

      request22.onload = function load() {
        if (request22.status >= 200 && request22.status < 400) {
          const zapros22 = JSON.parse(request22.responseText);
          const request23 = new XMLHttpRequest();
          const yandex23 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${datKon}&lang=${zapros22.lang}-be`;
          request23.open('GET', yandex23, true);

          request23.onload = function load() {
            if (request23.status >= 200 && request23.status < 400) {
              const zapros23 = JSON.parse(request23.responseText);
              let aga2 = zapros23.text;
              document.querySelector('.weather-data-cluster__date-time').innerHTML = `${aga2}<span class="updatetime"></span>`;
              timerId = setInterval(() => {
                let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
                let formatter = {
                  timeZone: timeWithZone,
                  hour12: false,
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                };
                const dateD = new Date();
                let dat = dateD.toLocaleString('ru', formatter);
                document.querySelector('.updatetime').innerHTML = `&nbsp;${dat}`;
              }, 1000);
            } else {
              check();
            }
          };

          request23.send();
        } else {
          check();
        }
      };

      request22.send();
    }

    if (localStorage.langi === 'en') {
      let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
      let formatter = {
        timeZone: timeWithZone,
        weekday: 'short',
        day: '2-digit',
        month: 'long'
      };
      const dateD = new Date();
      const dat = dateD.toLocaleString('ru', formatter);
      const datKon = dat[0].toUpperCase() + dat.slice(1).replace(/[,]/g, '');
      const request8 = new XMLHttpRequest();
      const yandex8 = `https://translate.yandex.net/api/v1.5/tr.json/detect?hint=be,ru&text=${datKon}&key=${keyforyandex}`;
      request8.open('GET', yandex8, true);

      request8.onload = function load() {
        if (request8.status >= 200 && request8.status < 400) {
          const zapros8 = JSON.parse(request8.responseText);
          const request9 = new XMLHttpRequest();
          const yandex9 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${datKon}&lang=${zapros8.lang}-en`;
          request9.open('GET', yandex9, true);

          request9.onload = function load() {
            if (request9.status >= 200 && request9.status < 400) {
              const zapros9 = JSON.parse(request9.responseText);
              let aga1 = zapros9.text;
              document.querySelector('.weather-data-cluster__date-time').innerHTML = `${aga1}<span class="updatetime"></span>`;
              timerId = setInterval(() => {
                let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
                let formatter = {
                  timeZone: timeWithZone,
                  hour12: false,
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                };
                const dateD = new Date();
                let dat = dateD.toLocaleString('ru', formatter);
                document.querySelector('.updatetime').innerHTML = `&nbsp;${dat}`;
              }, 1000);
            } else {
              check();
            }
          };

          request9.send();
        } else {
          check();
        }
      };

      request8.send();
    }

    if (localStorage.langi === 'ru') {
      timerId = setInterval(() => {
        let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
        let formatter = {
          timeZone: timeWithZone,
          weekday: 'short',
          day: '2-digit',
          hour12: false,
          month: 'long',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        const dateD = new Date();
        const dat = dateD.toLocaleString('ru', formatter);
        const datKon = dat[0].toUpperCase() + dat.slice(1).replace(/[,]/g, '');
        document.querySelector('.weather-data-cluster__date-time').innerHTML = datKon;
      }, 1000);
    }

    mapboxgl.accessToken = `${keyformap}`;
    let start = [`${data.weather[0].results[0].geometry.lng}`, `${data.weather[0].results[0].geometry.lat}`];
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: start,
      zoom: 10
    });
    let marker = new mapboxgl.Marker().setLngLat([`${data.weather[0].results[0].geometry.lng}`, `${data.weather[0].results[0].geometry.lat}`]).addTo(map);
    map.addControl(new mapboxgl.NavigationControl());
    map.flyTo({
      center: start,
      zoom: 11,
      speed: 0.3,
      curve: 1,

      easing(t) {
        return t;
      }

    });
    document.querySelector('.button--f').addEventListener('click', () => {
      document.querySelector('.button--f').classList.remove('noactive');
      document.querySelector('.button--c').classList.add('noactive');
      document.querySelector('.weather-data-cluster__temperature-today').innerHTML = `${Math.round(data.main.temp)}<span class="font">&deg;</span>`;
      document.querySelector('.temforday1').innerHTML = `${Math.round(data.weather[0].list[8].main.temp)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday2').innerHTML = `${Math.round(data.weather[0].list[16].main.temp)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday3').innerHTML = `${Math.round(data.weather[0].list[24].main.temp)}<span class="font1">&deg;</span>`;

      if (localStorage.langi === 'ru') {
        document.querySelector('.temp').innerHTML = `Чувствуется как: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      if (localStorage.langi === 'en') {
        document.querySelector('.temp').innerHTML = `Feels like: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      if (localStorage.langi === 'be') {
        document.querySelector('.temp').innerHTML = `Адчуваецца як: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      localStorage.deggr = 2;
    });
    document.querySelector('.button--c').addEventListener('click', () => {
      document.querySelector('.button--c').classList.remove('noactive');
      document.querySelector('.button--f').classList.add('noactive');
      document.querySelector('.weather-data-cluster__temperature-today').innerHTML = `${Math.round((data.main.temp - 32) * 5 / 9)}<span class="font">&deg;</span>`;
      document.querySelector('.temforday1').innerHTML = `${Math.round((data.weather[0].list[8].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday2').innerHTML = `${Math.round((data.weather[0].list[16].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday3').innerHTML = `${Math.round((data.weather[0].list[24].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;

      if (localStorage.langi === 'ru') {
        document.querySelector('.temp').innerHTML = `Чувствуется как: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      if (localStorage.langi === 'en') {
        document.querySelector('.temp').innerHTML = `Feels like: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      if (localStorage.langi === 'be') {
        document.querySelector('.temp').innerHTML = `Адчуваецца як: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      localStorage.deggr = 1;
    });
    let weekday;

    function belar(week1) {
      switch (week1) {
        case 'Воскресенье':
          week1 = 'Нядзеля';
          break;

        case 'Понедельник':
          week1 = 'Панядзелак';
          break;

        case 'Вторник':
          week1 = 'Аўторак';
          break;

        case 'Среда':
          week1 = 'Серада';
          break;

        case 'Четверг':
          week1 = 'Чацвер';
          break;

        case 'Пятница':
          week1 = 'Пятніца';
          break;

        case 'Суббота':
          week1 = 'Субота';
          break;

        default:
          break;
      }

      weekday = week1;
      return weekday;
    }

    function engl(week1) {
      switch (week1) {
        case 'Воскресенье':
          week1 = 'Sunday';
          break;

        case 'Понедельник':
          week1 = 'Monday';
          break;

        case 'Вторник':
          week1 = 'Tuesday';
          break;

        case 'Среда':
          week1 = 'Wednesday';
          break;

        case 'Четверг':
          week1 = 'Thursday';
          break;

        case 'Пятница':
          week1 = 'Friday';
          break;

        case 'Суббота':
          week1 = 'Saturday';
          break;

        default:
          break;
      }

      weekday = week1;
      return weekday;
    }

    let daysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let timeWithZone = data.weather[0].results[0].annotations.timezone.name;
    const dateD = new Date();
    let formatterY = {
      timeZone: timeWithZone,
      year: 'numeric'
    };
    let formatterM = {
      timeZone: timeWithZone,
      month: '2-digit'
    };
    let formatterD = {
      timeZone: timeWithZone,
      day: '2-digit'
    };
    let dat3 = `${dateD.toLocaleString(localStorage.langi, formatterY)}, `;
    dat3 += `${dateD.toLocaleString(localStorage.langi, formatterM)}, `;
    dat3 += dateD.toLocaleString(localStorage.langi, formatterD);
    let date = new Date(dat3);
    let result = date.getDay();
    result += 1;

    if (result === 7) {
      result = 0;
    }

    let nedela = daysRu[result];

    if (localStorage.langi === 'be') {
      belar(nedela);
      nedela = weekday;
    }

    if (localStorage.langi === 'en') {
      engl(nedela);
      nedela = weekday;
    }

    iconNum = data.weather[0].list[8].weather[0].icon;
    icon(iconNum);
    document.querySelector('.d1').innerHTML = `<p class="forecast__day">${nedela}</p>
<p class="temforday1 forecast__temperature"></p>
<img class="forecast__icon" alt="day" src="${icons}">`;
    result += 1;

    if (result === 7) {
      result = 0;
    }

    nedela = daysRu[result];

    if (localStorage.langi === 'be') {
      belar(nedela);
      nedela = weekday;
    }

    if (localStorage.langi === 'en') {
      engl(nedela);
      nedela = weekday;
    }

    iconNum = data.weather[0].list[16].weather[0].icon;
    icon(iconNum);
    document.querySelector('.d2').innerHTML = `<p class="forecast__day">${nedela}</p>
<p class="temforday2 forecast__temperature"></p>
<img class="forecast__icon" alt="day" src="${icons}">`;
    result += 1;

    if (result === 7) {
      result = 0;
    }

    nedela = daysRu[result];

    if (localStorage.langi === 'be') {
      belar(nedela);
      nedela = weekday;
    }

    if (localStorage.langi === 'en') {
      engl(nedela);
      nedela = weekday;
    }

    iconNum = data.weather[0].list[24].weather[0].icon;
    icon(iconNum);
    document.querySelector('.d3').innerHTML = `<p class="forecast__day">${nedela}</p>
<p class="temforday3 forecast__temperature"></p>
<img class="forecast__icon" alt="day" src="${icons}">`;
    iconNum = data.weather[0].icon;
    icon(iconNum);
    document.querySelector('.for-pictures').innerHTML = `<img class="weather-data-cluster__weather-icon" alt="partly-cloudy-day" src="${icons}">`;
    document.querySelector('.weather-data-cluster__weather-data').innerHTML = `<p class = "dscr"></p>
     <p class = "temp"></p>
     <p class = "wind"></p>
     <p class = "humidity"></p>`;
    let lat = `${data.weather[0].results[0].annotations.DMS.lat.split('\'')[0]}' ${data.weather[0].results[0].annotations.DMS.lat.slice(-1)}`;
    let lng = `${data.weather[0].results[0].annotations.DMS.lng.split('\'')[0]}' ${data.weather[0].results[0].annotations.DMS.lng.slice(-1)}`;
    document.querySelector('.map-cluster__coordinates').innerHTML = `<p class = "lat"></p>
      <p class = "lng"></p>`;

    if (localStorage.deggr === '1') {
      document.querySelector('.weather-data-cluster__temperature-today').innerHTML = `${Math.round((data.main.temp - 32) * 5 / 9)}<span class="font">&deg;</span>`;
      document.querySelector('.temforday1').innerHTML = `${Math.round((data.weather[0].list[8].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday2').innerHTML = `${Math.round((data.weather[0].list[16].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday3').innerHTML = `${Math.round((data.weather[0].list[24].main.temp - 32) * 5 / 9)}<span class="font1">&deg;</span>`;
      document.querySelector('.button--c').classList.remove('noactive');
      document.querySelector('.button--f').classList.add('noactive');
    }

    if (localStorage.deggr === '2') {
      document.querySelector('.weather-data-cluster__temperature-today').innerHTML = `${Math.round(data.main.temp)}<span class="font">&deg;</span>`;
      document.querySelector('.temforday1').innerHTML = `${Math.round(data.weather[0].list[8].main.temp)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday2').innerHTML = `${Math.round(data.weather[0].list[16].main.temp)}<span class="font1">&deg;</span>`;
      document.querySelector('.temforday3').innerHTML = `${Math.round(data.weather[0].list[24].main.temp)}<span class="font1">&deg;</span>`;
      document.querySelector('.button--c').classList.add('noactive');
      document.querySelector('.button--f').classList.remove('noactive');
    }

    if (localStorage.langi === 'ru') {
      document.querySelector('.dscr').textContent = data.weather[0].description;
      const request0 = new XMLHttpRequest();
      const yandex0 = `https://translate.yandex.net/api/v1.5/tr.json/detect?hint=en,be&text=${data.name}&key=${keyforyandex}`;
      request0.open('GET', yandex0, true);

      request0.onload = function load() {
        if (request0.status >= 200 && request0.status < 400) {
          const zapros0 = JSON.parse(request0.responseText);
          const request11 = new XMLHttpRequest();
          const yandex11 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${data.name}&lang=${zapros0.lang}-ru`;
          request11.open('GET', yandex11, true);

          request11.onload = function load() {
            if (request11.status >= 200 && request11.status < 400) {
              const zapros11 = JSON.parse(request11.responseText);
              document.querySelector('.weather-data-cluster__location').textContent = `${zapros11.text}, ${data.weather[0].results[0].components.country}`;
            }
          };

          request11.send();
        } else {
          check();
        }
      };

      request0.send();
      document.querySelector('.wind').innerHTML = `Ветер: ${data.wind.speed} м/с`;
      document.querySelector('.humidity').innerHTML = `Влажность: ${data.main.humidity}%`;
      document.querySelector('.lat').innerHTML = `Широта: ${lat}`;
      document.querySelector('.lng').innerHTML = `Долгота: ${lng}`;

      if (localStorage.deggr === '1') {
        document.querySelector('.temp').innerHTML = `Чувствуется как: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      if (localStorage.deggr === '2') {
        document.querySelector('.temp').innerHTML = `Чувствуется как: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      document.getElementById('search').placeholder = 'Поиск города';
      document.getElementById('send').textContent = 'Поиск';
    }

    if (localStorage.langi === 'en') {
      document.querySelector('.dscr').textContent = data.weather[0].description;
      document.querySelector('.weather-data-cluster__location').textContent = `${data.name}, ${data.weather[0].results[0].components.country}`;
      document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} m/s`;
      document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.lat').innerHTML = `Latitude: ${lat}`;
      document.querySelector('.lng').innerHTML = `Longitude: ${lng}`;

      if (localStorage.deggr === '1') {
        document.querySelector('.temp').innerHTML = `Feels like: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      if (localStorage.deggr === '2') {
        document.querySelector('.temp').innerHTML = `Feels like: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      document.getElementById('search').placeholder = 'Search city';
      document.getElementById('send').textContent = 'Search';
    }

    if (localStorage.langi === 'be') {
      let user = {
        name: `${data.name}`,
        descr: `${data.weather[0].description}`
      };
      const request2 = new XMLHttpRequest();
      const yandex2 = `https://translate.yandex.net/api/v1.5/tr.json/detect?hint=en,ru&text=${user}&key=${keyforyandex}`;
      request2.open('GET', yandex2, true);

      request2.onload = function load() {
        if (request2.status >= 200 && request2.status < 400) {
          const zapros2 = JSON.parse(request2.responseText);
          const request3 = new XMLHttpRequest();
          const request4 = new XMLHttpRequest();
          const yandex3 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${user.name}&lang=${zapros2.lang}-be`;
          const yandex4 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${user.descr}&lang=${zapros2.lang}-be`;
          request3.open('GET', yandex3, true);
          request4.open('GET', yandex4, true);

          request3.onload = function load() {
            if (request3.status >= 200 && request3.status < 400) {
              const zapros3 = JSON.parse(request3.responseText);
              document.querySelector('.weather-data-cluster__location').textContent = `${zapros3.text}, ${data.weather[0].results[0].components.country}`;
            } else {
              check();
            }
          };

          request3.send();

          request4.onload = function load() {
            if (request4.status >= 200 && request4.status < 400) {
              const zapros4 = JSON.parse(request4.responseText);
              document.querySelector('.dscr').textContent = zapros4.text;
            } else {
              check();
            }
          };

          request4.send();
        } else {
          check();
        }
      };

      request2.send();
      document.querySelector('.wind').innerHTML = `Вецер: ${data.wind.speed} м/с`;
      document.querySelector('.humidity').innerHTML = `Вільготнасць: ${data.main.humidity}%`;
      document.querySelector('.lat').innerHTML = `Шырата: ${lat}`;
      document.querySelector('.lng').innerHTML = `Даўгата: ${lng}`;

      if (localStorage.deggr === '1') {
        document.querySelector('.temp').innerHTML = `Адчуваецца як: ${`${Math.round((data.main.feels_like - 32) * 5 / 9)}&deg;`}`;
      }

      if (localStorage.deggr === '2') {
        document.querySelector('.temp').innerHTML = `Адчуваецца як: ${`${Math.round(data.main.feels_like)}&deg;`}`;
      }

      document.getElementById('search').placeholder = 'Пошук горада';
      document.getElementById('send').textContent = 'Пошук';
    }
  } catch (err) {
    check();
  }
}