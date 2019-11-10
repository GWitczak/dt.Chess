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

  _controllClick(position) {
    const x = position[0];
    const y = position[1];

    const boardElement = this._boardModel[x][y] || null;

    // tutaj trzeba napisać logikę ruchu

    // jeśli klik na figurze i nie mamy zaznaczonej żadnej figury to wywołujemy funkcję która zaznaczy nam klikniętą figurę np this._handleMark(boardElement)
    //    - przypisuje nam figure do this._markedFigure
    //    - podświetla nam ruchy danej figury na szachownicy

    // jeśli mamy zaznaczoną figurę i klik na pustą kratkę (gotBoardElement == false) to wywołujemy funkcję np. this._handleMove(position)
    //    - sprawdzamy czy klikniete pole jest w dostepnych ruchach jesli nie odznacza figure
    //    - rusza figure 
    //      - aktualizuje model (wywoluje funkcje move na _markedFigure)
    //      - aktualizuje widok (wywoluje funkcje movePiece na _markedFigure)
    //      - wywolanie jakiejs funkcji typu afterMoveOrAttack która np zmienia nam kolej gracza (tury) itp.

    // Zaznaczona figura / kliknieta figura przeciwna - atak - wywołujemy np this._handleAttack(position)

    // w każdym innym przypadku coś co wyczyści nam state np this._clearState() - ustawia _markedFigure na null, usuwa podswietlenia szachownicy z widoku

    boardElement ? this._getMoves(boardElement) : null;
  }

  _getMoves(figure) {
    const moves = figure.findLegalMoves(this._boardModel);
    console.log(moves);
    return moves;
  }

  init() {
    console.log("Inicjalizacja controllera...");

    this._boardModel.init();
    this._boardView.init(this._boardModel);
    this._setListeners();

    console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
  }
}