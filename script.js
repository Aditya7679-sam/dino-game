// Get elements
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOverText = document.getElementById("game-over");
const scoreText = document.getElementById("score");

let isJumping = false;
let isGameOver = false;
let score = 0;
let speed = 5; // Starting speed

// Jump function
function jump() {
  if (isJumping || isGameOver) return;

  isJumping = true;
  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

// Handle spacebar
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (isGameOver) {
      restartGame();
    } else {
      jump();
    }
  }
});

// Touch for mobile
document.addEventListener("touchstart", function () {
  if (isGameOver) {
    restartGame();
  } else {
    jump();
  }
});

// Move cactus
function moveCactus() {
  let cactusLeft = 600;

  const moveInterval = setInterval(() => {
    if (cactusLeft < -20) {
      cactusLeft = 600;
      score += 1;
      speed += 0.2;
      scoreText.innerText = `Score: ${score}`;
    } else {
      cactusLeft -= speed;
    }

    cactus.style.left = cactusLeft + "px";

    // Collision detection
    if (
      cactusLeft > 50 &&
      cactusLeft < 90 &&
      parseInt(dino.style.bottom) < 40
    ) {
      clearInterval(moveInterval);
      gameOver();
    }
  }, 20);
}

// Game over
function gameOver() {
  isGameOver = true;
  gameOverText.style.display = "block";
}

// Restart
function restartGame() {
  score = 0;
  speed = 5;
  isGameOver = false;
  dino.style.bottom = "0px";
  gameOverText.style.display = "none";
  scoreText.innerText = "Score: 0";
  cactus.style.left = "600px";
  moveCactus();
}

// Start the game
restartGame();
