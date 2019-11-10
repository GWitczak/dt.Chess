import Cat from "../pieces/cat";
import Pawn from "../pieces/pawn";
import Bishop from "../pieces/bishop";

export default class Board extends Array {

  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
  createAndSetPawns(side){
    const row = side === "white" ? 6 : 1;
    for(let i = 0; i < 8; i++ ){
      this[row][i] = new Pawn(row, i, side);
    }
  }

  createAndSetBishop(side) {
    const row = side === "white" ? 7 : 0;
    this[row][2] = new Bishop(row, 2, side);
    this[row][5] = new Bishop(row, 5, side);
  }


  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetPawns(colors[i]);
    }
  }
}
