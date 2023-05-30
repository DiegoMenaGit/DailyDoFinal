var mes = document.querySelector(".mes");

var db = firebase.firestore();
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
var fechaString = fechaActual.toISOString().substring(0, 8);
creardias(fechaString);
var year = fechaString.substring(0, 4);
conseguirMes(year);

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
    modalContent.addEventListener("mouseleave", (e)=>{
        activo = true;
    })
    if(activo){
      modalContent.classList.remove(e.target.classList[1]);
      modalContent.style.setProperty("rotate", "360");
      modalContent.style.setProperty("transform", "scale(0) rotate(360deg)");
      const modalWidth = modalContent.offsetWidth;
      const modalHeight = modalContent.offsetHeight;
      const leftOffset = (modalWidth / 2);
      const topOffset = (modalHeight / 2);
      modalContent.style.left = (e.clientX - leftOffset) + 'px';
      modalContent.style.top = (e.clientY - topOffset) + 'px';
      }
});

function conseguirMes(year){
    console.log(mesActual)
    if(mesActual >=13){
        mesActual = fechaActual.getMonth() +1;
    }
    else if (mesActual <= 0){
        mesActual = fechaActual.getMonth() +1;
    }
    titulo_mes.innerHTML = meses[mesActual - 1] + `, ${year}`;
}



botonder.addEventListener("click", (e)=>{
    swipeRight();
})

function swipeRight(){
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

    fechaString = fechaActual.toISOString().substring(0, 8);
    year = fechaString.substring(0, 4);
    conseguirMes(year);
    creardias(fechaString);
}

botonizq.addEventListener("click", (e)=>{
    swipeLeft();
})

function swipeLeft(){
  clicker--
  contadorDias= 0;
   mes.innerHTML = "";
   fechaActual = new Date()
  mesActual = fechaActual.getMonth() + clicker;// guardar el mes actual en una variable
  fechaActual.setMonth(mesActual); // sumar un mes a la fecha actual
  fechaActual.setDate(0); // establecer la fecha al último día del mes anterior
  ultimoDiaMes = fechaActual.getDate();
  primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  primerDiaSemana = primerDiaMes.getDay();

  fechaString = fechaActual.toISOString().substring(0, 8);
  year = fechaString.substring(0, 4);
  conseguirMes(year);
  creardias(fechaString);
}

async function onAuthStateChangedHandler(user, fechadeldia, elemento, diaPOcultoElement) {
   // console.log(fechadeldia);
    if (user) {
      var uid = user.uid;
      var email = user.email;
      //console.log(`${uid} y ${email}`);
      var fechaFirebase = new Date();
      fechaString = fechaFirebase.toISOString().substring(0, 8);
      const querySnapshot = await getDormir().where("userid", "==", uid).where("fecha", "==", fechadeldia).get();
      querySnapshot.forEach((doc) => {
        var fecha = doc.data().fecha;
        var horas = doc.data().horas;
        var correr = doc.data().correr;
        if (correr == ""){
          correr = "0";
        }
        
        diaPOcultoElement.innerHTML = `${horas}h dormidas ${correr}km corridos`;

       // console.log(fecha, fechadeldia)
        if(horas <= 3){
            elemento.classList.add("muymal")
        }
        else if(horas >= 4 && horas <= 7){
            elemento.classList.add("mal")
        }
        else if(horas > 9 && horas < 14){
            elemento.classList.add("mal")
        }
        else if(horas >= 14){
            elemento.classList.add("muymal")
        }
        else{
            elemento.classList.add("bien")
        }
        return horas;
      });
    } else {
      console.log("El usuario no está logueado");
    }
  }
  
  

async function creardias(fechaString){
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
          const diaElement = document.createElement("div"); 
          const diaPElement = document.createElement("p"); 
          const diaPOcultoElement = document.createElement("p");
          if(contadorDias <= 9){
            var fechaDelDia = fechaString+"0"+contadorDias;  
          }
          else{
          var fechaDelDia = fechaString+contadorDias;
          }
          await new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
              horas = onAuthStateChangedHandler(user, fechaDelDia, diaElement, diaPOcultoElement);
              resolve();
            });
          })
          diaPElement.innerText = contadorDias; 
          diaElement.appendChild(diaPElement); 
          diaElement.appendChild(diaPOcultoElement)
          diaElement.classList.add("dia"); 
          diaPElement.classList.add("dia_p");
          diaPOcultoElement.classList.add("dia_p_oculto");
          diaElement.addEventListener("click", (e) => {
           // console.log("Clicked on day", e.currentTarget.querySelector(".dia_p").innerText);
            mensaje.innerHTML = `
  Dia:<br>
  <span >${e.currentTarget.querySelector('.dia_p').innerText}</span><br>
  <span >${e.currentTarget.querySelector('.dia_p_oculto').innerText}</span>
`;
            modalContent.style.setProperty("transform", "scale(1)")
            modalContent.style.setProperty("z-index", "800");
            modalContent.classList.add(e.currentTarget.classList[1]);
            activo = false
          });
          mes.appendChild(diaElement); // append the day element to the month element
          
        }
      }
    }
  }
  const getDormir = () => db.collection("dormir");

  var xDown = null;                                                        
  var yDown = null;                                                        
  
  function handleTouchStart(evt) {                                         
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY;                                      
  };                                                
  
  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
  
      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;
  
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
  
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            //  console.log("LEFT SWIPE")
              swipeRight();
              
          } else {
             // console.log("RIGHT SWIPE")
              swipeLeft();
          }                       
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */ 
          } else { 
              /* down swipe */
          }                                                                 
      }
      xDown = null;
      yDown = null;                                             
  };
  
  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);