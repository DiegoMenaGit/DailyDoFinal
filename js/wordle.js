const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
var volver = document.querySelector(".volver")
let word, maxGuesses, incorrectLetters = [], correctLetters = [];
const db = firebase.firestore();

volver.addEventListener("click", () => {
    window.location.href = "../html/menuJuegos.html";
});

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    update_points(user.uid, 5).then(()=>{
                        return randomWord();
                    })
                }
                else{
                    return randomWord();
                }
            });
            
        } else if(maxGuesses < 1) {
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
  });

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
               // console.log(userid + " " + newPoints);
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
