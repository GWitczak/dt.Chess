import Piece from "./piece";
import { throws } from "assert";

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "bishop";
    this.display = `<i data-color=${side} class="fas fa-chess-bishop ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

    filterObstacles(possibleMoves, board) {
      let allowedMoves = JSON.parse(JSON.stringify(possibleMoves)); // deep copy
      for (let i = 0; i < possibleMoves.length; i++) {
        let xPos = possibleMoves[i][0];
        let yPos = possibleMoves[i][1];
        
        if (board[xPos][yPos]) { // filter out all fields after obstacle
          if (board[xPos][yPos]._side === this._side) { // including obstacle if player's
            if (xPos > this._x && yPos < this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] >= board[xPos][yPos]._x && move[1] <= board[xPos][yPos]._y);
              });
            } else if (xPos < this._x && yPos > this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] <= board[xPos][yPos]._x && move[1] >= board[xPos][yPos]._y);
              });
            } else if (xPos < this._x && yPos < this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] <= board[xPos][yPos]._x && move[1] <= board[xPos][yPos]._y);
              });
            } else {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] >= board[xPos][yPos]._x && move[1] >= board[xPos][yPos]._y);
              });
            }

          } else { // not including obstacle if enemy's (can attack)
            if (xPos > this._x && yPos < this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] > board[xPos][yPos]._x && move[1] < board[xPos][yPos]._y);
              });
            } else if (xPos < this._x && yPos > this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] < board[xPos][yPos]._x && move[1] > board[xPos][yPos]._y);
              });
            } else if (xPos < this._x && yPos < this._y) {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] < board[xPos][yPos]._x && move[1] < board[xPos][yPos]._y);
              });
            } else {
              allowedMoves = allowedMoves.filter( move => {
                return !(move[0] > board[xPos][yPos]._x && move[1] > board[xPos][yPos]._y);
              });
            }
          };
        }

      }
      return allowedMoves;
    }

    // Główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki
    findLegalMoves(board) {
      console.log(board);
  
      // Goniec może poruszać się o dowolną ilośc pól na skos w każdą stronę do napotkania na przeszkodę (koniec szachownicy / bierka tego samego koloru - wtedy zatrzymuje się przed nią, bierka innego koloru - może bić, czyli może stanąć na tym samym miejscu co dana bierka)
      const x = this._x; // row
      const y = this._y; // column
      const v = this._vector // up/down

      let diagonalMoves = []; // all diagonal fields in any direction
      let yForward_1, yForward_2, yBackward_1, yBackward_2;
      yForward_1 = yBackward_1 = y + 1;
      yForward_2 = yBackward_2 = y - 1;

      for (let i = x - 1; i >= 0; i--) {
        if (yForward_1 <= 7) {
          diagonalMoves.push([i, yForward_1]);
          yForward_1++;
        }
        if (yForward_2 >= 0) {
          diagonalMoves.push([i, yForward_2]);
          yForward_2--;
        }
      };
      
      for (let i = x + 1; i <= 7; i++) {
        if (yBackward_1 <= 7) {
          diagonalMoves.push([i, yBackward_1]);
          yBackward_1++;
        }
        if (yBackward_2 >= 0) {
          diagonalMoves.push([i, yBackward_2]);
          yBackward_2--;
        }
      };

      const allMoves = diagonalMoves;
      let legalMoves;
      
      legalMoves = this.filterObstacles(allMoves, board);
      return legalMoves;
      
    }

}

export default Bishop;