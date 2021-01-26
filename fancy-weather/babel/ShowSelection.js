function ShowSelection() {
  const input = document.querySelector('input');

  if (input.value.length === 0) {
    if (localStorage.langi === 'ru') {
      document.getElementById('vivod').innerHTML = '<div id="str1">Введите город!</div>';
    }

    if (localStorage.langi === 'en') {
      document.getElementById('vivod').innerHTML = '<div id="str1">Enter city!</div>';
    }

    if (localStorage.langi === 'be') {
      document.getElementById('vivod').innerHTML = '<div id="str1">Увядзіце горад!</div>';
    }
  } else if (isCyrillic(input.value) === true) {
    const request1 = new XMLHttpRequest();
    const yandex1 = `https://translate.yandex.net/api/v1.5/tr.json/detect?hint=be,ru&text=${input.value}&key=${keyforyandex}`;
    request1.open('GET', yandex1, true);

    request1.onload = function load() {
      if (request1.status >= 200 && request1.status < 400) {
        const zapros1 = JSON.parse(request1.responseText);
        const request = new XMLHttpRequest();
        const yandex = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyforyandex}&text=${input.value}&lang=${zapros1.lang}-en`;
        request.open('GET', yandex, true);

        request.onload = function load() {
          if (request.status >= 200 && request.status < 400) {
            const zapros = JSON.parse(request.responseText);
            search = zapros.text;
            page = 1;
            getInformation(search);

            if (localStorage.langi === 'en') {
              document.getElementById('vivod').innerHTML = `<div id="str1">Showing results for "${search}/${input.value}"`;
            }

            if (localStorage.langi === 'be') {
              document.getElementById('vivod').innerHTML = `<div id="str1">Паказаны вынікі для "${search}/${input.value}"`;
            }

            if (localStorage.langi === 'ru') {
              document.getElementById('vivod').innerHTML = `<div id="str1">Показаны результаты для "${search}/${input.value}"`;
            }
          }
        };

        request.send();
      } else {
        check();
      }
    };

    if (navigator.onLine === false) {
      check();
    } else {
      request1.send();
      document.getElementById('vivod_error').innerHTML = '';
    }
  } else {
    search = input.value;
    getInformation(search);
    document.getElementById('vivod').innerHTML = '';
  }
}