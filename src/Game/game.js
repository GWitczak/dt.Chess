import GameCtrl from './controllers/gameCtrl';
import boardModel from './models/board';
import boardView from './views/boardView';
import timerView from './views/timerView';

// w tym pliku będziemy inicjalizować aplikację
export default class Game {
    constructor(boardContainerId, timerViewID) {
        this._gameCtrl = new GameCtrl(boardView, boardModel, boardContainerId, timerView, timerViewID);
    }

    init() {
        this._gameCtrl.setting();
    }
}
