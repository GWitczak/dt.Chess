import Cat from "../pieces/cat";

// klasa inicjująca tablicę, gdzie będą zapisywane pozycje bierek

export default class Board extends Array {

  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
  createAndSetCats(side) {
    const row = side === "white" ? 5 : 2;
    this[row][0] = new Cat(row, 0, side);
    this[row][5] = new Cat(row, 5, side);
  }

  // metoda inicjalizująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetCats(colors[i]);
    }
  }
}