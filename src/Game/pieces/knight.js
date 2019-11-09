import Piece from "./piece";

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "knight";
    this.display = `<i data-color=${side} class="fas fa-chess-knight ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  filterOutBoardMoves(possibleMoves) {
    return possibleMoves.filter(
        function(coord) {
            return (coord[0] >= 0 && coord[0] <= 7) && (coord[1] >= 0 && coord[1] <= 7)
        }
    );
  }

  filterCollisions(possibleMoves, board) {
    const col = this._side
    return possibleMoves.filter(
        function(coord) {
            let target = board[coord[0]][coord[1]];
            if (target==undefined) {
                return true;
            }
            else {
                if (col != target._side) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    )
  }

  findLegalMoves(board) {
    console.log(board);

    const x = this._x; // row
    const y = this._y; // column

    const allMoves = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2]
    ];

    let legalMoves;
    legalMoves = this.filterOutBoardMoves(allMoves);
    return this.filterCollisions(legalMoves, board);
  }

}

export default Knight;