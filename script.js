window.addEventListener("DOMContentLoaded", () => {
  const sequence = [
    { el: "#lineBig", delay: 20 },
    { el: "#lineSmall", delay: 120 },
    { el: "#giftBox", delay: 220 },
    { el: "#clickButton", delay: 320},
  ];

  sequence.forEach(({ el, delay }) => {
    const element = document.querySelector(el);
    if (element) {
      setTimeout(() => {
        element.classList.add("popfade");

        // When salutation is done, trigger jump
        if (el === "#lineBig") {
          setTimeout(() => {
            floatLineCharacters("#lineBig", "line-big-char");
          }, 800); // slight delay to wait until popfade finishes
        }
        else if (el === "#lineSmall"){
          setTimeout(() => {
            floatLineCharacters("#lineSmall", "line-small-char");
          }, 1000); // slight delay to wait until popfade finishes
        }
      }, delay);
    }
  });
});

// setTimeout(() => {
//   const giftBox = document.getElementById("giftBox");
//   giftBox.classList.add("popfade");
//   giftBox.style.animation = "popFade 0.8s ease forwards, pulse 2s infinite";
// }, 200); // delay until it's this element's turn

function floatLineCharacters(ellId, charClass) {
  const salutationEl = document.querySelector(ellId);
  const originalText = salutationEl.textContent;
  
  // Wrap each character in a span only once
  salutationEl.innerHTML = "";

  originalText.split("").forEach((char, index) => {
    const span = document.createElement("span");

    // Handle space explicitly
    span.textContent = (char === " ") ? "\u00A0" : char;

    span.classList.add(charClass);
    salutationEl.appendChild(span);

    // Add jump animation with staggered delay
    setTimeout(() => {
      span.classList.add("float");
    }, index * 50); // delay between each char
  });
}

function revealGift() {
  document.getElementById('presentView').classList.add('hidden');
  document.getElementById('flowerView').classList.remove('hidden');
  document.body.style.background = '#fffafc';

  // Popfade animation sequence
  setTimeout(() => {
    const flower = document.getElementById("flowerImage")
    flower.classList.add("popfade");
    flower.style.animation = "popFade 0.8s ease forwards, float 3s ease-in-out infinite, shake 0.6s ease-in-out infinite";
  }, 50);

  setTimeout(() => {
    document.getElementById("salutation").classList.add("popfade");
  }, 150);

  setTimeout(() => {
    document.getElementById("messageText").classList.add("popfade");
  }, 250);

  setTimeout(() => {
    document.getElementById("flipdown-wrapper").classList.add("popfade");
  }, 350);
}

// Convert to UNIX timestamp in seconds
const examDate1 = Math.floor(new Date("2025-07-17T00:00:00").getTime() / 1000);
const examEnd1 = Math.floor(new Date("2025-07-17T19:00:00").getTime() / 1000);

const examDate2 = Math.floor(new Date("2025-07-23T00:00:00").getTime() / 1000);
const examEnd2 = Math.floor(new Date("2025-07-23T11:00:00").getTime() / 1000);

const datetimeNow = new Date().getTime() / 1000;

const flipdownContainer = document.getElementById('flipdown');

function startCountdown(targetDate, targetEnd, labelAboveText, labelBottomText, onEndCallback) {
  // Clear any existing FlipDown HTML
  flipdownContainer.innerHTML = '';

  // Create new FlipDown
  new FlipDown(targetDate, {
    theme: "dark"
  })
    .start()
    .ifEnded(() => {
      if(datetimeNow > targetEnd)
      {
        if (typeof onEndCallback === 'function') {
          onEndCallback();
        }
      }
    });

  // show label
  if (labelAboveText || labelBottomText) {
    document.getElementById("flipdown-label-above").textContent = labelAboveText;
    document.getElementById("flipdown-label-bottom").textContent = labelBottomText;
  }
}

function startCountUpTimer() {
  flipdownContainer.innerHTML = ""; // Clear previous FlipDown

  const label = document.createElement("div");
  label.setAttribute("id", "countup-timer");
  label.style.fontFamily = "Jua, sans-serif";
  label.style.color = "#370075ff";
  label.style.fontSize = "1.8rem";
  label.style.margin = "20px";
  label.style.alignItems = "Center";

//   @media (max-width: 550px) {
//   label {
//     fontSize: scale(0.9); /* Don't scale on small screens */
//   }
// }

  flipdownContainer.style.transform = "scale(1)";
  flipdownContainer.style.maxHeight = "70px";


  flipdownContainer.appendChild(label);

  function updateTimer() {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - examEnd2;

    const days = Math.floor(diff / (60 * 60 * 24));
    const hours = Math.floor((diff / (60 * 60)) % 24);
    const minutes = Math.floor((diff / 60) % 60);
    const seconds = diff % 60;

    label.textContent = days > 0 ? `📅 ${days}d ${hours}h ${minutes}m ${seconds}s` : `⏱️ ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateTimer(); // Immediate show
  setInterval(updateTimer, 1000); // Update every second
}

// Start with first exam
if(datetimeNow < examEnd1)
{
  startCountdown(examDate1, examEnd1, 'COUNTDOWN', 'To Your Battle Day 1', () => {
    // When first ends, start second
    startCountdown(examDate2, examEnd2, 'COUNTDOWN', 'To Your Battle Day 2', () => {
      document.getElementById("flipdown-label-above").textContent = 'Congraduation! 🎉 It’s been';
      startCountUpTimer();
      document.getElementById("flipdown-label-bottom").textContent = 'Since Completed Your Final';
    });
  });
}
else
{
  startCountdown(examDate2, examEnd2, 'COUNTDOWN', 'To Your Battle Day 2', () => {
      document.getElementById("flipdown-label-above").textContent = 'Congraduation! 🎉 It was';
      startCountUpTimer();
      document.getElementById("flipdown-label-bottom").textContent = 'Since Completed Your Final';
    });
}

// Music controls
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");

function toggleMute() {
  bgMusic.muted = !bgMusic.muted;
  muteIcon.src = bgMusic.muted ? "Resource/Mute.png" : "Resource/Unmute.png";
}

window.addEventListener('load', () => {
  bgMusic.muted = true;
  // muteBtn.innerHTML = '🔇';
  muteIcon.src = "Resource/Mute.png";
});

// Sparkle effect
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight - 30 + 'px';
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
