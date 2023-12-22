'use strict';

var _score = 0;

function Score(score) {
    this.score = score || _score;
}

Score.prototype.getScore = function() {
    return this.score;
};
Score.prototype.addPoints = function(points) {
    this.score += points || 0;
    return this.score;
};

module.exports = Score;
