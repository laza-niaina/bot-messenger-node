'use strict';

var Cell = require('./../model/cell');
var Player = require('./../model/player');

var events = require('events');
var util = require("util");

// bool to inicate who's next
var whiteIsNext = false;

// bool pass var
var pass = false;

function GameField() {
    this.whitePlayer = new Player();
    this.blackPlayer = new Player();
    this.gameField = [];
    events.EventEmitter.call(this);
    this.emit('newGameField');
}

util.inherits(GameField, events.EventEmitter);

GameField.prototype.createGameField = function(size) {
    this.gameField = [];
    var i, j;
    for (i = 0; i < size; ++i) {
        this.gameField.push([]);
        for (j = 0; j < size; ++j) {
            this.gameField[i].push(new Cell(i, j));
        }
    }

    this.emit('createGameField');
};

GameField.prototype.setStone = function(x, y) {
    if (x > this.gameField.length || y > this.gameField.length) {
        return false;
    } else if (this.getCellStatus(x, y) !== 0) {
        return false;
    }
    if (whiteIsNext) {
        this.emit('setStone', {
            x: x,
            y: y,
            color: 1
        });
        this.gameField[x][y].setStatus(1);
    } else {
        this.emit('setStone', {
            x: x,
            y: y,
            color: 2
        });
        this.gameField[x][y].setStatus(2);
    }
    moveEnd();
    whiteIsNext = !whiteIsNext;
    return true;
};

GameField.prototype.getCellStatus = function(x, y) {
    return this.gameField[x][y].getStatus();
};

GameField.prototype.getNext = function() {
    if (whiteIsNext) {
        return "white";
    }
    return "black";
};

GameField.prototype.resetAllChecked = function() {

    this.gameField.forEach(function(row) {
        row.forEach(function(cell) {
            cell.resetChecked();
        });
    });
    this.emit('resetAllChecked');

};

GameField.prototype.fenced = function(x, y) {
    // TODO implement
};

GameField.prototype.deepSearch = function(x, y) {
    // TODO implement
};

GameField.prototype.rememberMe = function(x, y) {
    // TODO switch index
    this.gameField[x][y].setChecked();
};

GameField.prototype.getWhitePlayer = function() {
    return this.whitePlayer;
};

GameField.prototype.getBlackPlayer = function() {
    return this.blackPlayer;
};

GameField.prototype.pass = function() {
    whiteIsNext = !whiteIsNext;

    if (pass) {
        return true;
    }
    pass = true;

    this.emit('pass');
    return !pass;
};

GameField.prototype.getGameFieldSize = function() {
    // TODO might be length x length
    return this.gameField.length;
};

function moveEnd() {
    // TODO: implement
}

module.exports = GameField;
//.createGameField(9);
