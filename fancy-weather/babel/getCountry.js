async function getCountry(prop) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${search}&language=${localStorage.langi}&key=${keyforcountry}`;
    const res = await fetch(url);
    const data = await res.json();
    Object.assign(prop, data);
    return data;
  } catch (err) {
    check();
  }

  return data;
}