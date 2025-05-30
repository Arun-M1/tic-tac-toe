//build the game
console.log("Script loaded!");
let board;
let gameOver;
let currentPlayer;
let messageUpdate;

function initializeGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currentPlayer = "X";
    messageUpdate = document.getElementById("gameUpdate");
    gameOver = false;
    const matches = document.querySelectorAll(".square")
    for (let i = 0; i < matches.length; i++) {
        console.log(matches[i]);
        matches[i].addEventListener("click", () => {
            console.log("I am clicked", matches[i]);
            handleMove(matches[i]);
        });
    }
    const resetButton = document.getElementById("resetButton").addEventListener("click", resetGame);
}

//check if game is over
function isWinner() {
    //row check
    for (let r = 0; r < board.length; r++) {
        let prev = board[r][0];
        let count = 1;
        for(let c = 1; c < board[0].length; c++) {
            let cur = board[r][c];
            if (prev && prev === cur) {
                count++;
            } else {
                break;
            }
            if (count === 3) {
                //found winner
                return true;
            }
        }
    }
    //col check
    for (let c = 0; c < board[0].length; c++) {
        let prev = board[0][c];
        let count = 1;
        for(let r = 1; r < board[0].length; r++) {
            let cur = board[r][c];
            if (prev && prev === cur) {
                count++;
            } else {
                break;
            }
            if (count === 3) {
                //found winner
                return true;
            }
        }
    }
    //diagonals
    if (checkDiagonals(0, 0, 1, 1)) {
        return true;
    }
    if (checkDiagonals(board.length - 1, 0, -1, 1)) {
        return true;
    }
    //draw
    
}

function checkDiagonals(startRow, startCol, rowStep, colStep) {
    let ch = board[startRow][startCol];
    if (!ch) {
        return false;
    }

    let r = startRow + rowStep;
    let c = startCol + colStep;

    while (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        if (board[r][c] !== ch) {
            return false;
        }
        r += rowStep;
        c += colStep;
    }

    return true;
}

//handle moves for player
function handleMove(cur_cell) {
    //check if game is over first
    if (gameOver) {
        return;
    }
    console.log(currentPlayer);
    //check if cell is allowed to be selected
    let move = "";
    console.log(cur_cell);
    console.log(cur_cell.dataset);
    if (cur_cell.textContent === "") {
        if (currentPlayer === "X") {
            move = "X";
            currentPlayer = "O";
        } else {
            move = "O";
            currentPlayer = "X";
        }

        updateUi(cur_cell, move);
        if (isWinner()) {
            console.log(currentPlayer === "X" ? "O wins" : "X wins");
            messageUpdate.textContent = `${currentPlayer === "X" ? "O" : "X"} wins`;
            gameOver = true;
            return;
        }
    } else {
        console.log("Square is taken, choose a different square");
        messageUpdate.textContent = `Square is taken, choose a different square Player ${currentPlayer}`;
    }
}

function updateUi(cur_cell, value) {
    let row = parseInt(cur_cell.dataset.row);
    let col = parseInt(cur_cell.dataset.col);
    board[row][col] = value;
    cur_cell.textContent = value;
    console.log(board);
    messageUpdate = document.getElementById("gameUpdate");
    messageUpdate.textContent = `Player ${currentPlayer}'s turn`;

}

//reset game
function resetGame() {
    console.log("resetting game");
    //reset states
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currentPlayer = "X";
    gameOver = false;
    messageUpdate.textContent = "Player X's turn";
    //clear text content of squares
    document.querySelectorAll(".square").forEach(square => {
        square.textContent = "";
    });
    
}

initializeGame();


