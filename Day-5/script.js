// script.js
function redirectNewGame() {
  window.location.href = 'newgame.html';
}

function redirectViewScore() {
  window.location.href = 'viewscore.html';
}

function redirectQuestion(difficulty) {
  window.location.href = `question.html?difficulty=${difficulty}`;
}
