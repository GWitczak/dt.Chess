import Pawn from "../pieces/pawn";
import Bishop from "../pieces/bishop";
import Queen from "../pieces/queen";
import Knight from "../pieces/knight";
import Rook from "../pieces/rook";

class PawnPromotion {

  constructor(_x, _y, _side, board) {
    this._x = _x;
    this._y = _y;
    this._side = _side;
    this.promotion(board);
  }

  promotion(board) {
    const pawnPromotionDiv = document.createElement("div");
    pawnPromotionDiv.className = "pawn-promotion-div";
    pawnPromotionDiv.style.color = this._side;

    const text = document.createTextNode("Choose your new figure");
    const pawnPromotionText = document.createElement("p");
    pawnPromotionText.className = "pawn-promotion-text";
    pawnPromotionText.appendChild(text);
    pawnPromotionDiv.appendChild(pawnPromotionText);

    const breakLine = document.createElement("div");
    breakLine.className = "break";
    pawnPromotionDiv.appendChild(breakLine);

    const icons = document.createElement("div");
    icons.className = "pawn-promotion-icons";
    pawnPromotionDiv.appendChild(icons);

    const promoteToBishop = document.createElement("i");
    promoteToBishop.className = `fas fa-chess-bishop ${this._side}`;
    promoteToBishop.id = "bishop";
    icons.appendChild(promoteToBishop)
    promoteToBishop.addEventListener("click", event => { switchFigures(event, board) })

    const promoteToQueen = document.createElement("i");
    promoteToQueen.className = `fas fa-chess-queen ${this._side}`;
    promoteToQueen.id = "queen";
    icons.appendChild(promoteToQueen)
    promoteToQueen.addEventListener("click", event => { switchFigures(event, board) })

    const promoteToKnight = document.createElement("i");
    promoteToKnight.className = `fas fa-chess-knight ${this._side}`;
    promoteToKnight.id = "knight";
    icons.appendChild(promoteToKnight)
    promoteToKnight.addEventListener("click", event => { switchFigures(event, board) })

    const promoteToRook = document.createElement("i");
    promoteToRook.className = `fas fa-chess-rook ${this._side}`;
    promoteToRook.id = "rook";
    icons.appendChild(promoteToRook)
    promoteToRook.addEventListener("click", event => { switchFigures(event, board) })

    const pawnPromotionCover = document.createElement("div");
    pawnPromotionCover.className = "pawn-promotion-cover";

    document.querySelector(".container").appendChild(pawnPromotionCover);
    document.querySelector(".container").appendChild(pawnPromotionDiv);

    const x=this._x;
    const y=this._y;
    const side=this._side;

    function switchFigures(e, board) {
      let newFigure;
      switch (e.target.id) {
        case "bishop":
          newFigure = new Bishop(x, y, side);
          break;
        case "queen":
          newFigure = new Queen(x, y, side);
          break;
        case "knight":
          newFigure = new Knight(x, y, side);
          break;
        case "rook":
          newFigure = new Rook(x, y, side);
          break;
        default:
          break;
      }

      board[x][y] = newFigure;
      document.querySelector(`[data-id="${x}-${y}"]`).innerHTML = newFigure.display;
      document.querySelector(".container").removeChild(pawnPromotionDiv);
      document.querySelector(".container").removeChild(pawnPromotionCover);
    }
  }
}

export default PawnPromotion;
