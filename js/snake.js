const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

const db = firebase.firestore();
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
var volver = document.querySelector(".volver");
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader-hidden");
  
    loader.addEventListener("transitioned", () => {
      document.body.removeChild("loader");
    });
  });

volver.addEventListener("click", () => {
    window.location.href = "../html/menuJuegos.html";
  });
  

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = (score) => {
    
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            update_points(user.uid, score).then(()=>{
                clearInterval(setIntervalId);
                location.reload();
            })
        }
        else{
            clearInterval(setIntervalId);
            location.reload()
        }
    });
}

const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver(score);
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

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

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);