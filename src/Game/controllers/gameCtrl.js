export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
    this._markedFigure = null;
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

  _handleMark(boardElement) {
    console.log('Marked: ' + boardElement.name);
    // Set new piece as marked
    this._markedFigure = boardElement;
    // Highlight possible moves
    this._displayMoves(boardElement);
  }

  _handleAttack(enemyPossition) {
    console.log('Attack possition: ' + enemyPossition[0] + ',' + enemyPossition[1]);
    if (this._moveIsPossible(this._markedFigure.findLegalMoves(this._boardModel), enemyPossition)) {
      this._handleMove(enemyPossition);
      // TODO: set enemy's turn 
    } else {
      this._clearState();
    }
    
  }

  _handleMove(newPossition) {
    console.log('Moving ' + this._markedFigure.name + ' to ' + newPossition);
    // start possition
    let startPossition = [this._markedFigure._x, this._markedFigure._y];
    // update board model 
    this._markedFigure.movePiece(newPossition, this._boardModel);
    // update board view
    this._boardView.movePiece(startPossition, this._markedFigure);
    // TODO: set enemy's turn

    this._clearState();
  }

  _clearState() {
    console.log('Clear state!');
    this._markedFigure = null;

    // Clear highlight
    let highlighted = document.querySelectorAll(".highlighted")
    for (let i = 0; i < highlighted.length; i++) {
      highlighted[i].classList.remove("highlighted");
    }
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
  }
  _controllClick(position) {
    const x = position[0];
    const y = position[1];

    // Clicked element
    const boardElement = this._boardModel[x][y] || null;

    if (this._markedFigure != null) {
      // We have marked figure
      if (boardElement != null) {
        // We clicked on figure
        if (this._markedFigure._side == boardElement._side) {
          // and it is our figure
          //castling is available
          if (this._checkCastling(boardElement)) {
            this._performCastling(boardElement);
          } else {
            // Castling isn't available
            // so we cant mark new figure
            this._clearState();
            this._handleMark(boardElement);
          }
        } else {
          // and it is enemy's figure
          this._handleAttack([x, y]);
        }
      } else {
        // We clicked on empty field
        // TODO: check if it is avaible field
        if (this._moveIsPossible(this._markedFigure.findLegalMoves(this._boardModel), [x, y])) {
          // Move is possible
          this._handleMove([x, y]);
        } else {
          // We can't move here
          this._clearState();
        }
      }
    } else {
      // We don't have marked figure
      if (boardElement != null) {
        // We clicked on figure
        // TODO: here we should check if it is our figure 
        if (true) {
          // It is our figure so we can mark it
          this._handleMark(boardElement);
        } else {
          // It is enemy figure so we clear state
          this._clearState();
        }
      } else {
        // We clicked on empty field
        // so we clear state
        this._clearState();
      }
    }
    // boardElement ? this._getMoves(boardElement) : null; 
  }

  _getMoves(figure) {
    const moves = figure.findLegalMoves(this._boardModel);
    // console.log(moves); 
    return moves;
  }

  _displayMoves(figure) {
    const moves = this._getMoves(figure);
    for (let i=0; i < moves.length; i++) {
      let position = moves[i];
      document.querySelector(`[data-id="${position[0]}-${position[1]}"]`).classList.add("highlighted");
    }
  }

  init() {
    console.log("Inicjalizacja controllera...");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}