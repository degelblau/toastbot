const candleContainer = document.getElementById('candles');
const envelope = document.getElementById('envelope');

// 9 Kerzen erzeugen
for (let i = 0; i < 9; i++) {
  const candle = document.createElement('div');
  candle.className = 'candle';
  const flame = document.createElement('div');
  flame.className = 'flame';
  candle.appendChild(flame);
  candleContainer.appendChild(candle);
}

let blownOut = 0;

// 🔥 Nächste Kerze löschen + Rauch + Umschlag bei Ende anzeigen
function extinguishNextFlame() {
  const candles = document.querySelectorAll('.candle:not(.out)');
  if (candles.length === 0) return;

  const candle = candles[0];
  candle.classList.add('out'); // für Rauch + Flamme ausblenden
  blownOut++;

  if (blownOut === 9) {
    setTimeout(() => envelope.classList.add('show'), 1000);
  }
}

// 🎉 Konfetti erstellen
function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

// 📩 Umschlag öffnen
envelope.addEventListener('click', () => {
  document.querySelector('.letter').style.display = 'block';
  document.querySelector('.flap').style.display = 'none';
  createConfetti(); // 🎉 Regen starten
});

// 🔊 Mikrofon aktivieren
function startMic() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const micSource = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    micSource.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    function checkVolume() {
      analyser.getByteFrequencyData(data);
      const volume = data.reduce((a, b) => a + b) / data.length;

      if (volume > 60) {
        extinguishNextFlame();
      }

      requestAnimationFrame(checkVolume);
    }

    checkVolume();
  }).catch(err => {
    alert("⚠️ Mikrofon-Zugriff verweigert.");
    console.error(err);
  });
}

// 👆 iOS-kompatibel starten nach User-Interaktion
function startIfAllowed() {
  if (!window.micStarted) {
    startMic();
    window.micStarted = true;
  }
}

window.addEventListener('click', startIfAllowed, { once: true });
window.addEventListener('touchstart', startIfAllowed, { once: true });