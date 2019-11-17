// Find all attacks of opposite: findOpponentAttacks() in king.js
// - iterate through whole board and find possible attacks on opposite color figures 
// - return it in array





// King can't move to fields that are under attack: filterMovesFromOpponentAttacks() in king.js
// - filter fields under attack from king possible moves





// Figures should not move if their move will put king in check-situation: refactor of few function in gameCtrl.js
// - after move//attack update only model
// - if attack, then save deleted figure in variable (for example in state of controller: this.captured = capturedFigure)
//    - check for 'check' for actuall turn color
//    - if after attack/move 'check' === true 
//      - undo model moves - put your figure back to its place and restore attacked figure from variable
//      - console.log information that move is not allowed, clear state
// - else update view, change turns etc





// isCheck?() returns boolean
// - if king is on attacked position (attacksOfOpositeSite.includes(king.position));
// - run at the beggining of each turn (call on the last line of  _handleMove())






// check() - call this function when isCheck === true

// - lock all figures besides king ( call figure.lock())
//    - in piece.js
//          - create lock() function it sets up figure.lock = true 
//          - create unlock() function that sets up figure.lock = false
//          - create findLegalMoves() with statement if this.lock === true then return empty array (not able to move if figure is locked)
//          - add super() in each findLegalMoves() of all figures (without king) to inherit above logic

// - highlight king position on the board

// - find out who is attacker and add (positions of attacking figures) to an array (it can be separate helper function that returns 'attackers' array)

// - if there is more than one attacker you can only run away or attack with king (don't unlock figures),
// - if there is only one attacker, move is available to king and figures that can attack king's attacker

//   - find all moves of king and figures that can attack king attacker
//      - check for all possible attacks of your side
//      - if figure attack === position of king's attacker than unlock figure (set figure.lock = false)
//      - else checkmate? === true

//   - check is out
//        - unlock all your figures
//        - delete king highlight






// when is checkmate endgame?
// - if check === true and possible moves of king and figures are null 