import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  start: document.querySelector('button[data-start]'),
  inputData: document.querySelector('#datetime-picker'),
  field: document.querySelector('.field'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.addEventListener('click', onStartClick);
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future', {
        position: 'left-top',
      });
      refs.start.disabled = true;
      return;
    }
    refs.start.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function renderData({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onStartClick() {
  refs.start.disabled = true;
  const interval = setInterval(() => {
    const date = Date.now();
    const diff = new Date(refs.inputData.value) - date;

    const res = convertMs(diff);
    renderData(res);

    const arr = Object.values(res).every(item => item === 0);
    if (arr) {
      clearInterval(interval);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
