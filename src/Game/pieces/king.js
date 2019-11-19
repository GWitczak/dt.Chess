import Piece from "./piece";

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "king";
    this.display = `<i data-color=${side} class="fas fa-chess-king ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  isCheck(board) {
    const attacks = this._findOpponentAttacks(board);
    for (let i =0; i < attacks.length; i++){
      if(attacks[i][0] == this._x && attacks[i][1] == this._y)
        console.log(`${this._side} king is checked!`);
        return true;
    }
    return false;
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
    let allowedMoves = JSON.parse(JSON.stringify(possibleMoves));
    allowedMoves = allowedMoves.filter(move => {
      return (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7)
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

  _filterMovesFromOpponentAttacks(moves, opponentAttacks) {
    return moves.filter((move) => {
      for (let i = 0; i < opponentAttacks.length; i++) {
        if (move[0] == opponentAttacks[i][0] && move[1] == opponentAttacks[i][1])
        return false;
      }
      return true;
    });
  }

  _findOpponentAttacks(board) {
    let attacks = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let figure = board[row][col] || null;
        if (figure != null && figure._side != this._side) {
          let legalAttacks = figure.name == "pawn" ?
            [[figure._x + figure._vector, figure._y + 1], [figure._x + figure._vector, figure._y - 1]] 
            : figure.findLegalMoves(board, false);
          for (let i = 0; i < legalAttacks.length; i++)
            attacks.push(legalAttacks[i]);
        }
      }
    }
    return attacks;
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board, doFilter = true) {
    //console.log(board);
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
    if (doFilter) {
      legalMoves = this._filterMovesFromOpponentAttacks(legalMoves, this._findOpponentAttacks(board));
    }
    return legalMoves;
  }

}

export default King;