async function getInformation(search) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=${localStorage.langi}&units=imperial&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    const promises = data.weather.map(getCountry);
    const prom = data.weather.map(getWeatherfor3days);
    await Promise.all(promises);
    await Promise.all(prom);
    let timeWithZone3 = data.weather[0].results[0].annotations.timezone.name;
    let formatterMes = {
      timeZone: timeWithZone3,
      month: 'numeric'
    };
    let formatterTime = {
      timeZone: timeWithZone3,
      hour12: false,
      hour: 'numeric'
    };
    const dateD3 = new Date();
    let datMes = dateD3.toLocaleString(localStorage.langi, formatterMes);
    let datTime = dateD3.toLocaleString('en', formatterTime);
    let da = datTime.replace(/[^+\d]/g, '');
    let num = Number(da);
    let pora;

    if (datMes === '12' || datMes === '1' || datMes === '2') {
      pora = 'winter';
    }

    if (datMes === '3' || datMes === '4' || datMes === '5') {
      pora = 'spring';
    }

    if (datMes === '6' || datMes === '7' || datMes === '8') {
      pora = 'summer';
    }

    if (datMes === '9' || datMes === '10' || datMes === '11') {
      pora = 'autumn';
    }

    let times;

    if (num >= 6) {
      times = 'morning';
    }

    if (num >= 12 && num < 18) {
      times = 'sunny day';
    }

    if (num >= 18 && num <= 24) {
      times = 'evening';
    }

    if (num < 6) {
      times = 'night';
    }

    if (nachalo === 0) {
      getBackground(times, pora);
    } else {
      setTimeout(() => {
        getBackground(times, pora);
      }, 3000);
    }

    if (izm === 0) {
      document.getElementById('main').style.opacity = 0;
      document.getElementById('main').style.transition = '0s';
      setTimeout(() => {
        document.getElementById('main').style.opacity = 1;
        document.getElementById('main').style.transition = '2s';
      }, 4000);
    }

    render(data);
    izm = 0;
    nachalo = 1;
  } catch (err) {
    check();
  }
}