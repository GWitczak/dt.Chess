import Piece from "./piece";

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "pawn";
    this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  filterOutBoardMoves(possibleMoves) {
    return possibleMoves.filter( (x) => (x[0] >= 0 && x[0] < 8) && (x[1] >= 0 && x[1] < 8));
  }

  findLegalMoves(board) {
    console.log(board);

    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down

    if(this._pristine) return this.filterOutBoardMoves([[x + v, y], [x + (2 * v), y]]);
    return this.filterOutBoardMoves([[x + v, y]]);
  }

}

export default Pawn;