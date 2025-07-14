function revealGift() {
  document.getElementById('presentView').classList.add('hidden');
  document.getElementById('flowerView').classList.remove('hidden');
  document.body.style.background = '#fffafc';
}

// Convert to UNIX timestamp in seconds
const examDate = Math.floor(new Date("2025-07-17T10:00:00").getTime() / 1000);

// Initialize FlipDown
new FlipDown(examDate, {
  theme: "dark"
})
  .start()
  .ifEnded(() => {
    document.getElementById('flipdown').innerHTML = "<h2>It's exam time! 💪📚</h2>";
  });

// Music controls
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");

function toggleMute() {
  bgMusic.muted = !bgMusic.muted;
  muteIcon.src = bgMusic.muted ? "Mute.png" : "Unmute.png";
}

window.addEventListener('load', () => {
  bgMusic.muted = true;
  // muteBtn.innerHTML = '🔇';
  muteIcon.src = "Mute.png";
});

// Sparkle effect
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight + 'px';
  sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
  sparkle.style.opacity = '0.7';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.animation = 'sparkle 2s ease-out forwards';

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 2000);
}

setInterval(createSparkle, 1000);
