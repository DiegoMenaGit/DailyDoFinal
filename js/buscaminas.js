var volver = document.querySelector(".volver");
var boton_paraAudio = document.querySelector(".pararAudio")
var jugarr = document.querySelector(".jugar")
var facil = document.querySelector(".facil")
var normal = document.querySelector(".normal")
var dificil = document.querySelector(".dificil")
var jugar = document.querySelector(".boton_jugar")
var explosion = document.querySelector(".explosion");
const explosionSound = new Audio("../media/explosion.mp3");
const congratilationSound = new Audio("../media/tada.mp3");
const gameBoard = document.getElementById("gameBoard");
var audio = document.getElementById("myAudio");

volver.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const ROWS_EASY = 9;
const COLS_EASY = 9;
const BOMBS_EASY = 10;

const ROWS_NORMAL = 16;
const COLS_NORMAL = 16;
const BOMBS_NORMAL = 40;

const ROWS_HARD = 18;
const COLS_HARD = 20;
const BOMBS_HARD = 50;

var ROWS = ROWS_NORMAL;
var COLS = COLS_NORMAL;
var BOMBS = BOMBS_NORMAL

boton_paraAudio.addEventListener("click", (e)=>{
  stopAudio();
})

let board = [];
let bombCount = 0;
let revealedCount = 0;

function init() {
	for (let i = 0; i < ROWS; i++) {
		board[i] = [];
		for (let j = 0; j < COLS; j++) {
			board[i][j] = {
				bomb: false,
				flagged: false,
				revealed: false,
				value: 0
			}
		}
	}

	// Colocamos las bombas aleatoriamente en el tablero
	while (bombCount < BOMBS) {
		let row = Math.floor(Math.random() * ROWS);
		let col = Math.floor(Math.random() * COLS);

		if (!board[row][col].bomb) {
			board[row][col].bomb = true;
			bombCount++;
		}
	}

	// Calculamos los valores de las casillas adyacentes a las bombas
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (board[i][j].bomb) {
				incrementAdjacent(i, j);
			}
		}
	}

	// Creamos las celdas en el tablero y les asignamos un evento click
	for (let i = 0; i < ROWS; i++) {
		let row = gameBoard.insertRow();
		for (let j = 0; j < COLS; j++) {
			let cell = row.insertCell();
			cell.addEventListener("click", function() {
				reveal(i, j);
			});
			cell.addEventListener("contextmenu", function(event) {
				event.preventDefault();
				flag(i, j);
			});
		}
	}
}

function incrementAdjacent(row, col) {
	for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, ROWS - 1); i++) {
		for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, COLS - 1); j++) {
            if (!(i === row && j === col)) {
                board[i][j].value++;
            }
        }
    }
    }
    
    function reveal(row, col) {
    if (board[row][col].flagged || board[row][col].revealed) {
    return;
    }
    board[row][col].revealed = true;
revealedCount++;

let cell = gameBoard.rows[row].cells[col];
cell.classList.remove("hidden");
cell.classList.add("revealed");
const fruitMap = {
    0: "🍎",
    1: "🍌",
    2: "🍓",
    3: "🍍",
    4: "🍈",
    5: "🍇",
    6: "🥝",
    7: "🍑",
    8: "🥑"
  };
  
  const fruit = fruitMap[board[row][col].value];
  const cellValue = board[row][col].bomb ? "💣" : fruit;
  cell.innerHTML = cellValue;

  if (board[row][col].bomb) {
    explosion.style.display = "flex";
    if (!isPlaying) {
    explosionSound.play();
    }
    setTimeout(() => {
      explosion.style.display = "none";
      location.reload();
    }, 1000);
    return;
  }

if (revealedCount === ROWS * COLS - BOMBS) {
  if (!isPlaying) {
    stopAudio();
  congratilationSound.play();
  }
  setTimeout(() => {
	location.reload();
  }, 1500);
	return;
}

if (board[row][col].value === 0) {
	for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, ROWS - 1); i++) {
		for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, COLS - 1); j++) {
			if (!(i === row && j === col)) {
				reveal(i, j);
			}
		}
	}
}
}

function flag(row, col) {
if (board[row][col].revealed) {
return;
}
board[row][col].flagged = !board[row][col].flagged;

let cell = gameBoard.rows[row].cells[col];
cell.classList.toggle("flagged");

if (board[row][col].flagged) {
	cell.innerHTML = "🚩";
} else {
	cell.innerHTML = "";
}
}

facil.addEventListener("click", function() {
    ROWS = ROWS_EASY;
    COLS = COLS_EASY;
    BOMBS = BOMBS_EASY;
    facil.style.setProperty("background-color", "#00ffe7");
    normal.style.setProperty("background-color", "#fb5607");
    dificil.style.setProperty("background-color", "#fb5607");
    console.log("set on easy")
  });
  
  normal.addEventListener("click", function() {
    ROWS = ROWS_NORMAL;
    COLS = COLS_NORMAL;
    BOMBS = BOMBS_NORMAL;
    facil.style.setProperty("background-color", "#fb5607");
    normal.style.setProperty("background-color", "#00ffe7");
    dificil.style.setProperty("background-color", "#fb5607");
    console.log("set on normal")
  });
  
  dificil.addEventListener("click", function() {
    ROWS = ROWS_HARD;
    COLS = COLS_HARD;
    BOMBS = BOMBS_HARD;
    facil.style.setProperty("background-color", "#fb5607");
    normal.style.setProperty("background-color", "#fb5607");
    dificil.style.setProperty("background-color", "#00ffe7");
    console.log("set on hard")
  });
  
  jugar.addEventListener("click", function() {
    jugarr.style.display = "none"
    gameBoard.style.display = "flex"
    init();
  });

  var isPlaying = true;

  function stopAudio() {
    if (!isPlaying) {
      audio.pause();
      boton_paraAudio.innerHTML = "🔈";
      isPlaying = true;
    } else {
      audio.play();
      audio.currentTime = 0;
      boton_paraAudio.innerHTML = "🔊";
      isPlaying = false;
    }
  }
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter,index ) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

