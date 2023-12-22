'use strict';

var GameField = require('./../model/gameField');

var operate = false;

function Controller() {
    operate = true;
}

Controller.prototype.createField = function(lenght) {
    operate = true;
    this.gameField = new GameField();
    this.gameField.createGameField(lenght);
};

Controller.prototype.setStone = function(x, y) {
    if (!operate) {
        console.log("Game already done", "unable to set stone");
        return false;
    }
    var next = this.gameField.getNext();
    if (this.gameField.setStone(x, y)) {
        console.log("set ", next, " at:", x, y);
    }
};

Controller.prototype.setListeners = function() {
    this.gameField.on('setStone', function() {
        console.log(arguments);
    });
};

Controller.prototype.getWhitePlayerScore = function() {
    return this.gameField.getWhitePlayer().getScore();
};

Controller.prototype.getBlackPlayerScore = function() {
    return this.gameField.getBlackPlayer().getScore();
};

Controller.prototype.getCellStatus = function(x, y) {
    return this.gameField.getCellStatus(x, y);
};

Controller.prototype.getNext = function() {
    return this.gameField.getNext();
};

Controller.prototype.getGameFieldSize = function() {
    return this.gameField.getGameFieldSize();
};

Controller.prototype.stop = function() {
    operate = false;
};

Controller.prototype.operate = function() {
    return operate;
};

Controller.prototype.pass = function() {
    if (!operate) {
        //statusLine = "Game already closed, not allowed to pass";
        //notifyObservers();
        return false;
    }
    var pass = this.gamefield.pass();
    return pass;
};


module.exports = Controller;
