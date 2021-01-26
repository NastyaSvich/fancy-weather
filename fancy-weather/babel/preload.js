document.body.onload = function pre() {
  setTimeout(() => {
    let preloader = document.getElementById('loader-wrapper');

    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 3000);
};

document.getElementById('rel').addEventListener('click', () => {
  let elem = document.getElementById('spinner');
  elem.classList.add('anim');
  setTimeout(() => {
    elem.classList.remove('anim');
  }, 10);
  izm = 1;
  nachalo = 0;
  getInformation(search);
}, false);