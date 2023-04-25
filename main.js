window.onscroll = function() {myFunction()};

let progress = document.getElementById('progressbar')
let totalHeghit = document.body.scrollHeight - window.innerHeight;


var header = document.querySelector(".header");
var foto = document.querySelector(".header__container__foto");
var sticky = header.offsetTop;
var imagen = document.querySelector(".article__section__img__2");
var ver = imagen.offsetBottom;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.remove("header");
    header.classList.add("sticky__header");
    foto.classList.add("fotoPetit");
  } else {
    header.classList.add("header");
    header.classList.remove("sticky__header");
    foto.classList.remove("fotoPetit");
  }
  let progressHeight = (window.pageYOffset / totalHeghit) * 200;
  progress.style.height = progressHeight + "%";
}

const bubbles = document.querySelector('.bubbles');
let intervalId = null;

function createSpan() {
  const spanCount = bubbles.querySelectorAll('span').length;
  const span = document.createElement('span');
  const randomValue = Math.floor(Math.random() * 30) + 1;
  span.style.setProperty('--i', randomValue);
  bubbles.appendChild(span);
  if (spanCount >= 30) {
    clearInterval(intervalId);
  }
}

intervalId = setInterval(createSpan, 1000);