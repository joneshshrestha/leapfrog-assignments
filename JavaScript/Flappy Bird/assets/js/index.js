const CANVAS = document.getElementById("canvas");
const ctx = CANVAS.getContext("2d");

const S_POINT = new Audio();
S_POINT.src = "./assets/sounds/BIRD-point.wav";
S_POINT.volume = 0.05;
const S_FLAP = new Audio();
S_FLAP.src = "./assets/sounds/BIRD-flap.wav";
S_FLAP.volume = 0.01;
const S_DIE = new Audio();
S_DIE.src = "./assets/sounds/BIRD-die.wav";
S_DIE.volume = 0.05;
const S_HIT = new Audio();
S_HIT.src = "./assets/sounds/BIRD-hit.wav";
S_HIT.volume = 0.01;

const WORLD = {
  width: CANVAS.offsetWidth,
  height: CANVAS.offsetHeight,
  speed: 1,
  maxSpeed: 2,
  score: 0,
  topScore: 0,
  timer: 0,
  sky: new Image(),
  draw() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    ctx.drawImage(
      this.sky,
      WORLD.width -
        (((this.timer + 55000) * 0.02) % (WORLD.width + this.sky.width)),
      140,
      this.sky.width / 2,
      this.sky.height / 2
    );
    ctx.drawImage(
      this.sky,
      WORLD.width -
        (((this.timer + 5000) * 0.05) % (WORLD.width + this.sky.width)),
      100
    );
  },
  drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.fillText(`Score: ${this.score}`, 15, 30);
    ctx.fillText(`Top score: ${this.topScore}`, 15, 50);
  },
  drawGameOver() {
    ctx.font = "40px 'Press Start 2P'";
    ctx.fillText("Game over!", WORLD.width / 2 - 160, WORLD.height / 2);
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillText(
      "Press Space to restart",
      WORLD.width / 2 - 185,
      WORLD.height / 2 + 40
    );
  },
};

WORLD.sky.src = "./assets/img/sky.png";
const BIRD = {
  x: 50,
  y: WORLD.height / 2 - 40,
  width: 40,
  height: 45,
  gravity: 0,
  resist: false,
  img: new Image(this.width, this.height),
  draw() {
    ctx.translate(this.x, this.y);
    ctx.rotate(0.02 * this.gravity);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.rotate(-0.02 * this.gravity);
    ctx.translate(-this.x, -this.y);
  },
  fly() {
    S_FLAP.play();
    this.gravity = this.gravity = -4.5;
  },
};

BIRD.img.src = "./assets/img/bird.png";

const tubes = [
  new Tube(WORLD.width),
  new Tube(WORLD.width * 1.25),
  new Tube(WORLD.width * 1.5),
  new Tube(WORLD.width * 1.75),
];
let fly = () => {
  if (WORLD.speed === 0) WORLD.speed = 1;
  BIRD.fly();
};

document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    fly();
  }
});

function Tube(x) {
  this.x = x;
  this.y = 0;
  this.width = 64;
  this.height = 150;
  this.distance = 200;
  this.img = new Image();
  this.img.src = "./assets/img/tube.png";
  this.draw = () => {
    ctx.drawImage(
      this.img,
      this.x,
      this.y - this.img.height + this.height,
      this.width,
      this.img.height
    );
    ctx.drawImage(
      this.img,
      this.x,
      this.y + this.height + this.distance,
      this.width,
      this.img.height
    );
  };
}
function reset() {
  BIRD.y = WORLD.height / 2;
  BIRD.gravity = 1;
  WORLD.speed = 0;
  WORLD.timer = 0;
  WORLD.topScore = Math.max(WORLD.score, WORLD.topScore);
  WORLD.score = 0;
  BIRD.img.src = "./assets/img/bird.png";
  tubes.forEach((tube) => {
    tube.x = tube.x + WORLD.width / 4;
  });
}
const frameTime = 1000 / 60;
function render() {
  if (WORLD.speed) {
    BIRD.y = BIRD.y + BIRD.gravity;
    BIRD.gravity = BIRD.gravity + ((1.5 * 9.8) / 1000) * frameTime;
    WORLD.timer += frameTime;
  }
  WORLD.draw();
  BIRD.draw();
  tubes.forEach((tube) => {
    tube.x = tube.x - (WORLD.speed / 10) * frameTime;
    tube.draw();
    const isTubeOutOfScreen = tube.x + tube.width < 0;
    if (isTubeOutOfScreen) {
      tube.x = WORLD.width;
      tube.height = Math.random() * 250 + 50;
      WORLD.speed = Math.min(WORLD.speed + 0.1, WORLD.maxSpeed);
      WORLD.score = WORLD.score + 1;
      const isNextLevel = WORLD.score % 10 === 0;
      if (isNextLevel) S_POINT.play();
      if (WORLD.score % 50 === 0) {
        BIRD.resist = true;
        BIRD.img.src = "./assets/img/resistBIRD.png";
      }
    }
    const isTubeReachBIRD =
      tube.x < BIRD.x + BIRD.width / 2 && tube.x + tube.width > BIRD.x;
    if (isTubeReachBIRD) {
      const isTubeHitBIRD =
        tube.height > BIRD.y ||
        BIRD.y + BIRD.height > tube.height + tube.distance;
      if (isTubeHitBIRD) {
        S_HIT.play();
        if (!BIRD.resist) reset();
        BIRD.img.src = "./assets/img/bird.png";
        setTimeout(() => {
          BIRD.resist = false;
        }, 1000);
      }
    }
  });

  WORLD.drawScore();
  const isBIRDOutOfScreen = BIRD.y > WORLD.height || BIRD.y < 0;
  if (isBIRDOutOfScreen) {
    S_DIE.play();
    reset();
  }
  if (!WORLD.speed) WORLD.drawGameOver();
}
setInterval(render, frameTime);
