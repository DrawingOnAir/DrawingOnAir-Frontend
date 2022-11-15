const drawWithHand = (
  hand,
  context,
  gesture,
  width,
  height,
  originX,
  originY,
) => {
  const { keypoints } = hand[0];
  const { x, y } = keypoints[8];

  context.strokeStyle = "black";
  context.lineWidth = 2.5;

  if (gesture === "start") {
    context.beginPath();
    context.moveTo(x, y);
  }

  if (gesture === "draw") {
    context.lineTo(x, y);
    context.stroke();

    if (
      x - 15 < Math.floor(originX) &&
      Math.floor(originX) < x + 15 &&
      y - 15 < Math.floor(originY) &&
      Math.floor(originY) < y + 15
    ) {
      context.fill();
    }
  }

  if (gesture === "clear") {
    context.clearRect(0, 0, width, height);
    context.beginPath();
  }
};

export default drawWithHand;
