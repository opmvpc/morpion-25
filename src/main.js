import "./style.css";

const app = document.querySelector("#app");
let board = null;
let currentPlayer = null;
let turnNumber = 0;
const IASymbol = "O";
const joueurSymbol = "X";
let isWon = false;

const initializeBoard = () => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const firstToPlay = () => {
  currentPlayer = Math.random() >= 0.5 ? "Joueur" : "IA";
};

const isGameFinished = () => {
  const symbols = [joueurSymbol, IASymbol];
  for (let i = 0; i < 2; i++) {
    if (
      board[0][0] === symbols[i] &&
      board[0][1] === symbols[i] &&
      board[0][2] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[1][0] === symbols[i] &&
      board[1][1] === symbols[i] &&
      board[1][2] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[2][0] === symbols[i] &&
      board[2][1] === symbols[i] &&
      board[2][2] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[0][0] === symbols[i] &&
      board[1][0] === symbols[i] &&
      board[2][0] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[0][1] === symbols[i] &&
      board[1][1] === symbols[i] &&
      board[2][1] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[0][2] === symbols[i] &&
      board[1][2] === symbols[i] &&
      board[2][2] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[0][0] === symbols[i] &&
      board[1][1] === symbols[i] &&
      board[2][2] === symbols[i]
    ) {
      return symbols[i];
    }
    if (
      board[0][2] === symbols[i] &&
      board[1][1] === symbols[i] &&
      board[2][0] === symbols[i]
    ) {
      return symbols[i];
    }
  }
  return false;
};

const checkWinner = () => {
  const isFinished = isGameFinished();
  if (isFinished === false) {
    return;
  }
  isWon = true;
  showWinner(isFinished === IASymbol ? "IA" : "Joueur");
};

const showWinner = (winner) => {
  alert(`Gagnant : ${winner}`);
};

const renderBoard = () => {
  app.innerHTML = `
    <header>
      <h1>Morpion</h1>
    </header>
    <div id="">

    </div>
    <div id="board">
    </div>

    <div id="restart">
      <button>Relancer</button>
    </div>
    `;

  document.querySelector("#board").addEventListener("click", clickBoardHandler);
  document
    .querySelector("#restart > button")
    .addEventListener("click", () => launchGame());
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

const clickBoardHandler = async (event) => {
  if (isWon) {
    return;
  }
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
  await sleep(50);
  checkWinner();
  switchPlayer();
  turnNumber++;
  await IAplays();
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const switchPlayer = () => {
  currentPlayer = currentPlayer === "IA" ? "Joueur" : "IA";
};

const IAplays = async () => {
  if (isWon) {
    return;
  }

  const sleepTime = Math.random() * 2000 + 500;
  await sleep(sleepTime);

  if (turnNumber === 0) {
    board[1][1] = IASymbol;
    // si le centre est libre
  } else if (board[1][1] === "") {
    board[1][1] = IASymbol;
  } else {
    // check les diagonales

    const diagonales = diagonalesLibres();

    if (diagonales.length > 0) {
      const { row, col } =
        diagonales[Math.floor(Math.random() * diagonales.length)];
      board[row][col] = IASymbol;
    } else {
      const medianes = medianesLibres();
      console.log(medianes);

      if (medianes.length > 0) {
        const { row, col } =
          medianes[Math.floor(Math.random() * medianes.length)];
        board[row][col] = IASymbol;
      }
    }
  }
  renderCells();
  await sleep(50);
  switchPlayer();
  turnNumber++;
  checkWinner();
};

const diagonalesLibres = () => {
  const diagonales = [];
  if (board[0][0] === "") {
    diagonales.push({
      row: 0,
      col: 0,
    });
  }
  if (board[0][2] === "") {
    diagonales.push({
      row: 0,
      col: 2,
    });
  }
  if (board[2][0] === "") {
    diagonales.push({
      row: 2,
      col: 0,
    });
  }
  if (board[2][2] === "") {
    diagonales.push({
      row: 2,
      col: 2,
    });
  }
  return diagonales;
};

const medianesLibres = () => {
  const medianes = [];

  if (board[0][1] === "") {
    medianes.push({
      row: 0,
      col: 1,
    });
  }
  if (board[1][0] === "") {
    medianes.push({
      row: 1,
      col: 0,
    });
  }
  if (board[1][2] === "") {
    medianes.push({
      row: 1,
      col: 2,
    });
  }
  if (board[2][1] === "") {
    medianes.push({
      row: 2,
      col: 1,
    });
  }
  return medianes;
};

const launchGame = () => {
  isWon = false;
  board = initializeBoard();
  renderBoard();
  renderCells();
  firstToPlay();

  if (currentPlayer === "IA") {
    IAplays();
  }
};

launchGame();
