const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const notificationsDiv = document.querySelector('.notifications');

let workDuration = parseInt(workTimeInput.value) * 60;
let breakDuration = parseInt(breakTimeInput.value) * 60;
let currentTime = workDuration;
let timerInterval;
let isWorkTime = true;

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            if (isWorkTime) {
                showNotification('Work time is over! Take a break.');
                currentTime = breakDuration;
                isWorkTime = false;
            } else {
                showNotification('Break time is over! Get back to work.');
                currentTime = workDuration;
                isWorkTime = true;
            }
            updateDisplay();
            // Optionally play a sound here
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    workDuration = parseInt(workTimeInput.value) * 60;
    breakDuration = parseInt(breakTimeInput.value) * 60;
    currentTime = workDuration;
    isWorkTime = true;
    updateDisplay();
}

function showNotification(message) {
    notificationsDiv.textContent = message;
    setTimeout(() => {
        notificationsDiv.textContent = '';
    }, 3000); // Clear notification after 3 seconds
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Pomodoro Timer', {
                    body: message,
                    icon: 'images/timer192.png' // Path to your notification icon (optional)
                });
            }
        });
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workTimeInput.addEventListener('change', resetTimer);
breakTimeInput.addEventListener('change', resetTimer);

updateDisplay(); // Initial display
