import "./style.css";

const app = document.querySelector("#app");
let board = null;
let currentPlayer = null;
let cells = null;

const initializeBoard = () => [
  ["0", "X", ""],
  ["", "O", ""],
  ["", "X", ""],
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
};

const renderCells = () => {
  const boardDiv = document.querySelector("#board");
  boardDiv.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.textContent = board[i][j];
      cell.setAttribute("row", i);
      cell.setAttribute("line", j);
      if (board[i][j] !== "") {
        cell.style.cursor = "not-allowed";
      }

      boardDiv.appendChild(cell);
    }
  }
  cells = document.querySelectorAll("#board > div");

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener("click", clickCellHandler);
  }
};

const clickCellHandler = (event) => {
  board[event.currentTarget.getAttribute("row")][
    event.currentTarget.getAttribute("line")
  ] = "X";
  renderCells();
};

const launchGame = () => {
  board = initializeBoard();
  renderBoard();
  renderCells();
};

launchGame();
