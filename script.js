const boardCells = document.querySelectorAll(".board-cell");

const gameBoard = (function() {

    const width = 3;
    const height = 3;
    const board = ["X", "O", "O", 
                   "O", "O", "O",
                   "O", "X", "X"];

    return {
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

const cellClickHandler = function(e) {
    e.currentTarget.innerText = "X";
}

const initialiseGame = function() {
    for(let cell of boardCells) {
        cell.addEventListener("click", function(e) {
            cellClickHandler(e);
        });
    }
}

initialiseGame();