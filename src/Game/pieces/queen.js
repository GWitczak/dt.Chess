import Piece from "./piece";

class Queen extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "queen";
    this.display = `<i data-color=${side} class="fas fa-chess-queen ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // Filtrowanie ruchów wykraczających poza szachownice
  filterMoves(possibleMoves, board) {
    for (let i = 0; i < possibleMoves.length; i++) {
        let x = possibleMoves[i][0];
        let y = possibleMoves[i][1];

        if (board[x][y]) {
            if (board[x][y]._side == this._side) {
                possibleMoves.splice(i);  
                return;

            } else {
                possibleMoves.splice(i+1); 
                return;           
            }
        }
    }
  }

  // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
  findLegalMoves(board) {
    console.log(board);

    // Kot jako przykładowa bierka może poruszać się o jedno pole na skos w każdą stronę, oraz dowolną ilość pól na wprost do napotkania na przeszkodę (koniec szachownicy / bierka tego samego koloru - wtedy zatrzymuje się przed nią, bierka innego koloru - może bić, czyli może stanąć na tym samym miejscu co dana bierka)

    const x = this._x; // row
    const y = this._y; // column
    const v = this._vector // up/down

    let endBoard = 7;
    let startBoard = 0;

    let topLeftMoves = [];
    for (let i = x - 1, j = y - 1; i >= startBoard && j >= startBoard; i--, j--) {
        topLeftMoves.push([i, j]);
    }

    let topRightMoves = [];
    for (let i = x - 1, j = y + 1; i >= startBoard && j <= endBoard; i--, j++) {
        topRightMoves.push([i, j]);
    }

    let bottomRightMoves = [];
    for (let i = x + 1, j = y + 1; i <= endBoard && j <= endBoard; i++, j++) {
        bottomRightMoves.push([i, j]);
    }

    let bottomLeftMoves = [];
    for (let i = x + 1, j = y - 1; i <= endBoard && j >= startBoard; i++, j--) {
        bottomLeftMoves.push([i, j]);
    }

    let frontMoves = [];
    for (let i = x + 1; i <= endBoard; i++) {
        frontMoves.push([i, y]);   
    }

    let backMoves = [];
    for (let i = x - 1; i >= startBoard; i--) {
        backMoves.push([i, y]);   
    }

    let leftMoves = [];
    for (let i = y - 1; i >= startBoard; i--) {
        leftMoves.push([x, i]);   
    }

    let rightMoves = [];
    for (let i = y + 1; i <= endBoard; i++) {
        rightMoves.push([x, i]);   
    }

    this.filterMoves(topRightMoves, board);
    this.filterMoves(topLeftMoves, board);
    this.filterMoves(bottomRightMoves, board);
    this.filterMoves(bottomLeftMoves, board);
    this.filterMoves(frontMoves, board);
    this.filterMoves(backMoves, board);
    this.filterMoves(leftMoves, board);
    this.filterMoves(rightMoves, board);
    const allMoves = topLeftMoves.concat(topRightMoves, bottomRightMoves, bottomLeftMoves,
                                         frontMoves, backMoves, leftMoves, rightMoves);
    return allMoves;
  }

}

export default Queen;
