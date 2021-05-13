class Car {
  constructor(car) {
    this.lane = car.lane;
    this.x = (this.lane + 0.5) * LANE_WIDTH - CAR_WIDTH / 2; 
    this.y = car.yPosition;
    this.color = car.color;
    this.speed = car.speed;
    this.src = car.imgSrc;
  }

  // Draw Enemy and Player
  draw() {
    ctx.beginPath();
    ctx.drawImage(this.src, this.x, this.y);
  }

  // Animate position
  update() {
    this.x = (this.lane + 0.5) * LANE_WIDTH - CAR_WIDTH / 2;
    this.y += this.speed;
  }
}
