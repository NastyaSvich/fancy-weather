function check() {
  if (localStorage.langi === 'ru') {
    document.getElementById('vivod').innerHTML = '<div id="str3">Ошибка!</div>';
  }
  if (localStorage.langi === 'en') {
    document.getElementById('vivod').innerHTML = '<div id="str3">Error!</div>';
  }
  if (localStorage.langi === 'be') {
    document.getElementById('vivod').innerHTML = '<div id="str3">Памылка!</div>';
  }
}

const isCyrillic = function valid(text) {
  return /[а-я]/i.test(text);
};

document.getElementById('search')
  .addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById('send').click();
    }
  });
