const totalscoreElement = document.getElementById('totalscore');
const restartButton = document.getElementById('restart-btn');

const urlParams = new URLSearchParams(window.location.search);
const score = parseInt(urlParams.get('score')) || 0;

function displayTotalScore() {
  totalscoreElement.innerHTML = 'Score: ' + score;
}

function restartQuiz() {
  if (confirm('Do you want to restart the quiz?')) {
    window.location.href = 'index.html';
  }
}

displayTotalScore();
restartButton.addEventListener('click', restartQuiz);
