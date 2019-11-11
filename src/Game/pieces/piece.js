// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;
    this._pristine = true;
    this._side = side; // 'black' or 'white'
  }

  movePiece(newPosition, board) {
    // Mark figure as moved
    this._pristine = false;
    // Set new position in board
    board[newPosition[0]][newPosition[1]] = this;
    // Reset old possition
    board[this._x][this._y] = null;
    //New possition for figure
    this._x = newPosition[0];
    this._y = newPosition[1];
  }
}

export default Piece;