import Piece from "./piece";
import PawnPromotion from "./pawnPromotion";

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "pawn";
    this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  static filterOutBoardMoves(moves) {
    // return only moves on correct possition on board
    return moves.filter((move) => (move[0] >= 0 && move[0] < 8) && (move[1] >= 0 && move[1] < 8));
  }

  static filterOccupiedPossition(moves, board) {
    // return only moves on free possition
    return moves.filter((move) => (board[move[0]][move[1]] == undefined));
  }

  findLegalAttacks(board) {
    //attacks of pawn
    let attacks = [
      [this._x + this._vector, this._y + 1],
      [this._x + this._vector, this._y - 1]
    ];
    // filter out board attacks
    attacks = Pawn.filterOutBoardMoves(attacks);
    // return only attacks on enemy pieces
    return attacks.filter((move) =>
      board[move[0]][move[1]] != undefined &&
      (board[move[0]][move[1]])._side != this.side);
  }

  findLegalMoves(board) {
    console.log(board);
    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down
    let result = [];
    if (this._pristine && board[x + v][y] == undefined) {
      // allow double move if pawn is on its origin possition
      // and possition in front of pawn is free
      result = [
        [x + v, y],
        [x + (2 * v), y],
      ]
    } else {
      result = [
        [x + v, y],
      ]
    }
    // filter moves and concat possible attacks
    return Pawn.filterOccupiedPossition(Pawn.filterOutBoardMoves(result), board).concat(this.findLegalAttacks(board));
  }

  // pawn promotion
  movePiece(newPosition, board) {
    super.movePiece(newPosition, board);
    if ( (this._side == "white" && this._x == 0) || (this._side == "black" && this._x == 7) ) {
      new PawnPromotion(this._x, this._y, this._side, board)
    }
  }
}

export default Pawn;