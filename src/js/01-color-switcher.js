const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

let id;

function onStartClick() {
  id = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
  stop.disabled = false;
}

function onStopClick() {
  clearInterval(id);
  stop.disabled = true;
  start.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
