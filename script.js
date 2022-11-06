const boardCells = document.querySelectorAll(".board-cell");
const gameInfo = document.querySelector("#game-info");
const playerOneName = document.querySelector("#player-one-name");
const playerTwoName = document.querySelector("#player-two-name");

const game = (function() {

    let isPlayerOneTurn = true;
    let isGameOver = false;
    let playerNamesEntered = false;

    const width = 3;
    const height = 3;
    const board = ["1", "2", "3", 
                   "4", "5", "6",
                   "7", "8", "9"];

    return {
        isPlayerOneTurn: isPlayerOneTurn,
        width: width,
        height: height,
        board: board
    }

})();

const displayController = (function() {

})();

const player = function() {
    return {

    }
};

const render = function() {

}

const cellXYToIndex = function(x, y) {
    return x + y * game.width;
}

const checkGameOver = function() {
    // How to check the array... 
    // Player wins if the following are the same...

    // 0, 1, 2
    // 3, 4, 5
    // 6, 7, 8

    // 0, 3, 6
    // 1, 4, 7
    // 2, 5, 8

    // 0, 4, 8
    // 2, 4, 6
    let b = game.board;
    if ((b[0] === b[1] && b[0] === b[2]) ||
        (b[3] === b[4] && b[3] === b[5]) ||
        (b[6] === b[7] && b[6] === b[8]) ||
        (b[0] === b[3] && b[0] === b[6]) ||
        (b[1] === b[4] && b[1] === b[7]) ||
        (b[2] === b[5] && b[2] === b[8]) ||
        (b[0] === b[4] && b[0] === b[8]) ||
        (b[2] === b[4] && b[2] === b[6])) {
        let winner = ""; 
        if (game.isPlayerOneTurn) {
            winner = playerOneName.value != "" ? playerOneName.value : "PLAYER ONE";
        } else {
            winner = playerTwoName.value != "" ? playerTwoName.value : "PLAYER TWO";
        }
        gameOver(winner);
    }
}

const gameOver = function(winnerName) {
    alert(`${winnerName.toUpperCase()} WINS!`);
    game.isGameOver = true;
    gameInfo.innerText = "PLAY AGAIN?";
}

const cellClickHandler = function(e) {
    if (!game.isGameOver && e.currentTarget.innerText === "") {
        let nextMove = "";
        if (game.isPlayerOneTurn) {
            nextMove = "X";
        } else {
            nextMove = "O";
        }
        e.currentTarget.innerText = nextMove;
        game.board[e.currentTarget.dataset.cell] = nextMove;
        checkGameOver();
        game.isPlayerOneTurn = !game.isPlayerOneTurn;
    }
}

const initialiseBoard = function() {
    game.board = ["1", "2", "3", "4", "5", "6", "7", "8"];
    for(let cell of boardCells) {
        cell.innerText = "";
        cell.addEventListener("click", function(e) {
            cellClickHandler(e);
        });
    }
}

const initialiseGame = function() {
    initialiseBoard();

}

const checkNamesEntered = function() {
    if (playerOneName.value != "" && playerTwoName.value != "") {
        gameInfo.classList.remove("disabled-button");
        game.playerNamesEntered = true;
    } else {
        gameInfo.classList.add("disabled-button");
        game.playerNamesEntered = false;
    }
}

playerOneName.addEventListener("input", function(e) {
    checkNamesEntered();
});

playerTwoName.addEventListener("input", function(e) {
    checkNamesEntered();
});

gameInfo.addEventListener("click", function(e) {
    if (game.playerNamesEntered)
        initialiseGame();
});