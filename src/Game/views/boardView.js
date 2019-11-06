export default class BoardView {
    constructor(boardContainer) {
        this._boardElement = boardContainer;
    }

    _createSquares(board) {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                const square = document.createElement("div");
                square.dataset.id = `${x}-${y}`;
                square.dataset.x = `${x}`;
                square.dataset.y = `${y}`;
                square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
                square.className += x % 2 == y % 2 ? "light" : "dark";
                square.classList.add("square");
                this._boardElement.appendChild(square);
            }
        }
    }

    _displayPieces(board) {
        // Iterujemy po wszystkich elementach (empty jest pomijany w iteracji) tablicy board
        board.forEach((row, rowIndex) => {
            row.forEach((piece, squareIndex) => {
                this._boardElement.querySelector(
                    `[data-id="${rowIndex}-${squareIndex}"]`
                ).innerHTML = piece.display ? piece.display : "ERROR";
            });
        });
    }

    init(board) {
        this._createSquares(board);
        this._displayPieces(board);
    }
}