// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;
    this._pristine = true;
    this._side = side; // 'black' or 'white'
  }

  // tutaj będzie funkcja move(newPosition, board)
  //  - przypisuje bierke do nowego pola
  //  - czysci stare pole
  //  - aktualizuje _x i _y o nowa pozycje
  //  - oznacza bierkę jako ruszoną

}

export default Piece;