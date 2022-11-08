const boardCells = document.querySelectorAll(".board-cell");
const gameInfo = document.querySelector("#game-info");
const playerOneName = document.querySelector("#player-one-name");
const playerTwoName = document.querySelector("#player-two-name");
const playerTwoAISelect = document.querySelector("#player-two-is-ai");

const game = (function() {

    let isPlayerOneTurn = true;
    let isPlayerTwoAI = true;
    let isGameOver = true;
    let playerNamesEntered = false;

    const width = 3;
    const height = 3;
    const board = ["1", "2", "3", 
                   "4", "5", "6",
                   "7", "8", "9"];

    const players = [];

    const initialiseBoard = function() {
        game.board = ["1", "2", "3", "4", "5", "6", "7", "8"];
        for(let cell of boardCells) {
            cell.innerText = "";
            cell.addEventListener("click", function(e) {
                displayController.cellClickHandler(e);
            });
        }
    };
    
    const initialiseGame = function() {
        game.isGameOver = false;
        game.isPlayerOneTurn = true;
        displayController.hideGameInfo();
        game.initialiseBoard();
    };

    const checkGameOver = function() {
        // Player wins if the following are the same...
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
            endGame(winner);
        }
    };

    const endGame = function(winnerName) {
        game.isGameOver = true;
        // gameInfo.classList.remove("invisible");
        // gameInfo.innerText = `${winnerName.toUpperCase()} WINS! PLAY AGAIN?`;
        displayController.displayGameInfo(`${winnerName.toUpperCase()} WINS! PLAY AGAIN?`);
    };

    // const makeAIMove = function() {
    //     setTimeout(function() {
    //     // Only player 2 can be AI so programming assuming this condition is true. 
    //     let availableCells = Array.from(boardCells).filter(getEmptyCells);
    //     console.log(availableCells);

    //     function getEmptyCells(cell) {
    //         return cell.innerText === "";
    //     }

    //     let randomCellIndex = Math.floor(Math.random() * availableCells.length);
    //     // game.board[availableCells[randomCellIndex].dataset.cell] = "O";
    //     availableCells[randomCellIndex].innerText = "O";

    //     game.isPlayerOneTurn = true;
    //     }, Math.random() * 2000);
    // }

    return {
        isPlayerOneTurn: isPlayerOneTurn,
        isPlayerTwoAI: isPlayerTwoAI,
        isGameOver: isGameOver,
        playerNamesEntered: playerNamesEntered,
        width: width,
        height: height,
        board: board,
        initialiseBoard: initialiseBoard,
        initialiseGame: initialiseGame,
        checkGameOver: checkGameOver,
        endGame: endGame
    }

})();

const displayController = (function() {

    const displayGameInfo = function(message) {
        gameInfo.classList.remove("invisible");
        gameInfo.innerText = message;
    };

    const hideGameInfo = function() {
        gameInfo.classList.add("invisible");
    }

    const cellClickHandler = function(e) {

        function makeMove(element, move) {
            element.innerText = move;
            game.board[element.dataset.cell] = move;
            game.checkGameOver();
            game.isPlayerOneTurn = !game.isPlayerOneTurn;

            if (!game.isGameOver && !game.isPlayerOneTurn && game.isPlayerTwoAI)
                makeAIMove();
        }

        const makeAIMove = function() {
            setTimeout(function() {
            // Only player 2 can be AI so programming assuming this condition is true. 
            let availableCells = Array.from(boardCells).filter(getEmptyCells);
    
            function getEmptyCells(cell) {
                return cell.innerText === "";
            }
    
            let randomCellIndex = Math.floor(Math.random() * availableCells.length);
            // availableCells[randomCellIndex].innerText = "O";

            makeMove(availableCells[randomCellIndex], "O");
    
            // game.isPlayerOneTurn = true;
            }, Math.random() * 2000);
        }

        if (!game.isGameOver && e.currentTarget.innerText === "") {
            if (game.isPlayerOneTurn) {
                makeMove(e.currentTarget, "X");
            } else if (!game.isPlayerTwoAI) {
                makeMove(e.currentTarget, "O");
            }
        }
    };
    
    const checkNamesEntered = function() {
        if (playerOneName.value != "" && playerTwoName.value != "") {
            gameInfo.classList.remove("disabled-button");
            game.playerNamesEntered = true;
        } else {
            gameInfo.classList.add("disabled-button");
            game.playerNamesEntered = false;
        }
    };

    return {
        displayGameInfo: displayGameInfo,
        hideGameInfo: hideGameInfo,
        cellClickHandler: cellClickHandler,
        checkNamesEntered: checkNamesEntered
    }

})();

const createPlayer = function(name) {
    return {
        name: name,
        wins: 0
    }
};

playerOneName.addEventListener("input", function(e) {
    displayController.checkNamesEntered();
});

playerTwoName.addEventListener("input", function(e) {
    displayController.checkNamesEntered();
});

playerTwoAISelect.addEventListener("input", function(e) {
    game.isPlayerTwoAI = playerTwoAISelect.checked;
})

gameInfo.addEventListener("click", function(e) {
    if (game.isGameOver && game.playerNamesEntered)
        game.initialiseGame();
});

displayController.checkNamesEntered();