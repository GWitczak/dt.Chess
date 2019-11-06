import Piece from "./piece";

class Cat extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "cat";
    this.display = `<i data-color=${side} class="fas fa-cat ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterOutBoardMoves(possibleMoves) {
    // DIY
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    console.log(board);

    // Kot jako przykładowa bierka może poruszać się o jedno pole na skos w każdą stronę, oraz dowolną ilość pól na wprost do napotkania na przeszkodę (koniec szachownicy / bierka tego samego koloru - wtedy zatrzymuje się przed nią, bierka innego koloru - może bić, czyli może stanąć na tym samym miejscu co dana bierka)

    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down

    const diagonalMoves = [
      [x - v, y - 1],
      [x - v, y + 1],
      [x + v, y + 1],
      [x + v, y - 1]
    ]

    let frontMoves = [];
    if (v < 0) {
      for (let i = x - 1; i >= 0; i--) {
        frontMoves.push([i, y]);
      }
    } else {
      for (let i = x + 1; i <= 7; i++) {
        frontMoves.push([i, y]);
      }
    };

    const allMoves = diagonalMoves.concat(frontMoves)
    return allMoves;

    // let legalMoves;
    // legalMoves = this.filterOutBoardMoves(allMoves);
    // return legalMoves;
  }

}

export default Cat;