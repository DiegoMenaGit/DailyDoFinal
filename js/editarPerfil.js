const db = firebase.firestore();
var nombre_container__p = document.querySelector(".nombre_container__p")
var email_container__p = document.querySelector(".email_container__p")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      var email = user.email;
      console.log(`${uid} y ${email}`);
      getUser(uid)
          .then((nombreUser) => {
            console.log(nombreUser)
            nombre_container__p.innerHTML = nombreUser;
            email_container__p.innerHTML = email;
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
        });
        console.log(`NOMBRE DE USUARIO = ${username}`);
        return username;
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