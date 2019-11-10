import Cat from "../pieces/cat";
import Pawn from "../pieces/pawn";
import Queen from "../pieces/queen";

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
  
  createAndSetQueen(side){
    const row = side === "white" ? 7 : 0;
    const rowOffset = side === "white" ? -1 : 1;
    for(let i = 0; i < 8; i++ ){
      this[row+rowOffset][i] = new Pawn(row, i, side);
    }
    this[row][3] = new Queen(row, 3, side);
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
