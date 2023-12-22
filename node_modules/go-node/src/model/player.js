'use strict';

var Score = require('./../model/score');

function Player(name) {
    this.name = name || "anonymous";
    this.score = new Score();
}

Player.prototype.getName = function() {
    return name;
};

Player.prototype.getScore = function() {
    return this.score.getScore();
};

Player.prototype.addScore = function(scoreToAdd) {
    return this.score.addPoints(scoreToAdd);
};

module.exports = Player;
