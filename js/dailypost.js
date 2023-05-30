var leaderboard =  document.querySelector(".leaderboard")
var ranking = document.querySelector(".ranking")
var p_username = document.querySelector(".p_username")
var imagenPerfil = document.querySelector(".imagen")
var imagenPerfilConatiner = document.querySelector(".foto_perfil")
var posteador = document.querySelectorAll(".post")
var side = document.querySelector(".side")
var cuerpo = document.querySelector(".cuerpo")
var imagenBoton = document.querySelector(".boton_abrir_imagen")
var draganddrop_container = document.querySelector(".draganddrop_container")
var draganddrop = document.querySelector(".draganddrop")
var boton_enviar = document.querySelector(".boton_enviar")
var postear_textarea = document.querySelector("#postear_textarea")
var logo = document.querySelector(".logo")
var otrosPost = document.querySelector(".otrosPost")
var bars_container = document.querySelector(".bars_container")
var boleano = true

const db = firebase.firestore();

const hola = firebase.auth().onAuthStateChanged(function (user){
  if (user){
    getUser(user.uid).then((nombreuser)=>{
      imagenPerfilConatiner.innerHTML = `<img class="imagen" src="${nombreuser.profilepic}" alt="profilepic">`
    })
  }
  else{
    console.log("Usuario no logueado")
  }
})

imagenPerfilConatiner.addEventListener("click", (e) => {
  if(boleano){
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getUser(user.uid)
          .then((nombreUser) => {
           // console.log(nombreUser)
            p_username.innerHTML = nombreUser.username;
          })
          .catch((error) => {
            console.log("Error al obtener el nombre de usuario:", error);
          });
      } else {
        window.location.href = "../html/login.html";
      }
    });
    imagenPerfilConatiner.style.setProperty("transform","translateX(10.5vw)")
    boleano = false
  }
  else{
    //console.log("estoy en la derecha")
    p_username.innerHTML = "";
    imagenPerfilConatiner.style.setProperty("transform", "translateX(0)")
    boleano = true
  }
});

var modalAbierto = false
esconderSideBar(boleano)
bars_container.addEventListener("click", (e)=>{
    if(boleano) {
        boleano = false
    }
    else{
        boleano = true
    }
    esconderSideBar(boleano);
    
})


function esconderSideBar(boleano){
   // console.log(boleano)
    if(boleano){
        leaderboard.style.setProperty("opacity", "0")
        cuerpo.style.setProperty("grid-template-columns", "1fr")
        side.style.setProperty("width", "0")
        ranking.style.setProperty("width", "0")
        //posteador.style.setProperty("width", "100vw")
    }
    else{
        cuerpo.style.setProperty("grid-template-columns", "1fr 2fr")
        side.style.setProperty("width", "26vw")
        ranking.style.setProperty("width", "20vw")
        leaderboard.style.setProperty("opacity", "1")
        //ranking.style.setProperty("width", "0")
    }
}
logo.addEventListener("click", (e)=>{
    window.location.href = "../index.html"
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        //console.log('Header is back on screen!');
      }
      else{
        //console.log('Header is not on screen!')
      }
    });
  });
  
  const divToObserve = document.querySelector('.header');
  observer.observe(divToObserve);

imagenBoton.addEventListener("click", (e)=>{
   // console.log("Abrir modal")
    draganddrop_container.style.display = "flex";
    setTimeout(()=>{
        modalAbierto = true;
    }, 500)
})

document.addEventListener("click", (e) => {
    if(modalAbierto){
      //  console.log("Super Cerrar Modal")
        if (!draganddrop.contains(e.target)) {
            draganddrop_container.style.display = "none";
            modalAbierto = false
        }
    }
});


const dragAndDrop = document.getElementById("draganddrop");
const fileInput = document.getElementById("fileinput");

dragAndDrop.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dragAndDrop.classList.add("highlight");
});

dragAndDrop.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dragAndDrop.addEventListener("dragleave", () => {
  dragAndDrop.classList.remove("highlight");
});

dragAndDrop.addEventListener("drop", (event) => {
  event.preventDefault();
  dragAndDrop.classList.remove("highlight");
  const files = event.dataTransfer.files;
  // console.log(files);
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    fileInput.files = files;
    //fileInput.value = files[0].name;
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0 && fileInput.files[0].type.startsWith("image/")) {
    dragAndDrop.classList.remove("highlight");
    dragAndDrop.querySelector(".text").innerHTML = fileInput.files[0].name;
  } else {
    dragAndDrop.querySelector(".text").innerHTML = "Drag and drop images here <br> or <br> Click to select images";
  }
});



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      var email = user.email;
     // console.log(`${uid} y ${email}`);
      boton_enviar.addEventListener("click", (e)=>{
        var fechaHoraActual = new Date();
        var dia = ("0" + fechaHoraActual.getDate()).slice(-2);
        var mes = ("0" + (fechaHoraActual.getMonth() + 1)).slice(-2);
        var anio = fechaHoraActual.getFullYear();
        var hora = ("0" + fechaHoraActual.getHours()).slice(-2);
        var minutos = ("0" + fechaHoraActual.getMinutes()).slice(-2);

        var formato = mes + "/" + dia + "/" + anio + " " + hora + ":" + minutos;

      //  console.log(`${postear_textarea.value}, ${fileInput.value}`)
        // Upload the file to Firebase Storage
        const file = fileInput.files[0];
        const storageRef = firebase.storage().ref();
        if(file != null){
                const fileRef = storageRef.child(file.name);
                const uploadTask = fileRef.put(file);

                // Save the download URL in the Firestore database
                uploadTask.on("state_changed", null, null, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    save_post(uid, postear_textarea.value, downloadURL, formato);
                });
            });
        }
        else{
            save_post(uid, postear_textarea.value, "",formato)
        }
      });
    } else {
      console.log("El usuario no esta loggueado");
    }
  });

