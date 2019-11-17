export default class GameCtrl {
  constructor(BoardView, BoardModel, boardContainerId) {
    this._boardContainer = document.querySelector(`#${boardContainerId}`);
    this._boardModel = new BoardModel();
    this._boardView = new BoardView(this._boardContainer);
    this._markedFigure = null;
    this._whoseTurn = 'white';
    this._timer = 2;
  }

  _setListeners() {
    this._boardContainer.addEventListener("click", ev => {
      if (!ev.target.closest(".square")) return;
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
        if (rook._y == 0) { // check if any pieces are between king and rook
          if (this._boardModel[row][1] == null && this._boardModel[row][2] == null &&
            this._boardModel[row][3] == null) {
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
        if (this._boardModel[x][y].name != 'king') {
          console.log('Attacking...');
          this._handleAttack([x, y]);
        } else {
          console.log("You can't attack the king!");
        }

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
        if (this._boardModel[position[0]][position[1]].name !== 'king') {
          document.querySelector(`[data-id="${position[0]}-${position[1]}"]`).classList.add("attacks");
        }

      }

    }
  }

  setting() {
    const settingsDiv = document.createElement("div");
    settingsDiv.className = "settings-div";

    const text01 = document.createTextNode("Welcome to Chess,");
    const text02 = document.createTextNode("made for CodersCamp");
    const settingsText01 = document.createElement("p");
    const settingsText02 = document.createElement("p");
    settingsText01.className = "settings-text";
    settingsText02.className = "settings-text";
    settingsText01.appendChild(text01);
    settingsText02.appendChild(text02);
    settingsDiv.appendChild(settingsText01);
    settingsDiv.appendChild(settingsText02);

    var styles = ["Default", "Retro", "Rainbow", "Hello Kitty"];
    var styles2 = [1, 2, 3, 4]
    var styleForm = document.createElement("div");
    styleForm.id = "style-form";
    styleForm.className = "form"
    const text1 = document.createTextNode("Style:  ");
    const styleText = document.createElement("p");
    styleText.appendChild(text1);
    styleForm.appendChild(styleText);
    var style = document.createElement("select");
    style.id = "style-select";
    settingsDiv.appendChild(styleForm);
    styleForm.appendChild(style);

    for (var i = 0; i < styles.length; i++) {
      var option = document.createElement("option");
      option.value = styles2[i];
      option.text = styles[i];
      style.appendChild(option);
    }

    var times = [2, 3, 4, 5];
    var times2 = ["2 minutes", "3 minutes", "4 minutes", "5 minutes"]
    var timeForm = document.createElement("div");
    timeForm.id = "time-form";
    timeForm.className = "form"
    const text2 = document.createTextNode("Round time:  ");
    const timeText = document.createElement("p");
    timeText.appendChild(text2);
    timeForm.appendChild(timeText);
    var time = document.createElement("select");
    time.id = "time-select";
    settingsDiv.appendChild(timeForm);
    timeForm.appendChild(time);

    for (var i = 0; i < times.length; i++) {
      var option = document.createElement("option");
      option.value = times[i];
      option.text = times2[i];
      time.appendChild(option);
    }

    var color = ["white", "black"]
    var firstForm = document.createElement("div");
    firstForm.id = "first-form";
    firstForm.className = "form"
    const text3 = document.createTextNode("First move:  ");
    const firstText = document.createElement("p");
    firstText.appendChild(text3);
    firstForm.appendChild(firstText);
    var first = document.createElement("select");
    first.id = "first-select";
    settingsDiv.appendChild(firstForm);
    firstForm.appendChild(first);

    for (var i = 0; i < color.length; i++) {
      var option = document.createElement("option");
      option.value = color[i];
      option.text = color[i];
      first.appendChild(option);
    }

    const button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.value = "New game";
    settingsDiv.appendChild(button);
    document.querySelector(".container").appendChild(settingsDiv);

    let _this = this;

    let theme = document.querySelector("link[href^='styles/theme']");

    style.addEventListener("change", () => {
      theme.href = "styles/theme" + document.getElementById("style-select").value + ".css";
    })

    button.addEventListener("click", () => {
      _this._whoseTurn = document.getElementById("first-select").value;
      _this._timer = document.getElementById("time-select").value;
      document.querySelector(".container").removeChild(settingsDiv);
      _this.init()
    });
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