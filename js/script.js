let alarm = new Audio('audio/alarm.mp3');
let timerStarted = false;

function startTimer() {
    if (!timerStarted) {
        let startTime = new Date().getTime();
        let timerMinutes = (1000 * 60) * 5;
        let endTime = startTime + timerMinutes;

        setInterval(function() {
            let timeLeft = endTime - new Date().getTime();

            if (timeLeft > 0) {
                let minutes = timeLeft / (1000 * 60);
                minutes = Math.floor(minutes);
                seconds = (timeLeft / 1000) % 60;
                seconds = Math.round(seconds);
                seconds = ('0' + seconds).slice(-2)
                let text = '0' + minutes + ' : ' + seconds;
                timer.innerHTML = text;
            } else {
                alarm.play();
                timer.innerHTML = '00 : 00';
            }

        }, 1000);
        timerStarted = true;
    }
}

function setTimer(minutes) {
    if (minutes == 10) {
        return timer.innerHTML = minutes + ' : 00';
    } else {
        return timer.innerHTML = '0' + minutes + ' : 00';
    }
}

function toggelSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('is-hidden');
}