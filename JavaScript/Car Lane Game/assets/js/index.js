const CANVAS_WIDTH = 450,
  CANVAS_HEIGHT = window.innerHeight,
  LANE_WIDTH = CANVAS_WIDTH / 3,
  CAR_HEIGHT = 75,
  CAR_WIDTH = 75,
  FIRST_LANE = 0,
  SECOND_LANE = 1,
  THIRD_LANE = 2,
  OFFSET = 10,
  SPEED = 0.25;

let carSpeed = 2;

const restartBtn = document.querySelector(".end-game .restart-btn");
const startBtn = document.querySelector(".start-game .start-btn");
const gameStart = document.querySelector(".start-game");
const gameOver = document.querySelector(".end-game");

gameStart.style.display = "block";

const canvas = document.createElement("canvas");

// Initialize Canvas
let canvasInit = () => {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  canvas.style.backgroundColor = "grey";
  canvas.style.display = "block";
  canvas.style.border = "1px solid black";
  canvas.style.margin = "0 auto";
  document.body.appendChild(canvas);
};

let ctx = canvas.getContext("2d");

let scoreCanvas = () => {
  ctx.font = "9px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`Score : ${inGameScore}`, 50, 20);
};

// High Score
let highScoreCanvas = () => {
  ctx.font = "9px 'Press Start 2P'";
  ctx.fillStyle = "#fde52c";
  ctx.fillText(
    `High Score : ${localStorage.getItem("highScore") || 0}`,
    CANVAS_WIDTH - 70,
    20
  );
};

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("keydown", (e) => {
  if (e.key == "a" || e.key == "ArrowLeft") {
    if (playerCar.lane > 0) {
      playerCar.lane -= 1;
      playerCar.update();
      updateAll();
    }
  }

  if (e.key == "d" || e.key == "ArrowRight") {
    if (playerCar.lane < 2) {
      playerCar.lane += 1;
      playerCar.update();
      updateAll();
    }
  }
});

// Update Canvas - Clear and Draw
let updateAll = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  playerCar.draw();
  enemyCarList.forEach((enemyCar) => {
    enemyCar.draw();
  });
  firstLane.draw();
  secondLane.draw();
  scoreCanvas();
  highScoreCanvas();
};

// Detect Collision between player car and enemy car
let collisionDetection = (enemyCarInstance) => {
  if (
    playerCar.x < enemyCarInstance.x + CAR_WIDTH &&
    playerCar.x + CAR_WIDTH > enemyCarInstance.x &&
    playerCar.y < enemyCarInstance.y + CAR_HEIGHT &&
    playerCar.y + CAR_HEIGHT > enemyCarInstance.y
  ) {
    stopGame();
    gameOver.style.display = "block";
  }
};

let updateScore = (enemyInstance) => {
  if (enemyInstance.y > CANVAS_HEIGHT) {
    inGameScore++;
    enemyCarList.splice(enemyCarList.indexOf(enemyInstance), 1);
  }
};

let carGeneration, carAnimation;

// Create and animate enemy car
let startGame = () => {
  carGeneration = setInterval(() => {
    enemy.speed = carSpeed;
    let enemyCar = new Car(enemy);
    enemyCar.lane = generateRandomNumber(0, 3);
    enemyCarList.push(enemyCar);

    if (carSpeed < 10) {
      carSpeed += SPEED;
    }
  }, 2000);

  carAnimation = setInterval(() => {
    enemyCarList.forEach((eachEnemy, index) => {
      eachEnemy.draw();
      eachEnemy.update();
      collisionDetection(eachEnemy);
      updateScore(eachEnemy);
    });
    firstLane.update();
    updateAll();
  }, 1000 / 60);
};

let stopGame = () => {
  if (localStorage.getItem("highScore") < inGameScore) {
    localStorage.setItem("highScore", inGameScore);
  }
  clearInterval(carGeneration);
  clearInterval(carAnimation);
};

// Restart game on click
restartBtn.addEventListener("click", (e) => {
  gameOver.style.display = "block";
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameOver.style.display = "none";
  reset();
  startGame();
});

let firstLane, secondLane;

let playerCar;

let inGameScore;
let highScore;

let offset;

let enemyCarList;

let playerImage = new Image(),
  enemyImage = new Image();

playerImage.src = "./assets/img/player.png";
enemyImage.src = "./assets/img/enemy.png";

let player = {
  lane: SECOND_LANE,
  yPosition: CANVAS_HEIGHT - CAR_WIDTH - OFFSET,
  color: "blue",
  speed: 0,
  imgSrc: playerImage,
};

let enemy = {
  lane: FIRST_LANE,
  yPosition: 0,
  color: "red",
  speed: carSpeed,
  imgSrc: enemyImage,
};

// Reset Game
let reset = () => {
  firstLane = new Lane(LANE_WIDTH);
  secondLane = new Lane(LANE_WIDTH * 2);
  firstLane.draw();
  secondLane.draw();

  playerCar = new Car(player);
  playerCar.draw();

  carSpeed = 2;

  enemyCarList = [];
  offset = 1;

  inGameScore = 0;
};

// Initialize Game
let init = () => {
  canvasInit();
  reset();
  startGame();
  scoreCanvas();
  highScoreCanvas();
};

// Start Game
startBtn.addEventListener("click", (e) => {
  gameStart.style.display = "none";
  init();
});
