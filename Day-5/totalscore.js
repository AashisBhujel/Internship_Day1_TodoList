const totalscoreElement = document.getElementById('totalscore');
const restartButton = document.getElementById('restart-btn');

const urlParams = new URLSearchParams(window.location.search);
const score = parseInt(urlParams.get('score')) || 0;

let username = localStorage.getItem('username');
if (username) {
  username = prompt('Please enter your username');
  localStorage.setItem('username', username);
}

const timestamp = urlParams.get('timestamp') || 'N/A';
const difficultyLevel = urlParams.get('difficultyLevel') || 'N/A';

function displayTotalScore() {
  totalscoreElement.innerHTML = `Username: ${username}<br>Score: ${score}<br>Timestamp: ${timestamp}<br>Difficulty Level: ${difficultyLevel}`;
}

function restartQuiz() {
  if (confirm('Do you want to restart the quiz?')) {
    window.location.href = 'index.html';
  }
}

displayTotalScore();
restartButton.addEventListener('click', restartQuiz);
