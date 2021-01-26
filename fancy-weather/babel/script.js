let search;

if (localStorage.deggr === 'NaN' || localStorage.deggr === undefined) {
  localStorage.deggr = '1';
}

if (localStorage.langi === undefined || localStorage.langi === null) {
  localStorage.langi = 'en';
}

const key = '1cc01ca361fe5e04052627ee0e5da9e4';
const keyforcountry = '36422aa74b394565b6986a9580aa7adc';
const keyforphoto = 'vq8lnQEX9y132crgvdx1bl21njRBdZGBvgQ-6nP02Os';
/* mdeEEEumsZg-zImSMgtW1r9jlXwI2ryNQE43LEjopMo /
T8Z4eelmsmd4y5HcbRKTYrUOuWtKSJWIPQ1dPRv7DYY / vq8lnQEX9y132crgvdx1bl21njRBdZGBvgQ-6nP02Os */

const keyforlocation = 'c3bffbd6af0298'; // 71b76733a136bd / c3bffbd6af0298

const keyformap = 'pk.eyJ1IjoibmFzdHlhZHJha29zaGEiLCJhIjoiY2thb2J0MDgwMGRibTJ4bnlqbnBqMjc0eCJ9._LIREwW4EyAU3LZEXid95Q';
const keyforyandex = 'trnsl.1.1.20200508T154724Z.4134a073e1a23924.bbd86509741c39b4b85fa584bacbd660016228e7';
let timerId;
let iconNum;
let izm = 0;
let nachalo = 0;
let langi = 'ru';
window.addEventListener('load', () => {
  if (localStorage.langi === 'ru') {
    document.getElementById('selectBox').options[0].selected = true;
    document.querySelector('.b1').classList.remove('noactive');
    document.querySelector('.b2').classList.add('noactive');
    document.querySelector('.b3').classList.add('noactive');
  }

  if (localStorage.langi === 'en') {
    document.getElementById('selectBox').options[1].selected = true;
    document.querySelector('.b2').classList.remove('noactive');
    document.querySelector('.b1').classList.add('noactive');
    document.querySelector('.b3').classList.add('noactive');
  }

  if (localStorage.langi === 'be') {
    document.getElementById('selectBox').options[2].selected = true;
    document.querySelector('.b3').classList.remove('noactive');
    document.querySelector('.b2').classList.add('noactive');
    document.querySelector('.b1').classList.add('noactive');
  }

  getLocation();
});