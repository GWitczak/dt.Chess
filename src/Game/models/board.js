import Cat from "../pieces/cat";
import Pawn from "../pieces/pawn";
import Knight from "../pieces/knight";

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

  createAndSetKnights(side){
    const row = side === "white" ? 7 : 0;
    this[row][1] = new Knight(row, 1, side);
    this[row][6] = new Knight(row, 6, side);
  }


  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetPawns(colors[i]);
      this.createAndSetKnights(colors[i]);
    }
  }
}