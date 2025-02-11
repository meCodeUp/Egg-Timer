// Globale Variablen
let alarm = new Audio('audio/alarm.mp3');
let timerStarted = false;
let timerInterval; // Variable zum Speichern des Intervalls
let selectedMinutes = 5; // Standardwert für den Timer

// Timer starten
function startTimer() {
    const timerElement = document.getElementById('timer');

    // Fehlerbehandlung: Überprüfen, ob der Timer vorhanden ist
    if (!timerElement) {
        console.error("Timer-Element nicht gefunden!");
        return;
    }

    if (!timerStarted) {
        const startTime = new Date().getTime();
        const timerMilliseconds = selectedMinutes * 60 * 1000; // Dynamische Zeit basierend auf der Auswahl
        const endTime = startTime + timerMilliseconds;

        timerInterval = setInterval(function () {
            const timeLeft = endTime - new Date().getTime();

            if (timeLeft > 0) {
                const minutes = Math.floor(timeLeft / (1000 * 60));
                let seconds = Math.floor((timeLeft / 1000) % 60);
                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerElement.innerHTML = `0${minutes} : ${seconds}`;
            } else {
                // Alarm abspielen und Timer stoppen
                alarm.play();
                timerElement.innerHTML = '00 : 00';
                clearInterval(timerInterval); // Intervall beenden
                timerStarted = false; // Reset für nächsten Start
            }
        }, 1000);

        timerStarted = true;
    } else {
        console.log("Der Timer läuft bereits!");
    }
}

// Timer auf eine spezifische Zeit setzen
function setTimer(minutes) {
    const timerElement = document.getElementById('timer');
    const sidebar = document.querySelector('.sidebar');

    // Fehlerbehandlung: Überprüfen, ob Timer- und Sidebar-Elemente vorhanden sind
    if (!timerElement) {
        console.error("Timer-Element nicht gefunden!");
        return;
    }
    if (!sidebar) {
        console.error("Sidebar-Element nicht gefunden!");
        return;
    }

    selectedMinutes = minutes; // Speichert die eingestellte Zeit global
    if (minutes >= 10) {
        timerElement.innerHTML = `${minutes} : 00`;
    } else {
        timerElement.innerHTML = `0${minutes} : 00`;
    }

    // Timer zurücksetzen, falls bereits ein Intervall läuft
    if (timerStarted) {
        clearInterval(timerInterval);
        timerStarted = false;
    }

    // Sidebar automatisch schließen
    sidebar.classList.add('is-hidden');
    sidebar.classList.remove('is-visible');
}

// Sidebar ein-/ausblenden
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');

    // Fehlerbehandlung: Überprüfen, ob die Sidebar existiert
    if (!sidebar) {
        console.error("Sidebar-Element nicht gefunden!");
        return;
    }

    sidebar.classList.toggle('is-hidden');
    sidebar.classList.toggle('is-visible');
}

// Zusätzliche Funktion: Alarm stoppen
function stopAlarm() {
    if (!alarm.paused) {
        alarm.pause();
        alarm.currentTime = 0; // Zurücksetzen auf Anfang
    }
}

// Event Listener hinzufügen (z. B. für "Esc"-Taste)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        toggleSidebar(); // Sidebar bei "Esc" schließen
    }
});