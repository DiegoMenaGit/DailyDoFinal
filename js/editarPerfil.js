const db = firebase.firestore();
var puntos = document.querySelector(".puntos")
var nombre_container__p = document.querySelector(".nombre_container__p")
var email_container__p = document.querySelector(".email_container__p")
var draganddrop_container = document.querySelector(".draganddrop_container")
var draganddrop = document.querySelector(".draganddrop")
var image_edit = document.querySelector(".image_edit")
var contimg = document.querySelector(".contimg")
var edit_button = document.querySelector(".edit_button")
var p__nombre__container = document.querySelector(".p__nombre__container");
const dragAndDrop = document.getElementById("draganddrop");
const fileInput = document.getElementById("fileinput");
var boleano = true;

edit_button.addEventListener("click", (e)=>{
  if(boleano){
    p__nombre__container.innerHTML = `<input class="inputNombre" type="text" value="${p__nombre__container.innerText}"></input>`
    boleano = false
  }
  else{
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const inputNombre = document.querySelector(".inputNombre")
        console.log(inputNombre.value)
        save_user_username(user.uid, inputNombre.value)
      }
    });
  }
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      var email = user.email;
      console.log(`${uid} y ${email}`);
      getUser(uid)
          .then((nombreUser) => {
            console.log(nombreUser)
            nombre_container__p.innerHTML = nombreUser.username;
            email_container__p.innerHTML = email;
            contimg.innerHTML = `<img class="profile_pic" src="${nombreUser.fotodeperfil}" alt="foto_perfil">`
          })
          .catch((error) => {
            console.log("Error al obtener el nombre de usuario:", error);
        });
    }
    else{
        console.log("Usuario no logueado")
    }
});

const getUser = (userid) => {
    return db.collection("usuarios")
      .where("userid", "==", userid)
      .get()
      .then((querySnapshot) => {
        let username = "";
        querySnapshot.forEach((doc) => {
          username = doc.data().username;
          fotodeperfil = doc.data().profilepic;
        });
        console.log(`NOMBRE DE USUARIO = ${username}`);
        return {username, fotodeperfil};
      })
      .catch((error) => {
        console.log("Error getting user: ", error);
      });
};

var volver = document.querySelector(".volver");
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
var modalAbierto = false

image_edit.addEventListener("click", (e)=>{
    console.log("Abrir modal")
    draganddrop_container.style.display = "flex";
    setTimeout(()=>{
        modalAbierto = true;
    }, 500)
})

document.addEventListener("click", (e) => {
    if(modalAbierto){
        console.log("Super Cerrar Modal")
        if (!draganddrop.contains(e.target)) {
            draganddrop_container.style.display = "none";
            modalAbierto = false
        }
    }
});




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
  console.log("Archivo insertado")
  const files = event.dataTransfer.files;
  console.log(files[0]);
  subirImagen(files[0]);
});


fileInput.addEventListener("change", (e) => {
    subirImagen(fileInput.files[0]);
  });

  function subirImagen(archivo){
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var uid = user.uid;
        const file = archivo;
        const storageRef = firebase.storage().ref();
        
        if (file != null) {
          const fileRef = storageRef.child(file.name);
          const uploadTask = fileRef.put(file);
          
          uploadTask.on("state_changed", null, null, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              save_user_profilepic(uid, downloadURL);
            });
          });
        } else {
          console.log("Sube una imagen");
        }
      }
    });
  }

const save_user_profilepic = (userid, newprofilepic) => {
    console.log(newprofilepic);
    db.collection("usuarios")
      .where("userid", "==", userid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            profilepic: newprofilepic,
          })
          .then(() => {
            console.log("Updated successfully.");
              window.location.reload();
           
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
        });
      })
      .catch((error) => {
        console.error("Error querying documents: ", error);
      });
};

const save_user_username = (userid, newname) => {
  console.log(newname);
  db.collection("usuarios")
    .where("userid", "==", userid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          username: newname,
        })
        .then(() => {
          console.log("Updated successfully.");
            window.location.reload();
         
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
      });
    })
    .catch((error) => {
      console.error("Error querying documents: ", error);
    });
};