document.addEventListener('DOMContentLoaded', () => {
  // Retrieve game records from localStorage
  let gameRecords = JSON.parse(localStorage.getItem('gameRecords')) || [];

  // Retrieve current game data
  const username = localStorage.getItem('username') || 'N/A';
  const score = localStorage.getItem('score') || 'N/A';
  const timestamp = localStorage.getItem('timestamp') || 'N/A';
  const difficultyLevel = localStorage.getItem('difficultyLevel') || 'N/A';

  // Create a new game record object
  const currentGameRecord = { username, score, timestamp, difficultyLevel };

  // Check if the current record matches any existing record
  const isCurrentRecordExist = gameRecords.some(
    (record) =>
      record.username === username &&
      record.score === score &&
      record.timestamp === timestamp &&
      record.difficultyLevel === difficultyLevel
  );

  // If the current record doesn't exist, insert it into gameRecords array
  if (!isCurrentRecordExist) {
    gameRecords.push(currentGameRecord);
    // Save updated game records array back to localStorage
    localStorage.setItem('gameRecords', JSON.stringify(gameRecords));
  }

  // Display all game records
  function displayGameRecords(records) {
    // Clear the table body
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    // Create new rows for each record
    records.forEach((record) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${record.username}</td>
        <td>${record.score}</td>
        <td>${record.timestamp}</td>
        <td>${record.difficultyLevel}</td>
      `;
      // Append row to table body
      tableBody.appendChild(newRow);
    });
  }

  displayGameRecords(gameRecords);

  // Add event listener to clear records button
  clearRecordsButton.addEventListener('click', () => {
    // Clear game records from localStorage
    localStorage.removeItem('gameRecords');
    // Clear the table
    displayGameRecords([]);
  });

  // Sort game records based on score using merge sort
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (parseInt(left[leftIndex].score) > parseInt(right[rightIndex].score)) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  // Sort and display game records when 'sort1' link is clicked
  const sort1Link = document.querySelector('.dropdown-content a:nth-child(1)');
  sort1Link.addEventListener('click', () => {
    gameRecords = mergeSort(gameRecords);
    displayGameRecords(gameRecords);
  });
});
