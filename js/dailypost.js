console.log("funciono")

var imagenBoton = document.querySelector(".boton_abrir_imagen")
var draganddrop_container = document.querySelector(".draganddrop_container")
var draganddrop = document.querySelector(".draganddrop")
var boton_enviar = document.querySelector(".boton_enviar")
var postear_textarea = document.querySelector("#postear_textarea")
var logo = document.querySelector(".logo")
var otrosPost = document.querySelector(".otrosPost")

const db = firebase.firestore();

var modalAbierto = false

logo.addEventListener("click", (e)=>{
    window.location.href = "../index.html"
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Header is back on screen!');
      }
      else{
        console.log('Header is not on screen!')
      }
    });
  });
  
  const divToObserve = document.querySelector('.header');
  observer.observe(divToObserve);

imagenBoton.addEventListener("click", (e)=>{
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
  console.log(files);
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
      console.log(`${uid} y ${email}`);
      boton_enviar.addEventListener("click", (e)=>{
        console.log(`${postear_textarea.value}, ${fileInput.value}`)
        // Upload the file to Firebase Storage
        const file = fileInput.files[0];
        const storageRef = firebase.storage().ref();
        if(file != null){
                const fileRef = storageRef.child(file.name);
                const uploadTask = fileRef.put(file);

                // Save the download URL in the Firestore database
                uploadTask.on("state_changed", null, null, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    save_post(uid, postear_textarea.value, downloadURL);
                });
            });
        }
        else{
            save_post(uid, postear_textarea.value, "")
        }
      });
    } else {
      console.log("El usuario no esta loggueado");
    }
  });

  const save_post = (userid, text, img) => {
    db.collection("dailypost").doc().set({
      userid,
      text,
      img,
    }).then(() => {
      console.log("Enviado.");
      console.log(userid, text, img);
      location.reload();
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  };
const getAllEntries = () => {
    db.collection("dailypost")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          var texto = doc.data().text;
          var imagen = doc.data().img;
          var usuarioPost = doc.data().userid;
          console.log(texto, imagen, usuarioPost)
          var htmlImg = `<div class="post__imagen"><img class="post__imagen__img" src="${imagen}" alt="imagenPost"></img>`
          if(imagen <= 1){
            htmlImg =  "";
          }
          otrosPost.innerHTML += `<div class="post_container">
          <div class="post">
              <p class="post__texto">${texto}</p>
              <p class="post__usuario"></p> `+htmlImg+`</div></div></div>`
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
};

getAllEntries();