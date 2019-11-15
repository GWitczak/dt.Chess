export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
    this._markedFigure = null;
    this._whoseTurn = 'white';
  }

  _setListeners() {
    this._boardContainer.addEventListener("click", ev => {
      const squarePosition = ev.target
        .closest(".square")
        .dataset.id.split("-")
        .map(el => {
          return +el;
        });
      this._controllClick(squarePosition);
    });
  }

  _switchTurn() {
    this._whoseTurn === "white" ? this._whoseTurn = "black" : this._whoseTurn = "white";
  }

  _handleMark(boardElement) {
    // Set new piece as marked
    this._markedFigure = boardElement;
    if (this._markedFigure._side === this._whoseTurn) {
      console.log('Marked: ' + boardElement.name);
      this._displayMoves(boardElement);
      this._markFigure(boardElement);
    }
  }

  _handleAttack(enemyPossition) {
    if (this._moveIsPossible(this._markedFigure.findLegalMoves(this._boardModel), enemyPossition)) {
      this._handleMove(enemyPossition); //wywołanie this._handleMove zmienia kolejkę
      console.log('Attack possition: ' + enemyPossition[0] + ',' + enemyPossition[1]);
    } else {
      console.log('Damn! ' + this._markedFigure.name + ' can not attack: ' + enemyPossition[0] + ',' + enemyPossition[1]);
      this._clearState();
    }
  }

  _handleMove(newPossition) {
    // start possition
    let startPossition = [this._markedFigure._x, this._markedFigure._y];
    // update board model 
    this._markedFigure.movePiece(newPossition, this._boardModel);
    // update board view
    this._boardView.movePiece(startPossition, this._markedFigure);
    console.log('Moving ' + this._markedFigure.name + ' to ' + newPossition[0] + ', ' + newPossition[1]);

    this._switchTurn();
    console.log(`${this._whoseTurn}'s turn!`);

    this._clearState();
  }

  _clearState() {
    this._markedFigure = null;

    // Clear highlight
    let highlighted = document.querySelectorAll(".highlighted")
    for (let i = 0; i < highlighted.length; i++) {
      highlighted[i].classList.remove("highlighted");
    }
    
    let attacks = document.querySelectorAll(".attacks")
    for (let i = 0; i < attacks.length; i++) {
      attacks[i].classList.remove("attacks");
    }

    let marked = document.querySelectorAll(".marked")
    for (let i = 0; i < marked.length; i++) {
      marked[i].classList.remove("marked");
    }

    console.log('Clear state!');
  }

  _moveIsPossible(moves, target) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i][0] == target[0] && moves[i][1] == target[1]) {
        return true;
      }
    }
    return false;
  }

  _checkCastling(boardElement) {
    if (this._markedFigure.name == "rook" && boardElement.name == "king" ||
        this._markedFigure.name == "king" && boardElement.name == "rook") {
      if (this._markedFigure.pristine == true && boardElement.pristine == true) { // check if pieces were moved
        const rook = this._markedFigure.name == "rook" ? this._markedFigure : boardElement;
        let row = rook._x;
        if (rook._y == 0){ // check if any pieces are between king and rook
          if (this._boardModel[row][1] == null && this._boardModel[row][2] == null &&
              this._boardModel[row][3] == null){
            return true;
          } else {
            return false
          }
        } else {
          if (this._boardModel[row][5] == null && this._boardModel[row][6] == null) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  _performCastling(boardElement) {
    const rook = this._markedFigure.name == "rook" ? this._markedFigure : boardElement;
    const king = this._markedFigure.name == "king" ? this._markedFigure : boardElement;
    let row = rook._x;
    if (rook._y == 0) {
      this._clearState(); //we know that castling is available and it doesn't matter which figure was clicked first
      this._markedFigure = rook;
      this._handleMove([row, 3]);
      this._markedFigure = king;
      this._handleMove([row, 2]);
    } else {
        this._clearState();
        this._markedFigure = rook;
        this._handleMove([row, 5]);
        this._markedFigure = king;
        this._handleMove([row, 6]);
    }
    this._switchTurn();
  }

  _controllClick(position) {
    const x = position[0];
    const y = position[1];

    // Clicked element
    const boardElement = this._boardModel[x][y] || null

    switch (true) {
      /* Castling */
      case (this._markedFigure != null &&
        boardElement != null &&
        this._markedFigure._side == boardElement._side &&
        this._checkCastling(boardElement)):
        console.log('Castling...');
        this._performCastling(boardElement);
        break;

        /* Marking new figure*/
      case (this._markedFigure != null &&
        boardElement != null &&
        this._markedFigure._side == boardElement._side):
        console.log('Marking new figure...');

        this._clearState();
        this._handleMark(boardElement);
        break;

        /* Attack */
      case (this._markedFigure != null &&
        boardElement != null &&
        this._markedFigure._side != boardElement._side):
        console.log('Attacking...');
        this._handleAttack([x, y]);
        break;

        /* Moving */
      case (this._markedFigure != null &&
        boardElement == null &&
        this._moveIsPossible(this._markedFigure.findLegalMoves(this._boardModel), [x, y])):
        console.log('Moving...');
        this._handleMove([x, y]);
        break;

        /* Mark figure */
      case (this._markedFigure == null &&
        boardElement != null &&
        true && this._whoseTurn === boardElement._side /* Check here if it is our figure*/ ):
        console.log('Marking new figure...');
        this._handleMark(boardElement);
        break;

      default:
        console.log('Another action. Clearing state...');
        this._clearState();
        break;
    }
  }

  _getMoves(figure) {
    const moves = figure.findLegalMoves(this._boardModel);
    // console.log(moves); 
    return moves;
  }

  _displayMoves(figure) {
    const moves = this._getMoves(figure);
    for (let i = 0; i < moves.length; i++) {
      let position = moves[i];
      if (!this._boardModel[position[0]][position[1]]) {
        document.querySelector(`[data-id="${position[0]}-${position[1]}"]`).classList.add("highlighted");
      } else {
        document.querySelector(`[data-id="${position[0]}-${position[1]}"]`).classList.add("attacks");
      }
      
    }
  }

  _markFigure(figure) {
    let x = figure._x;
    let y = figure._y;
    document.querySelector(`[data-id="${x}-${y}"]`).classList.add("marked");
  }


  init() {
    console.log("Inicjalizacja controllera...\nBiałe zaczynają.");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}
