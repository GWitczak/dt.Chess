// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;
    this._pristine = true;
    this._side = side; // 'black' or 'white'
  }

}

export default Piece;