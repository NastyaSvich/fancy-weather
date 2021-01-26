async function getWeatherfor3days(days3) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&lang=${localStorage.langi}&units=imperial&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    Object.assign(days3, data);
    return data;
  } catch (err) {
    check();
  }

  return data;
}