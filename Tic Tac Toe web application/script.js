document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Function to create cells dynamically
    function createCell(index) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Function to handle cell clicks
    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");
        makeMove(index);
    }

    // Function to handle keyboard input
    function handleKeyPress(event) {
        const key = event.key;
        if (key >= 1 && key <= 9) {
            const index = parseInt(key) - 1;
            makeMove(index);
        }
    }

    // Function to make a move
    function makeMove(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            const cell = document.querySelector(`[data-index="${index}"]`);
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === "X" ? "player-x" : "player-o");
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
            } else if (gameBoard.every((cell) => cell !== "")) {
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return (
                gameBoard[a] !== "" &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            );
        });
    }

    // Function to initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            createCell(i);
        }
    }

    // Initialize the board when the DOM is ready
    initializeBoard();

    // Add event listener for keyboard input
    document.addEventListener("keydown", handleKeyPress);
});
