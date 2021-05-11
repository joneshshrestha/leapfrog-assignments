const SPEED = 1;
const BALLS_COUNT = 100;
const CANVAS_OFFSET = 50;
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 780;

let canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.display = "block";
canvas.style.margin = "0px auto";
canvas.style.backgroundColor = "white";
canvas.style.border = "3px solid black";
let ctx = canvas.getContext("2d");
let img = new Image();

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

let generateRandomColor = () => {
  return `rgb(0,0,0)`;
};

// Ball class
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() < 0.5 ? -1 : 1;
    this.dy = Math.random() < 0.5 ? -1 : 1;
    this.radius = generateRandomNumber(10, 10);
    this.mass = 1;
  }

  // Draw ball
  draw() {
    ctx.drawImage(img, this.x, this.y, 40, 40);
    img.src = "./assets/img/ant.png";
  }

  // Update position of ball
  update() {
    this.x = this.x + this.dx * SPEED;
    this.y = this.y + this.dy * SPEED;

    if (
      this.x + this.radius >= CANVAS_WIDTH - 40 ||
      this.x - this.radius <= -30
    ) {
      this.dx *= -1;
    }
    if (
      this.y - this.radius <= -30 ||
      this.y + this.radius >= CANVAS_HEIGHT - 40
    ) {
      this.dy *= -1;
    }
  }
}

let rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
};

// After Collision
let collision = (ballA, ballB) => {
  let dxDiff = ballA.dx - ballB.dx;
  let dyDiff = ballA.dy - ballB.dy;

  let xDist = ballB.x - ballA.x;
  let yDist = ballB.y - ballA.y;

  if (dxDiff * xDist + dyDiff * yDist >= 0) {
    const angle = -Math.atan2(yDist, xDist);

    let m1 = ballA.mass;
    let m2 = ballB.mass;

    let u1 = rotate(
      {
        x: ballA.dx,
        y: ballA.dy,
      },
      angle
    );
    let u2 = rotate(
      {
        x: ballB.dx,
        y: ballB.dy,
      },
      angle
    );

    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    let vf1 = rotate(v1, -angle);
    let vf2 = rotate(v2, -angle);

    ballA.dx = vf1.x;
    ballA.dy = vf1.y;

    ballB.dx = vf2.x;
    ballB.dy = vf2.y;
  }
};

let detectCollision = (ball) => {
  for (eachBallFromList in ballList) {
    var dx = ball.x - ballList[eachBallFromList].x;
    var dy = ball.y - ballList[eachBallFromList].y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + ballList[eachBallFromList].radius) {
      collision(ball, ballList[eachBallFromList]);
    }
  }
};

let isColliding = (ball) => {
  for (eachBallFromBallList in ballList) {
    var dx = ball.x - ballList[eachBallFromBallList].x;
    var dy = ball.y - ballList[eachBallFromBallList].y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + ballList[eachBallFromBallList].radius) {
      return true;
    }
  }

  return false;
};

let animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ballList.forEach((ball) => {
    ball.draw();
    ball.update();
    detectCollision(ball);
  });
};

let ballList = [];

let init = () => {
  for (var ballNumber = 0; ballNumber < BALLS_COUNT; ballNumber++) {
    do {
      var ball = new Ball(
        generateRandomNumber(50, CANVAS_WIDTH - CANVAS_OFFSET),
        generateRandomNumber(50, CANVAS_HEIGHT - CANVAS_OFFSET)
      );
    } while (isColliding(ball));
    ballList.push(ball);
  }
};

let mousePressed = (clickX, clickY) => {
  for (let i = 0; i < ballList.length; i++) {
    if (
      Math.abs(ballList[i].x - clickX) < 10 &&
      Math.abs(ballList[i].y - clickY < 10)
    ) {
      //   ctx.clearRect();
    }
  }
};
document.addEventListener("click", function (e) {
  console.log(`${e.x} | ${e.y}`);
  mousePressed(e.x, e.y);
});

setInterval(animate, 1000 / 60);

init();
