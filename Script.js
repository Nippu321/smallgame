const board = document.getElementById("board");
const result = document.getElementById("result");
const resetButton = document.getElementById("reset-button");

const currentPlayer = "X";
const otherPlayer = "O";
let currentTurn = currentPlayer;
let boardState = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(index) {
    if (boardState[index] === "" && !checkWinner()) {
        boardState[index] = currentTurn;
        renderBoard();
        togglePlayer();
        checkResult();
    }
}

function togglePlayer() {
    currentTurn = currentTurn === currentPlayer ? otherPlayer : currentPlayer;
}

function checkResult() {
    if (checkWinner()) {
        result.textContent = `${currentTurn} wins!`;
    } else if (boardState.every((cell) => cell !== "")) {
        result.textContent = "It's a draw!";
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }

    return false;
}

function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < boardState.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = boardState[i];
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentTurn = currentPlayer;
    result.textContent = "";
    renderBoard();
}

resetButton.addEventListener("click", resetGame);

renderBoard();
