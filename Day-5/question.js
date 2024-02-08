let questions;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlDifficulty = urlParams.get('difficulty');

  if (urlDifficulty) {
    fetchData(urlDifficulty);
  } else {
    console.log('Difficulty level not specified in the URL.');
  }
});

function fetchData(difficulty) {
  const apiUrl = `https://opentdb.com/api.php?amount=10&category=21&type=multiple&difficulty=${difficulty}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      questions = data.results.map((question) => {
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        const shuffledAnswers = shuffleArray(answers);

        const formattedQuestion = {
          question: question.question,
          answers: shuffledAnswers,
          correctIndex: shuffledAnswers.indexOf(question.correct_answer),
        };

        return formattedQuestion;
      });

      localStorage.setItem('difficultyLevel', difficulty);
      startQuiz();
    })
    .catch((error) => console.log('Error fetching data', error));
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const scoreElement = document.getElementById('score');
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  updateScore();
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

  answerButton.innerHTML = '';

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerHTML = answer;
    button.addEventListener('click', () => checkAnswer(index));
    answerButton.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll('.btn');

  // Disable all buttons to prevent further clicks
  answerButtons.forEach((button) => (button.disabled = true));

  if (selectedIndex === currentQuestion.correctIndex) {
    score++;
    updateScore();
    updateButtonStyles(selectedIndex, 'green');
  } else {
    updateButtonStyles(selectedIndex, 'red');
    updateButtonStyles(currentQuestion.correctIndex, 'green');
  }

  setTimeout(moveToNextQuestion, 1000);
}

function updateButtonStyles(index, color) {
  const answerButtons = document.querySelectorAll('.btn');
  answerButtons[index].style.backgroundColor = color;
}

function updateScore() {
  scoreElement.innerHTML = 'Score: ' + score;
}

function moveToNextQuestion() {
  resetButtonStyles();

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    const timestamp = new Date().toLocaleString();
    const difficultyLevel = localStorage.getItem('difficultyLevel');

    localStorage.setItem('score', score);
    localStorage.setItem('timestamp', timestamp);
    localStorage.setItem('difficultyLevel', difficultyLevel);
    window.location.href = `totalscore.html?score=${score}&timestamp=${timestamp}&difficultyLevel=${difficultyLevel}`;
  }
}

function resetButtonStyles() {
  const answerButtons = document.querySelectorAll('.btn');
  answerButtons.forEach((button) => {
    button.style.backgroundColor = '';
    button.disabled = false;
  });
}
