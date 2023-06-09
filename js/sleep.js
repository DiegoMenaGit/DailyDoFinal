const db = firebase.firestore();

var sumar_horas = document.querySelector(".mas")
var restar_horas = document.querySelector(".menos")
var contenedor_horas = document.querySelector(".horas_container")
var fondo = document.querySelector(".fondo")
var ciclos = document.querySelector(".ciclos")
var particulas = document.querySelector(".particulas")
var send_button = document.querySelector(".send_button")
var fecha_input = document.querySelector(".fecha_input")

var volver = document.querySelector(".volver")

var hora_interna = 8;
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
        hora_interna += 1;
        fondo.style.rotate = `${grados}deg`
        ciclos.style.rotate = `${grados}deg`
        contenedor_horas.style.transform = `translateY(${horasTotales}px)`;
       //console.log(horasTotales);
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
    hora_interna -= 1;
    fondo.style.rotate = `${grados}deg`
    ciclos.style.rotate = `${grados}deg`
    //console.log(horasTotales)
    contenedor_horas.style.transform = `translateY(${horasTotales}px)`;
    }
    else{
        console.log("no se puede")
    }
})

volver.addEventListener("click", (e)=>{
    window.location.href ="../index.html";
})

firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      var uid = user.uid;
      var email = user.email;
      var puntos = 0;
     // console.log(`${uid} y ${email}`);
        send_button.addEventListener("click", async (e)=>{
            console.log("enviando...")
           // console.log(`${fecha_input.value} ${hora_interna} ${uid}`)
            save_dormir(uid, hora_interna, fecha_input.value)
            db.collection("dormir")
            .get()
            .then(() => {
              setTimeout(()=>{
                if (hora_interna <= 3){
                  puntos = -10
                }
                else if(hora_interna > 3 && hora_interna <= 7){
                  puntos = -5
                }
                else if(hora_interna >= 8 && hora_interna <= 9){
                  puntos = 5
                }
                else{
                  puntos = -3
                }
                update_points(uid, puntos).then(()=>{
                  window.location.href = "../html/calendario.html";
                })
              }, 1000)
            })
            .catch((error) => {
              console.log(error);
            });
        })
    } else {
      console.log("El usuario no está logueado");
    }
});

  const save_dormir = (userid, horas, fecha) => {
    // Consulta Firestore para buscar un documento que coincida con el `userid` y la `fecha`
    var correr = "";
    db.collection("dormir").where("userid", "==", userid).where("fecha", "==", fecha).get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Si se encuentra un documento existente, actualiza los datos
          const docRef = querySnapshot.docs[0].ref;
          return docRef.update({horas});
        } else {
          // Si no se encuentra un documento existente, crea uno nuevo
          return db.collection("dormir").doc().set({userid, horas, correr, fecha});
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const update_points = (userid, points) => {
    return new Promise((resolve, reject) => {
      db.collection("usuarios")
        .where("userid", "==", userid)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const currentPoints = parseInt(doc.data().points) || 0;
            const newPoints = currentPoints + points;
  
            db.collection("usuarios")
              .doc(doc.id)
              .update({ points: newPoints })
              .then(() => {
                console.log("Puntos actualizados.");
                //console.log(userid + " " + newPoints);
                resolve(newPoints);
              })
              .catch((error) => {
                console.log("Error al actualizar puntos:", error);
                reject(error);
              });
          } else {
            console.log("El usuario no existe.");
            reject("User not found.");
          }
        })
        .catch((error) => {
          console.log("Error al obtener usuario:", error);
          reject(error);
        });
    });
  };

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
  
  
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
  });