const bubbles = document.querySelector('.bubbles');

var login = document.querySelector(".login")
var register = document.querySelector(".register")
var boton = document.querySelector(".boton")

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
        login.classList.add("section__div1")
        login.classList.remove("section__div1__transition")
        },1000)
    } else {
        login.classList.remove("section__div1")
        login.classList.add("section__div1__transition")
        setTimeout(function(){

        register.classList.add("section__div1")
        register.classList.remove("section__div1__transition")
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