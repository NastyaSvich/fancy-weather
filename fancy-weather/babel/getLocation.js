async function getLocation() {
  try {
    const url4 = `https://ipinfo.io/json?token=${keyforlocation}`;
    const res4 = await fetch(url4);
    const data4 = await res4.json();
    search = data4.city;
    getInformation(search);
  } catch (err) {
    check();
  }
}