import Piece from "./piece";

class Rook extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "rook";
        this.display = `<i data-color=${side} class="fas fa-chess-rook ${side}"></i>`;
        this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
    }

// Filtrowanie ruchów wykraczających poza szachownice
    filterOutBoardMoves(possibleMoves) {
        return possibleMoves.filter(n => (n[0] >= 0 &&  n[0] <= 7) && (n[1] >= 0 &&  n[1] <= 7));
    }

// Filtrowanie kolizji
    filterCollisions(possibleMoves,board){
        let x;
        let y;
        for (let i = 0; i < possibleMoves.length; i++) {
            x = possibleMoves[i][0];
            y = possibleMoves[i][1];
    
            if (board[x][y]) {
                possibleMoves.splice(i);
            }
        }
        return possibleMoves;
    }

// Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
    findLegalMoves(board) {
        console.log(board);

        const x = this._x; // row
        const y = this._y; // column
        //const v = this._vector // up/down - tylko dla pionków, które nie mogą się cofać
      
        let FrontMoves = [];
        let BackMoves = [];
        let LeftMoves = [];
        let RightMoves = [];

        //vertical moves
        for (let i = x - 1; i >= 0; i--) {
            FrontMoves.push([i, y]);
        }
        for (let i = x + 1; i <= 7; i++) {
            BackMoves.push([i, y]);
        };
        
        //horizontal moves
        for (let i = y - 1; i >= 0; i--) {
            LeftMoves.push([x, i]);
        }
        for (let i = y + 1; i <= 7; i++) {
            RightMoves.push([x, i]);
        };
        
        // najpierw filtrujemy kolizje, łączymy ruchy
        let legalMoves = [].concat(this.filterCollisions(FrontMoves,board), this.filterCollisions(BackMoves,board),
            this.filterCollisions(LeftMoves,board), this.filterCollisions(RightMoves,board));
        legalMoves = this.filterOutBoardMoves(legalMoves);
        return legalMoves;
    }

}

export default Rook;