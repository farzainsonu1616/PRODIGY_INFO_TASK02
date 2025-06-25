let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    running = true;
  }
});

document.getElementById('pause').addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapsList.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(li);
  }
});

// Dark mode toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
