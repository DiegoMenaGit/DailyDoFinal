const ROWS_EASY = 10;
const COLS_EASY = 10;
const BOMBS_EASY = 10;

const ROWS_NORMAL = 15;
const COLS_NORMAL = 15;
const BOMBS_NORMAL = 15;

const ROWS_HARD = 20;
const COLS_HARD = 20;
const BOMBS_HARD = 50;

var ROWS = ROWS_NORMAL;
var COLS = COLS_NORMAL;
var BOMBS = BOMBS_NORMAL;

var jugarr = document.querySelector(".jugar")
var facil = document.querySelector(".facil")
var normal = document.querySelector(".normal")
var dificil = document.querySelector(".dificil")
var jugar = document.querySelector(".boton_jugar")
var explosion = document.querySelector(".explosion");
const explosionSound = new Audio("../media/explosion.mp3");
const gameBoard = document.getElementById("gameBoard");



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
  };
  
  const fruit = fruitMap[board[row][col].value];
  const cellValue = board[row][col].bomb ? "💣" : fruit;
  cell.innerHTML = cellValue;

  if (board[row][col].bomb) {
    explosion.style.display = "flex";
    explosionSound.play();
    setTimeout(() => {
      explosion.style.display = "none";
      location.reload();
    }, 1000);
    return;
  }

if (revealedCount === ROWS * COLS - BOMBS) {
//	alert("¡Felicidades! Has ganado.");
	location.reload();
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
    facil.style.setProperty("background-color", "red");
    normal.style.setProperty("background-color", "aqua");
    dificil.style.setProperty("background-color", "aqua");
    console.log("set on easy")
  });
  
  normal.addEventListener("click", function() {
    ROWS = ROWS_NORMAL;
    COLS = COLS_NORMAL;
    BOMBS = BOMBS_NORMAL;
    facil.style.setProperty("background-color", "aqua");
    normal.style.setProperty("background-color", "red");
    dificil.style.setProperty("background-color", "aqua");
    console.log("set on normal")
  });
  
  dificil.addEventListener("click", function() {
    ROWS = ROWS_HARD;
    COLS = COLS_HARD;
    BOMBS = BOMBS_HARD;
    facil.style.setProperty("background-color", "aqua");
    normal.style.setProperty("background-color", "aqua");
    dificil.style.setProperty("background-color", "red");
    console.log("set on hard")
  });
  
  jugar.addEventListener("click", function() {
    jugarr.style.display = "none"
    gameBoard.style.display = "flex"
    init();
  });