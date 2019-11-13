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
    // Set new piece as marked
    this._markedFigure = boardElement;
    // Highlight possible moves
    this._displayMoves(boardElement);
    console.log('Marked: ' + boardElement.name);
  }

  _handleAttack(enemyPossition) {
    if (this._moveIsPossible(this._markedFigure.findLegalMoves(this._boardModel), enemyPossition)) {
      this._handleMove(enemyPossition);
      console.log('Attack possition: ' + enemyPossition[0] + ',' + enemyPossition[1]);
      // TODO: set enemy's turn 
    } else {
      console.log('Damn! '+ this._markedFigure.name +' can not attack: ' + enemyPossition[0] + ',' + enemyPossition[1]);
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
    // TODO: set enemy's turn
    console.log('Moving ' + this._markedFigure.name + ' to ' + newPossition[0] + ', ' + newPossition[1]);
    this._clearState();
  }

  _clearState() {
    this._markedFigure = null;

    // Clear highlight
    let highlighted = document.querySelectorAll(".highlighted")
    for (let i = 0; i < highlighted.length; i++) {
      highlighted[i].classList.remove("highlighted");
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
        false /*check for castling here*/ ):
        console.log('Castling...');
        // TODO: Castling
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
        true /* Check here if it is our figure*/ ):
        console.log('Marking new figure...');
        this._handleMark(boardElement);
        break;

      default:
        console.log('Another action. Clearing state...');
        this._clearState();
        break;
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
    for (let i = 0; i < moves.length; i++) {
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