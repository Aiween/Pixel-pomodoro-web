document.addEventListener('DOMContentLoaded', () => {

  //  CONFIGURATION & STATE
  
  const MODES = {
    pomodoro: { time: 25 * 60, label: "✦ beams active ✦" },
    short: { time: 5 * 60, label: "✦ cooling thrusters ✦" },
    long: { time: 15 * 60, label: "✦ deep sleep mode ✦" }
  };

  let currentMode = 'pomodoro';
  let timeLeft = MODES[currentMode].time;
  let timerId = null;
  let isRunning = false;
  let completedSessions = 0;

  //  DOM ELEMENT REFERENCES
 
  const timeLeftDisplay = document.getElementById('time-left');
  const currentModeLabel = document.getElementById('current-mode-label');
  const startPauseBtn = document.getElementById('start-pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const pomodoroCountDisplay = document.getElementById('pomodoro-count');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const bgAudio = document.getElementById('bg-audio');

  const modeBtns = {
    pomodoro: document.getElementById('mode-pomodoro'),
    short: document.getElementById('mode-short'),
    long: document.getElementById('mode-long')
  };

  // 3. AUDIO (Clicks + Background MP3)
 
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Tactile 8-bit button blip
  function playClickSound() {
    initAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  }

  // Background Audio Setup
  if (bgAudio) {
    bgAudio.volume = 0.25; // Gentle volume for focus
  }

  function toggleMusic() {
    if (!bgAudio) return;

    if (bgAudio.paused) {
      bgAudio.play()
        .then(() => {
          musicToggleBtn.textContent = '🎵 ON';
          musicToggleBtn.classList.add('playing');
        })
        .catch(err => console.log('Audio playback prevented:', err));
    } else {
      bgAudio.pause();
      musicToggleBtn.textContent = '🎵 OFF';
      musicToggleBtn.classList.remove('playing');
    }
  }


  //  DISPLAY FORMATTING
  
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timeLeftDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    document.title = `(${formattedMinutes}:${formattedSeconds}) Space Pomodoro`;
  }


  //  TIMER ENGINE

  function startTimer() {
    isRunning = true;
    startPauseBtn.textContent = 'PAUSE';

    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        handleTimerComplete();
      }
    }, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    startPauseBtn.textContent = 'START';
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function toggleStartPause() {
    playClickSound();
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function resetTimer() {
    playClickSound();
    pauseTimer();
    timeLeft = MODES[currentMode].time;
    updateDisplay();
  }

  function handleTimerComplete() {
    pauseTimer();
    if (currentMode === 'pomodoro') {
      completedSessions++;
      pomodoroCountDisplay.textContent = completedSessions;
      switchMode('short');
    } else {
      switchMode('pomodoro');
    }
  }


  //  MODE SWITCHING
  function switchMode(newMode) {
    if (!MODES[newMode]) return;

    pauseTimer();
    currentMode = newMode;
    timeLeft = MODES[currentMode].time;

    if (currentModeLabel) {
      currentModeLabel.textContent = MODES[currentMode].label;
    }

    Object.keys(modeBtns).forEach(modeKey => {
      if (modeBtns[modeKey]) {
        modeBtns[modeKey].classList.remove('active');
      }
    });

    if (modeBtns[newMode]) {
      modeBtns[newMode].classList.add('active');
    }

    updateDisplay();
  }

  
  //  EVENT LISTENERS
  
  startPauseBtn.addEventListener('click', toggleStartPause);
  resetBtn.addEventListener('click', resetTimer);

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      playClickSound();
      toggleMusic();
    });
  }

  Object.entries(modeBtns).forEach(([modeKey, btn]) => {
    if (btn) {
      btn.addEventListener('click', () => {
        playClickSound();
        switchMode(modeKey);
      });
    }
  });

  // Initial draw
  updateDisplay();
});