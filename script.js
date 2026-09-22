
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];
let currentPlayer = "X";
let gameRunning = true;
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
cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        const index = Number(this.dataset.index);
        console.log("Clicked cell:", index);
        if (board[index] !== "") {
            return;
        }
        if (!gameRunning) {
            return;
        }
        board[index] = currentPlayer;
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer.toLowerCase());
        checkWinner();
    });

});
function checkWinner() {
    for (let condition of winningConditions) {

        const a = condition[0];
        const b = condition[1];
        const c = condition[2];
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            statusText.textContent =
                "🎉 Player " + currentPlayer + " Wins!";
            gameRunning = false;
            return;
        }
    }
    if (!board.includes("")) {
        statusText.textContent = "🤝 Game Draw!";
        gameRunning = false;

        return;
    }
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";

}
restartBtn.addEventListener("click", function() {
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    currentPlayer = "X";
    gameRunning = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
    });
});