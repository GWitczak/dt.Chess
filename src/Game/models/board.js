import Pawn from "../pieces/pawn";
import Bishop from "../pieces/bishop";
import Queen from "../pieces/queen";
import Knight from "../pieces/knight";
import Rook from "../pieces/rook";
import King from "../pieces/king";


export default class Board extends Array {

  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
  createAndSetPawns(side) {
    const row = side === "white" ? 6 : 1;
    for (let i = 0; i < 8; i++) {
      this[row][i] = new Pawn(row, i, side);
    }
  }

  createAndSetQueen(side) {
    const row = side === "white" ? 7 : 0;
    this[row][3] = new Queen(row, 3, side);
  }

  createAndSetKnights(side) {
    const row = side === "white" ? 7 : 0;
    this[row][1] = new Knight(row, 1, side);
    this[row][6] = new Knight(row, 6, side);
  }

  createAndSetBishop(side) {
    const row = side === "white" ? 7 : 0;
    this[row][2] = new Bishop(row, 2, side);
    this[row][5] = new Bishop(row, 5, side);
  }

  createAndSetRooks(side) {
    const row = side === "white" ? 7 : 0;
    this[row][0] = new Rook(row, 0, side);
    this[row][7] = new Rook(row, 7, side);
  }

  createAndSetKings(side) {
    const row = side === "white" ? 7 : 0;
    this[row][4] = new King(row, 4, side);
  }

  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetPawns(colors[i]);
      this.createAndSetBishop(colors[i]);
      this.createAndSetQueen(colors[i]);
      this.createAndSetKnights(colors[i]);
      this.createAndSetRooks(colors[i]);
      this.createAndSetKings(colors[i]);
    }
  }
}