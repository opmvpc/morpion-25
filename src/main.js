import "./style.css";

const app = document.querySelector("#app");
let board = null;
let currentPlayer = null;
let cells = null;
let turnNumber = 0;
const IASymbol = "O";
const joueurSymbol = "X";

const initializeBoard = () => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const firstToPlay = () => {
  currentPlayer = Math.random >= 0.5 ? "Joueur" : "IA";
};

const isGameFinished = () => {
  return false;
};

const whoWon = () => {
  return;
};

const showWinner = () => {
  return;
};

const renderBoard = () => {
  app.innerHTML = `
    <header>
      <h1>Morpion</h1>
    </header>
    <div id="">

    </div>
    <div id="board">
    </div>`;

  document.querySelector("#board").addEventListener("click", clickBoardHandler);
};

const renderCells = () => {
  const boardDiv = document.querySelector("#board");
  boardDiv.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.textContent = board[i][j];
      cell.setAttribute("row", i);
      cell.setAttribute("col", j);
      if (board[i][j] !== "") {
        cell.style.cursor = "not-allowed";
      }

      boardDiv.appendChild(cell);
    }
  }
};

const clickBoardHandler = (event) => {
  if (currentPlayer !== "Joueur") {
    return;
  }
  const row = event.target.getAttribute("row");
  const col = event.target.getAttribute("col");
  if (board[row][col] !== "") {
    return;
  }
  board[row][col] = joueurSymbol;
  renderCells();
  switchPlayer();
  turnNumber++;
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === "IA" ? "Joueur" : "IA";
};

const IAplays = () => {
  if (turnNumber === 0) {
    board[1][1] = IASymbol;
    // si le centre est libre
  } else if (board[1][1] === "") { 
      board[1][1] = IASymbol;
  } else {
    // check les diagonales

      if () { 

    }
    
  }
  renderCells();
  switchPlayer();
  turnNumber++;
};

const diagonalesLibres = () => {
  const diagonales = []
  if (board[0][0]) {
    diagonales.push({
      row: 0,
      col:0,
    })
  } if (board[0][2]) {
    diagonales.push({
      row: 0,
      col:2,
    })
  } if (board[2][0]) {
    diagonales.push({
      row: 2,
      col:0,
    })
  } if (board[2][2]) {
    diagonales.push({
      row: 2,
      col:2,
    })
  }
  return diagonales
}

const launchGame = () => {
  board = initializeBoard();
  renderBoard();
  renderCells();
  firstToPlay();
  console.log(currentPlayer);

  if (currentPlayer === "IA") {
    IAplays();
  }
};

launchGame();
