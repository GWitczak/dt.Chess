import Piece from "./piece";

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "king";
    this.display = `<i data-color=${side} class="fas fa-chess-king ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
    let allowedMoves = JSON.parse(JSON.stringify(possibleMoves));
    allowedMoves = allowedMoves.filter(move => {
      return (move[0] >=0 && move[0] <= 7 && move[1] >=0 && move[1] <= 7)
    })
    return allowedMoves;
  }

  filterObstacles(possibleMoves, board) {
    let allowedMoves = JSON.parse(JSON.stringify(possibleMoves)); // deep copy
      for (let i = 0; i < possibleMoves.length; i++) {
        let xPos = possibleMoves[i][0];
        let yPos = possibleMoves[i][1];

        if (board[xPos][yPos]) {
          if (board[xPos][yPos]._side === this._side) {
            allowedMoves = allowedMoves.filter(move => {
              return !(move[0] === board[xPos][yPos]._x && move[1] === board[xPos][yPos]._y);
            })
          }
        }
      }
      return allowedMoves;
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    console.log(board);

    // Król może poruszać się o 1 w dowolną ze stron na w linii prostej oraz po skosie

    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down

    const diagonalMoves = [
      [x - v, y - 1],
      [x - v, y + 1],
      [x + v, y + 1],
      [x + v, y - 1]
    ];

    const frontMoves = [
      [x - v, y],
      [x + v, y],
      [x, y + 1],
      [x, y - 1]
    ];

    const allMoves = diagonalMoves.concat(frontMoves)
    let boardMoves;
    let legalMoves;

    boardMoves = this.filterOutBoardMoves(allMoves);
    legalMoves = this.filterObstacles(boardMoves, board);

    return legalMoves;
  }

}

export default King;