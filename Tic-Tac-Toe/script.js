let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatus(message) {
    document.getElementById('status').textContent = message;
}

function handleClick(index) {
    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    document.getElementById(`cell${index}`).textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} wins!`);
        highlight(winningCombination);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        updateStatus("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
}

function highlight(winningCombination) {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        if (!winningCombination.includes(index)) {
            cell.textContent = "";
        }
    });
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
    updateStatus(`Player X's turn`);
}
