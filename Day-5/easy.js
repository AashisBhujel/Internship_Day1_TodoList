const url =
  'https://opentdb.com/api.php?amount=10&category=11&type=multiple&encode=url3986';

async function getData() {
  // const request = fetch(url);
  // const response = (await request).json;
  // console.log(request);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error1:', error);
  }
}

function displayQuestion(questions) {
  const questionContainer = document.getElementById('questionContainer');
  let currentQuestionsIndex = 0;
  console.log(currentQuestionsIndex[0]);
}

function showCurrentQuestion() {}

getData();
