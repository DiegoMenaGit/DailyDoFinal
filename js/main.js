window.onscroll = function () {
  myFunction();
};

const formulario_dudas = document.getElementById("formulario_dudas");
const input_titulo = document.getElementById("form_titulo");
const input_desc = document.getElementById("textarea");
const db = firebase.firestore();

var calendario = document.querySelector(".calendario")

const titol = document.querySelector(".article__section__h1");

let progress = document.getElementById("progressbar");
let totalHeghit = document.body.scrollHeight - window.innerHeight;

var button__form = document.querySelector(".button__form");

var sidebar__button = document.querySelector(".sidebar__button");
var sidebar = document.querySelector(".sidebar");
var logout = document.querySelector(".logout");
var sleep = document.querySelector(".sleep");
var dailyPost = document.querySelector(".dailyPost");
var perfil = document.querySelector(".perfil");
var correr = document.querySelector(".correr")

var header = document.querySelector(".header");
var image = document.querySelector(".image_logo2");
var imagecontainer = document.querySelector(".image_container2");
var foto = document.querySelector(".header__container__foto");
var sticky = header.offsetTop;
var imagen = document.querySelector(".article__section__img__2");
var signiUP = document.querySelector(".signiUP");
var juegos = document.querySelector(".juegos");
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
    image.classList.add("image_logo2");
    imagecontainer.classList.remove("image_container");
    imagecontainer.classList.add("image_container2");
    foto.classList.remove("fotoPetit");
  }
  let progressHeight = (window.pageYOffset / totalHeghit) * 200;
  progress.style.height = progressHeight + "%";
}

const bubbles = document.querySelector(".bubbles");
let intervalId = null;

function createSpan() {
  const spanCount = bubbles.querySelectorAll("span").length;
  const span = document.createElement("span");
  const randomValue = Math.floor(Math.random() * 30) + 1;
  span.style.setProperty("--i", randomValue);
  bubbles.appendChild(span);
  if (spanCount >= 50) {
    clearInterval(intervalId);
  }
}

intervalId = setInterval(createSpan, 1000);

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitioned", () => {
    document.body.removeChild("loader");
  });
});

signiUP.addEventListener("click", () => {
  console.log("Clicker");
  window.location.href = "./html/login.html";
});
sleep.addEventListener("click", ()=>{
  window.location.href ="./html/sleep.html"
})
calendario.addEventListener("click", ()=>{
  window.location.href ="./html/calendario.html"
})
juegos.addEventListener("click", ()=>{
  window.location.href ="./html/menuJuegos.html"
})
dailyPost.addEventListener("click", ()=>{
  window.location.href = "./html/dailypost.html"
})
perfil.addEventListener("click",()=>{
  window.location.href ="./html/editarPerfil.html"
})
correr.addEventListener("click",()=>{
  window.location.href ="./html/correr.html"
})
firebase.auth().onAuthStateChanged(async function (user) {
  var nameuser = "Default";
  if (user) {
    // User is signed in, get their information
    var uid = user.uid;
    var email = user.email;
    console.log(`${uid} y ${email}`);

    signiUP.classList.add("novisible");
    logout.classList.remove("novisible");
    // Query the usuarios collection to find documents with matching userid
    const querySnapshot = await getUsers().where("userid", "==", uid).get();

    // Loop over the matching documents and log their data to console
    querySnapshot.forEach((doc) => {
      console.log(doc.data().username);
      nameuser = doc.data().username;
    });
    titol.innerHTML += ", " + nameuser;
    // ...
  } else {
    // User is signed out, redirect to login page
    console.log("El usuario no está logueado");
    signiUP.classList.remove("novisible");
    logout.classList.add("novisible");
  }
});

logout.addEventListener("click", (e) => {
  // logout.preventDefault();
  auth.signOut().then(() => {
    console.log("sign out");
    window.location = "./html/login.html";
  });
});

sidebar__button.addEventListener("click", (e) => {
  console.log("HOLA HAGO ALGO");
  sidebar.classList.toggle("closed");
});

const save_task = (titulo, descripcion) => {
  db.collection("dudas").doc().set({
    titulo,
    descripcion,
  });
  alert("Enviado con exito!!");
};

button__form.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("enviando...");

  const titulo_form = formulario_dudas["form_titulo"].value;
  const desc_form = formulario_dudas["textarea"].value;

  save_task(titulo_form, desc_form);

  input_titulo.value = "";
  input_desc.value = "";

  console.log(`${titulo_form} y ${desc_form}`);
});

const getTasks = () => db.collection("dudas").get();

const getUsers = () => db.collection("usuarios");

window.addEventListener("DOMContentLoaded", async (e) => {
  const querySnapshot = await getTasks();
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
});
