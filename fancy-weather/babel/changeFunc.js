function changeFunc() {
  let selectBox = document.getElementById('selectBox');
  let selectedValue = selectBox.options[selectBox.selectedIndex].value;

  if (selectedValue === '1') {
    localStorage.langi = 'ru';
    document.querySelector('.b1').classList.remove('noactive');
    document.querySelector('.b2').classList.add('noactive');
    document.querySelector('.b3').classList.add('noactive');
    document.getElementById('vivod').innerHTML = `<div id="str1">Показаны результаты для "${search}/${document.querySelector('input').value}"`;
  }

  if (selectedValue === '2') {
    localStorage.langi = 'en';
    document.querySelector('.b2').classList.remove('noactive');
    document.querySelector('.b1').classList.add('noactive');
    document.querySelector('.b3').classList.add('noactive');
    document.getElementById('vivod').innerHTML = `<div id="str1">Showing results for "${search}/${document.querySelector('input').value}"`;
  }

  if (selectedValue === '3') {
    localStorage.langi = 'be';
    document.querySelector('.b3').classList.remove('noactive');
    document.querySelector('.b2').classList.add('noactive');
    document.querySelector('.b1').classList.add('noactive');
    document.getElementById('vivod').innerHTML = `<div id="str1">Паказаны вынікі для "${search}/${document.querySelector('input').value}"`;
  }

  getInformation(search);
}