var sumar_horas = document.querySelector(".mas")
var restar_horas = document.querySelector(".menos")
var contenedor_horas = document.querySelector(".horas_container")
var fondo = document.querySelector(".fondo")
var ciclos = document.querySelector(".ciclos")
var particulas = document.querySelector(".particulas")

var grados = 0;
var opacidad = 1;
var horasTotales = -1200;
crearHoras();
const currentDate = new Date().toISOString().slice(0, 10);
document.getElementById("fecha").value = currentDate;

function crearHoras(){
    for(let i = 24; i >= 0; i--){
        contenedor_horas.innerHTML += `<p class="horas">${i}h</p>`;
    }
}

sumar_horas.addEventListener("click", (e)=>{
    if(grados > 75){
        particulas.style.opacity = "0";
    }
    else{
        particulas.style.opacity = "1";
    }
    if(horasTotales <= -75){
        horasTotales -= -75;
        grados += 15;
        fondo.style.rotate = `${grados}deg`
        ciclos.style.rotate = `${grados}deg`
        contenedor_horas.style.transform = `translateY(${horasTotales}px)`;
        console.log(horasTotales);
    }
    else{
        console.log("No se puede dormir mas en un dia")
    }
})

restar_horas.addEventListener("click", (e)=>{
    if(grados > 90 || grados <= -75){
        particulas.style.opacity = "0";
    }
    else{
        particulas.style.opacity = "1";
    }
    
    if(horasTotales >= -1725){
    grados -= 15;
    horasTotales -= 75;
    fondo.style.rotate = `${grados}deg`
    ciclos.style.rotate = `${grados}deg`
    console.log(horasTotales)
    contenedor_horas.style.transform = `translateY(${horasTotales}px)`;
    }
    else{
        console.log("no se puede")
    }
})

particlesJS("particle", {
    "particles": {
      "number": {
        "value": 90,
        "density": {
          "enable": true,
          "value_area": 315
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.1,
          "opacity_min": 0.2,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0.5,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  
  /* ---- stats.js config ---- 
  
  var count_particles, stats, update;
  stats = new Stats;
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector('.js-count-particles');
  update = function() {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);*/