const db = firebase.firestore();
var volver = document.querySelector(".volver")
const slider = document.getElementById('runningSlider');
const stickman = document.querySelector('.stickman');
const kilometersElement = document.querySelector('.kilometros');
var send_button = document.querySelector(".send_button")
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

volver.addEventListener("click", () => {
    window.location.href = "../index.html";
});



slider.addEventListener('input', () => {
  const sliderValue = slider.value;
  const kilometers = sliderValue;

  const positionPercentage = `${(sliderValue / 20) * 100}%`;
  stickman.style.left = positionPercentage;
    
  if(kilometers == 20){
    kilometersElement.innerHTML = `<p>+${kilometers} km</p>`;
  }
  else{
    kilometersElement.innerHTML = `<p>${kilometers} km</p>`;
  }
});
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      send_button.addEventListener("click", async (e) => {
        try {
          await save_dormir(user.uid, slider.value, formattedDate);
          update_points(user.uid, slider.value).then(()=>{
                  window.location.href = "../html/calendario.html";
          })
        } catch (error) {
          console.error("Error saving dormir: ", error);
        }
      });
    }
  });
  
  const save_dormir = (userid, correr, fecha) => {
    return new Promise((resolve, reject) => {
      var horas = 0;
      db.collection("dormir")
        .where("userid", "==", userid)
        .where("fecha", "==", fecha)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            console.log("ACTUALIZADO");
            const docRef = querySnapshot.docs[0].ref;
            return docRef.update({ correr });
          } else {
            console.log("ENVIADO");
            return db
              .collection("dormir")
              .doc()
              .set({ userid, horas, correr, fecha });
          }
        })
        .then(() => {
          resolve(); // Resolve the Promise when the operation is successful
        })
        .catch((error) => {
          reject(error); // Reject the Promise with the error when an error occurs
        });
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
            const newPoints = currentPoints + parseInt(points);
  
            db.collection("usuarios")
              .doc(doc.id)
              .update({ points: newPoints })
              .then(() => {
                console.log("Puntos actualizados.");
                console.log(userid + " " + newPoints);
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