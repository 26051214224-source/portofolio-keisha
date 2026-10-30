
document.addEventListener("DOMContentLoaded", function () {

    function playCuteSound() {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) return;

        const audio = new Audio();

        if (audio.state === "suspended") {
            audio.resume();
        }

        // Dua nada lembut seperti bunyi sparkle
        const notes = [
            { frequency: 1046.5, time: 0 },
            { frequency: 1318.5, time: 0.12 }
        ];

        notes.forEach(function (note) {
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = note.frequency;

            oscillator.connect(gain);
            gain.connect(audio.destination);

            const start = audio.currentTime + note.time;

            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.045, start + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);

            oscillator.start(start);
            oscillator.stop(start + 0.7);
        });

        setTimeout(function () {
            audio.close();
        }, 1200);
    }

    document.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", playCuteSound);
    });

});