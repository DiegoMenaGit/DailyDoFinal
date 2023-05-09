var mes = document.querySelector(".mes");

var volver = document.querySelector(".volver");
var mensaje = document.querySelector(".mensaje")
var modal = document.querySelector(".modal")
var modalContent = document.querySelector(".modal-content")
var fechaActual = new Date();
var mesActual = fechaActual.getMonth() +1;// guardar el mes actual en una variable
fechaActual.setMonth(mesActual); // sumar un mes a la fecha actual
fechaActual.setDate(0); // establecer la fecha al último día del mes anterior
var ultimoDiaMes = fechaActual.getDate();
var primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
var primerDiaSemana = primerDiaMes.getDay(); 

var contadorDias= 0;
var clicker = 1;
var titulo_mes = document.querySelector(".titulo_mes");
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var activo = true;
var botonizq = document.querySelector(".boton1")
var botonder = document.querySelector(".boton2")
creardias();
conseguirMes();

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
  });

volver.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

document.addEventListener('mousemove', e => {
    
    modalContent.addEventListener("mouseenter", (e)=>{
        console.log("dentro")
    })
    modalContent.addEventListener("mouseleave", (e)=>{
        console.log("fuera")
        modalContent.style.setProperty("rotate", "360");
        modalContent.style.setProperty("transform", "scale(0) rotate(360deg)");
        activo = true;
    })
    if(activo){
    const modalWidth = modalContent.offsetWidth;
    const modalHeight = modalContent.offsetHeight;
    const leftOffset = (modalWidth / 2);
    const topOffset = (modalHeight / 2);
    modalContent.style.left = (e.clientX - leftOffset) + 'px';
    modalContent.style.top = (e.clientY - topOffset) + 'px';
    }
});

function conseguirMes(){
    console.log(mesActual)
    if(mesActual >=13){
        mesActual = fechaActual.getMonth() +1;
    }
    else if (mesActual <= 0){
        mesActual = fechaActual.getMonth() +1;
    }
    titulo_mes.innerHTML = meses[mesActual - 1];
}



botonder.addEventListener("click", (e)=>{
    clicker++
    contadorDias= 0;
     mes.innerHTML = "";
     fechaActual = new Date()
    mesActual = fechaActual.getMonth()  + clicker;// guardar el mes actual en una variable
    fechaActual.setMonth(mesActual); // sumar un mes a la fecha actual
    fechaActual.setDate(0); // establecer la fecha al último día del mes anterior
    ultimoDiaMes = fechaActual.getDate();
    primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    primerDiaSemana = primerDiaMes.getDay(); 
    conseguirMes();
    creardias();
})

botonizq.addEventListener("click", (e)=>{
    clicker--
    contadorDias= 0;
     mes.innerHTML = "";
     fechaActual = new Date()
    mesActual = fechaActual.getMonth()  + clicker;// guardar el mes actual en una variable
    fechaActual.setMonth(mesActual); // sumar un mes a la fecha actual
    fechaActual.setDate(0); // establecer la fecha al último día del mes anterior
    ultimoDiaMes = fechaActual.getDate();
    primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    primerDiaSemana = primerDiaMes.getDay(); 
    
    conseguirMes();
    creardias();
})

/*
function creardias(){
    //console.log("dia de la semana"+primerDiaSemana)
    for(let i = 1; i <= 40; i++){
        if(primerDiaSemana == 0){
            primerDiaSemana = 7
        }
        if(i < primerDiaSemana){
            //console.log("hola")
            mes.innerHTML += `<div class="dia"><p class="dia_p"></p></div>`;
        }
        else{
            contadorDias++
            if(contadorDias > ultimoDiaMes){
              //  console.log("ya esta")
            }
            else{
                mes.innerHTML += `<div class="dia"><p class="dia_p">${contadorDias}</p></div>`;
            }
        }
    }
    
}*/

function creardias(){
    for(let i = 1; i <= 40; i++){
      if(primerDiaSemana == 0){
        primerDiaSemana = 7
      }
      if(i < primerDiaSemana){
        mes.innerHTML += `<div class="dia"><p class="dia_p"></p></div>`;
      }
      else{
        contadorDias++
        if(contadorDias > ultimoDiaMes){
          //console.log("ya esta")
        }
        else{
          const diaElement = document.createElement("div"); // create the day element
          const diaPElement = document.createElement("p"); // create the paragraph element inside the day element
          diaPElement.innerText = contadorDias; // set the day number as the text content of the paragraph element
          diaElement.appendChild(diaPElement); // append the paragraph element to the day element
          diaElement.classList.add("dia"); // add the "dia" class to the day element
          diaElement.addEventListener("click", (e) => { // add a click event listener to the day element
            console.log("Clicked on day", e.target.innerText);
            mensaje.innerHTML = (e.target.innerHTML)
            modalContent.style.setProperty("transform", "scale(1)")
            modalContent.style.setProperty("z-index", "800");
            activo = false
          });
          mes.appendChild(diaElement); // append the day element to the month element
        }
      }
    }
  }

/*modal2.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal2.style.display = "none";
    }
});*/