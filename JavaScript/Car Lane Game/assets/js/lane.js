class Lane {
  constructor(xCoordinate) {
    this.x = xCoordinate;
  }

  // Create Lane
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, 0);
    ctx.lineTo(this.x, CANVAS_HEIGHT);
    ctx.setLineDash([40, 55]);
    ctx.lineDashOffset = -offset;
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  // Animate Lane
  update() {
    offset += carSpeed;
  }
}
