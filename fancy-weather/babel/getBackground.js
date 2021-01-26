async function getBackground(times, pora) {
  try {
    const url3 = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query={${times} ${pora}}&client_id=${keyforphoto}`;
    const res3 = await fetch(url3);
    const data3 = await res3.json();
    console.log(`request for photo: ${url3}`);
    console.log(data3);
    nachalo = 1;
    let bgImg = new Image();

    bgImg.onload = function img() {
      document.querySelector('body').style.backgroundImage = `url(${bgImg.src})`;
    };

    bgImg.src = data3.urls.regular;
    document.querySelector('html').style.boxShadow = 'inset 0 0 0 50vw rgba(0,0,0,0.4)';
    document.getElementById('vivod_error').innerHTML = '';
  } catch (err) {
    document.querySelector('body').style.backgroundImage = "url('./img/bg-default.jpg')";
    document.querySelector('html').style.boxShadow = 'inset 0 0 0 50vw rgba(0,0,0,0.4)';

    if (localStorage.langi === 'ru') {
      document.getElementById('vivod_error').innerHTML = '<div id="str2">Ошибка с API для фото';
    }

    if (localStorage.langi === 'en') {
      document.getElementById('vivod_error').innerHTML = '<div id="str2">Error with API for photo';
    }

    if (localStorage.langi === 'be') {
      document.getElementById('vivod_error').innerHTML = '<div id="str2">Памылка з API для фота';
    }
  }
}