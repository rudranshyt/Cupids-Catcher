const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const borderWidth = 10;

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  size: 30,
  speed: 5,
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  },
};

const hearts = [];
let score = 0;

function generateHearts(numHearts) {
  for (let i = 0; i < numHearts; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: (Math.random() * canvas.height) / 2,
      size: Math.random() * (40 - 20) + 20,
      isCollected: false,
      image: "💖",
    });
  }
}

function drawHearts() {
  for (let heart of hearts) {
    if (!heart.isCollected) {
      ctx.font = heart.size + "px serif";
      ctx.fillText(
        heart.image,
        heart.x - heart.size / 4,
        heart.y + heart.size / 4
      );
    }
  }
}

function checkCollision() {
  for (let i = 0; i < hearts.length; i++) {
    const heart = hearts[i];
    const distanceX = Math.abs(player.x - heart.x);
    const distanceY = Math.abs(player.y - heart.y);

    if (
      distanceX < player.size / 2 + heart.size / 2 &&
      distanceY < player.size / 2 + heart.size / 2 &&
      !heart.isCollected
    ) {
      hearts[i].isCollected = true;
      score++;
    }
  }
  if (score === hearts.length) {
    alert(
      "Congratulations! You collected all the hearts! \n Click ok to Claim your reward"
    );
    window.location.href = "../templates/teddy.html";
  }

  if (
    player.x - player.size / 2 < borderWidth ||
    player.x + player.size / 2 > canvas.width - borderWidth ||
    player.y - player.size / 2 < borderWidth ||
    player.y + player.size / 2 > canvas.height - borderWidth
  ) {
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
  }
}

let isLeftPressed = false;
let isRightPressed = false;
let isUpPressed = false;
let isDownPressed = false;

function updatePlayer() {
  if (isLeftPressed && player.x > player.size / 2) {
    player.x -= player.speed;
  } else if (isRightPressed && player.x < canvas.width - player.size / 2) {
    player.x += player.speed;
  }

  if (isUpPressed && player.y > player.size / 2) {
    player.y -= player.speed;
  } else if (isDownPressed && player.y < canvas.height - player.size / 2) {
    player.y += player.speed;
  }
}

function drawBorder() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, borderWidth, canvas.height);
  ctx.fillRect(0, 0, canvas.width, borderWidth);
  ctx.fillRect(canvas.width - borderWidth, 0, borderWidth, canvas.height);
  ctx.fillRect(0, canvas.height - borderWidth, canvas.width, borderWidth);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  drawBorder();
  drawHearts();
  player.draw();

  checkCollision();

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(animate);
}

generateHearts(15);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    isLeftPressed = true;
  } else if (event.key === "ArrowRight") {
    isRightPressed = true;
  } else if (event.key === "ArrowUp") {
    isUpPressed = true;
  } else if (event.key === "ArrowDown") {
    isDownPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    isLeftPressed = false;
  } else if (event.key === "ArrowRight") {
    isRightPressed = false;
  } else if (event.key === "ArrowUp") {
    isUpPressed = false;
  } else if (event.key === "ArrowDown") {
    isDownPressed = false;
  }
});

animate();
