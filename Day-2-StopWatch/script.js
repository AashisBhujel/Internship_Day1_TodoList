let startTime;
let isRunning = false;
let elapsedTime = 0;
let lapId = 1;

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    isRunning = true;
    updateStopwatch();
  }
}

function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    elapsedTime = Date.now() - startTime;
  }
}

function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  lapId = 1;
  updateStopwatch();
  clearLapTimes();
}

function recordLap() {
  if (isRunning) {
    const lapDisplay = document.createElement('div');
    lapDisplay.textContent = `Lap ${lapId}: ${formatTime(elapsedTime)}`;
    lapDisplay.className = 'lap-time';
    document.getElementById('lap-times').appendChild(lapDisplay);

    lapId++;
  }
}

function clearLapTimes() {
  lapId = 1;
  const lapTimesContainer = document.getElementById('lap-times');
  lapTimesContainer.innerHTML = '';
}

function updateStopwatch() {
  if (isRunning) {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
  }

  const formattedTime = formatTime(elapsedTime);
  document.getElementById('stopwatch').textContent = formattedTime;
  requestAnimationFrame(updateStopwatch);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds);
}

function padNumber(number) {
  return (number < 10 ? '0' : '') + number;
}
