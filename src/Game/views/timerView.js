export default class timerView {
    constructor(timerContainer) {
        this._timerElement = timerContainer;
    }

    _formatTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds % 60);
        let time;
        if (timeInSeconds < 0)
            time = "time exceeded!";
        else if (timeInSeconds > 0 && minutes <= 0 && seconds <= 0)
            time = "less than 1s";
        else
            seconds >= 10 ? time = `0${minutes}:${seconds}` : time = `0${minutes}:0${seconds}`;
        return time;
    }

    _createTimerBox(timeLeftWhitePlayer, timeLeftBlackPlayer) {
        const TimerWhitePlayer = document.createElement("div");
        TimerWhitePlayer.className = "timerWhitePlayer";
        const TimerBlackPlayer = document.createElement("div");
        TimerBlackPlayer.className = "timerBlackPlayer";

        const title = document.createElement("p");
        title.className = "title";
        title.innerHTML = "time left:";
        const whitePlayersText = document.createElement("i");
        whitePlayersText.className = "fas fa-chess-pawn white";
        const whitePlayersTime = document.createElement("p");
        whitePlayersTime.id = "whitePlayersTime"
        whitePlayersTime.innerHTML = this._formatTime(timeLeftWhitePlayer);
        const blackPlayersText = document.createElement("i");
        blackPlayersText.className = "fas fa-chess-pawn black";
        const blackPlayersTime = document.createElement("p");
        blackPlayersTime.id = "blackPlayersTime"
        blackPlayersTime.innerHTML = this._formatTime(timeLeftBlackPlayer);

        this._timerElement.appendChild(TimerWhitePlayer);
        this._timerElement.appendChild(title);
        this._timerElement.appendChild(TimerBlackPlayer);

        TimerWhitePlayer.appendChild(whitePlayersText);
        TimerWhitePlayer.appendChild(whitePlayersTime);
        TimerBlackPlayer.appendChild(blackPlayersText);
        TimerBlackPlayer.appendChild(blackPlayersTime);
    }

    init(timeLeftWhitePlayer, timeLeftBlackPlayer) {
        this._createTimerBox(timeLeftWhitePlayer, timeLeftBlackPlayer);
    }

    update(side, timeLeft) {
        document.getElementById(`${side}PlayersTime`).innerHTML = this._formatTime(timeLeft);
    }
}