window.onscroll = function() {myFunction()};

let progress = document.getElementById('progressbar')
let totalHeghit = document.body.scrollHeight - window.innerHeight;

var logout = document.querySelector(".logout")

var header = document.querySelector(".header");
var image = document.querySelector(".image_logo2");
var imagecontainer = document.querySelector(".image_container2");
var foto = document.querySelector(".header__container__foto");
var sticky = header.offsetTop;
var imagen = document.querySelector(".article__section__img__2");
var signiUP = document.querySelector(".signiUP");
var ver = imagen.offsetBottom;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.remove("header");
    header.classList.add("sticky__header");
    image.classList.remove("image_logo2");
    image.classList.add("image_logo");
    imagecontainer.classList.remove("image_container2");
    imagecontainer.classList.add("image_container");
    foto.classList.add("fotoPetit");
  } else {
    header.classList.add("header");
    header.classList.remove("sticky__header");
    image.classList.add("image_logo2")
    imagecontainer.classList.remove("image_container");
    imagecontainer.classList.add("image_container2");
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
  if (spanCount >= 50) {
    clearInterval(intervalId);
  }
}

intervalId = setInterval(createSpan, 1000);

window.addEventListener("load", ()=>{
  const loader = document.querySelector(".loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitioned", ()=>{
    document.body.removeChild("loader");
  })
})

signiUP.addEventListener('click', ()=>{
  console.log("Clicker")
  window.location.href = 'login.html';
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, get their information
    var uid = user.uid;
    var email = user.email;
    console.log(`${uid} y ${email}`)
    // ...
  } else {
    // User is signed out, redirect to login page
    console.log("El usuario no esta loggueado")
  }
});

logout.addEventListener("click", (e)=>{
 // logout.preventDefault();
  auth.signOut().then(()=>{
    console.log("sign out")
    window.location = "login.html";
  })
})