const save_post = (userid, text, img, fecha) => {
    const postRef = db.collection("dailypost").doc(); // Create a new document reference
    
    // Use FieldValue.increment() to generate an auto-incremental value
    const increment = firebase.firestore.FieldValue.increment(1);
    
    postRef.set({
      postid: increment, // Add the auto-incremental value
      userid,
      text,
      img,
      fecha,
    })
      .then(() => {
        console.log("Enviado.");
       // console.log(userid, text, img, fecha);
        location.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
};

var primero = document.querySelector(".primero");
var segundo = document.querySelector(".segundo");
var tercero = document.querySelector(".tercero");
const generarRanking = () =>{

}

const getAllEntries = () => {
    const batchSize = 10; // Número de entradas a cargar en cada lote
    let lastEntry = null; // Última entrada cargada
    const loadEntries = () => {
      db.collection("dailypost")
        .orderBy("fecha") // Ordenar por fecha ascendente
        .startAfter(lastEntry) // Comenzar después de la última entrada cargada
        //sizee > 20 ? batchSize : sizee
        .limit(batchSize) // Limitar el número de entradas a cargar en cada lote
        .get()
        .then((querySnapshot) => {
          const entries = [];
          querySnapshot.forEach((doc) => {
            entries.push(doc);
            lastEntry = doc; // Actualizar la última entrada cargada
          });

          entries.reverse();
  
          // Generar los divs para las entradas cargadas
          entries.forEach((doc) => {
            var texto = doc.data().text;
            var imagen = doc.data().img;
            var usuarioPost = doc.data().userid;
            var fecha = doc.data().fecha.toString();
            var nombreUsuario = "Default";
            getUser(doc.data().userid)
              .then((nombreUser) => {
                //console.log(nombreUser)
  
                //console.log(texto, imagen, usuarioPost, fecha);
  
                var htmlImg = `<div class="post__imagen"><img class="post__imagen__img" src="${imagen}" alt="imagenPost"></img>`;
                if (imagen <= 1) {
                  htmlImg = "";
                }
  
                otrosPost.innerHTML += `<div class="post_container">
                  <div class="post">
                    <div class="usuarioContainer">
                      <img class="profile" src="${nombreUser.profilepic}" alt="ProfilePic"></img>
                      <div class="nombreUsuarioContainer">
                        <p class="nombreUsuario">${nombreUser.username}</p>
                        <p class="fechaYhora">${fecha}</p>
                      </div>
                    </div>
                    <p class="post__texto">${texto}</p>
                    <p class="post__usuario"></p>${htmlImg}
                  </div>
                </div>
              </div>`;
                
              })
              .catch((error) => {
                console.log("Error al obtener el nombre de usuario:", error);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };
  
    // Función para verificar si se alcanzó el final de la página
    const isPageBottom = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      return scrollTop + clientHeight >= scrollHeight;
    };
  
    // Evento scroll para cargar más entradas cuando se llega al final de la página
    setTimeout(()=>{
      window.addEventListener("scroll", () => {
        if (isPageBottom()) {
          loadEntries();
        }
      });
    },1000)
    
  
    // Cargar las primeras entradas al cargar la página
    loadEntries();
};

const getUser = (userid) => {
  return db.collection("usuarios")
    .where("userid", "==", userid)
    .get()
    .then((querySnapshot) => {
      let username = "";
      querySnapshot.forEach((doc) => {
        username = doc.data().username;
        profilepic = doc.data().profilepic;
        points = doc.data().points
      });
      // console.log(`NOMBRE DE USUARIO = ${username}`);
      return {username, profilepic, points};
    })
    .catch((error) => {
      console.log("Error getting user: ", error);
    });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.collection("usuarios")
      .orderBy("points", "desc")  
      .limit(3)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const { username, profilepic, points } = doc.data();
          users.push({ username, profilepic, points });
        });
        resolve(users);
      })
      .catch((error) => {
        console.log("Error getting users: ", error);
        reject(error);
      });
  });
};
var primero = document.querySelector(".primero") 
var segindo = document.querySelector(".segundo")
var tercero = document.querySelector(".tercero")
getAllUsers()
  .then((users) => {
    primero.innerHTML = `<div class="ranking__content">
    <img class="ranking_img" src="${users[0].profilepic}" alt="imagen">
    <p class="ranking_username">${users[0].username}</p>
    <p class="ranking_points">${users[0].points}</p>
</div>`
segundo.innerHTML = `<div class="ranking__content">
    <img class="ranking_img" src="${users[1].profilepic}" alt="imagen">
    <p class="ranking_username">${users[1].username}</p>
    <p class="ranking_points">${users[1].points}</p>
</div>`
tercero.innerHTML = `<div class="ranking__content">
    <img class="ranking_img" src="${users[2].profilepic}" alt="imagen">
    <p class="ranking_username">${users[2].username}</p>
    <p class="ranking_points">${users[2].points}</p>
</div>`
    //console.log(users[0]); 
  })
  .catch((error) => {
    
  });
getAllEntries();

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
});