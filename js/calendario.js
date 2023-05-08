var mes = document.querySelector(".mes");

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

var botonizq = document.querySelector(".boton1")
var botonder = document.querySelector(".boton2")

creardias();
conseguirMes();



function conseguirMes(){
    console.log(mesActual)
    if(mesActual <= 0){
        mesActual = 12;
    } else if (mesActual > 12) {
        mesActual = 1;
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
}