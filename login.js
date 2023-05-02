const bubbles = document.querySelector('.bubbles');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

var active = false;

var mensaje = document.querySelector(".mensaje")

var login = document.querySelector(".login")
var register = document.querySelector(".register")
var boton = document.querySelector(".boton1__p")
var boton2 = document.querySelector(".boton")
var volver = document.querySelector(".volver")

var allInputs = document.querySelectorAll(".text_input")

var email = document.querySelector(".input_email_register");
var username = document.querySelector(".input_username_register");
var contrasenya = document.querySelector(".input_password_register");
var repetirContrasenya = document.querySelector(".input_repeatpassword_register")

var email2 = document.querySelector(".input_email")
var username2 = document.querySelector(".username")
var contrasenya2 = document.querySelector(".password")

var logout = document.querySelector(".logout")

login.classList.add("section__div1")
register.classList.add("section__div1__transition")

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

intervalId = setInterval(createSpan, 200);
var clickCount = 0

boton.addEventListener('click', () => {
    clickCount++;
    if (clickCount % 2 === 0) {
        register.classList.remove("section__div1")
        register.classList.add("section__div1__transition")
        setTimeout(function(){
          active = false;
          boton.innerHTML = "Register"
          login.classList.add("section__div1")
          login.classList.remove("section__div1__transition")
          allInputs.forEach(input => {
            input.value = "";
          });
        },1000)
    } else {
        login.classList.remove("section__div1")
        login.classList.add("section__div1__transition")
        setTimeout(function(){
          active = true;
          boton.innerHTML = "Login"
          register.classList.add("section__div1")
          register.classList.remove("section__div1__transition")
          allInputs.forEach(input => {
            input.value = "";
          });
        },1000)
    }
});

setInterval(function() {
    if (register.classList.contains('section__div1') && login.classList.contains('section__div1')) {
        bubbles.classList.add("angry")
    } else {
        bubbles.classList.remove("angry")
    }
  }, 1000);

  window.addEventListener("load", ()=>{
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", ()=>{
      document.body.removeChild("loader");
    })
  })

volver.addEventListener('click', ()=>{
    console.log("Clicker")
    window.location.href = 'index.html';
})





boton2.addEventListener("click", (e)=>{
  if(active){
    console.log("estas en el register")
  console.log(email.value, username.value, contrasenya.value, repetirContrasenya.value)
  if(contrasenya.value == repetirContrasenya.value){
  auth
      .createUserWithEmailAndPassword(email.value, contrasenya.value)
      .then(userCredential => {
        // clear the form !!!!
        allInputs.forEach(input => {
          input.value = "";
        });
        // irse a otra pagina !!!!
        console.log("sign-up")
      })
  }
  else{
    //alert("¡¡¡Las contraseñas NO coinciden!!!")
    modal.style.display = 'flex';
    modalContent.style.display = 'flex';
    modalContent.innerHTML = "¡¡¡Las contraseñas NO coinciden!!!";
  }
}
else{
  console.log("estas en el login")
  console.log(email2.value, username2.value, contrasenya2.value)
  auth
      .signInWithEmailAndPassword(email2.value, contrasenya2.value)
      .then(userCredential => {
        // clear the form !!!!
        allInputs.forEach(input => {
          input.value = "";
        });
        // irse a otra pagina !!!!
        console.log("sign-in")
      })
}
})
/*
logout.addEventListener("click", (e)=>{
  logout.preventDefault();
  auth.signOut().then(()=>{
    console.log("sign out")
  })
})
*/



modal.addEventListener('click', function(e) {
  if (e.target === modal || e.target === modalContent) {
    modal.style.display = 'none';
    modalContent.style.display = 'none';
  }
});