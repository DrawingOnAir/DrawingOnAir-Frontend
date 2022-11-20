import adaptCompositingType from "./adaptCompositingType";

/* eslint-disable prefer-destructuring */
let originX = null;
let originY = null;
let newCanvasX = null;
let newCanvasY = null;
let pathsry = [];
let points = [];

const drawWithHand = (
  hand,
  context,
  gesture,
  width,
  height,
  newContext,
  compositingType,
  canvasColor,
  canvasLineThickness,
) => {
  const { keypoints } = hand[0];
  const { x, y } = keypoints[8];

  context.strokeStyle = canvasColor;
  context.lineWidth = canvasLineThickness;

  if (points.length === 0) {
    points.push([originX, originY, canvasColor, canvasLineThickness]);
  }

  if (gesture === "clear") {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    pathsry = [];
  }

  if (gesture === "draw") {
    context.lineTo(x, y);
    points.push([x, y]);
    context.stroke();
    if (
      x - 5 < Math.floor(originX) &&
      Math.floor(originX) < x + 5 &&
      y - 5 < Math.floor(originY) &&
      Math.floor(originY) < y + 5
    ) {
      context.fillStyle = canvasColor;
      context.fill();
    }
  }

  if (gesture === "drag") {
    newCanvasX = x;
    newCanvasY = y;
    newContext.clearRect(0, 0, width, height);
    newContext.strokeRect(originX, originY, x - originX, y - originY);
  }

  if (gesture !== "draw" && gesture !== "drag") {
    if (newCanvasX && newCanvasY) {
      context.clearRect(0, 0, width, height);
      pathsry = adaptCompositingType(
        pathsry,
        newCanvasX,
        newCanvasY,
        originX,
        originY,
        context,
        compositingType,
        canvasColor,
        canvasLineThickness,
      );
      newCanvasX = null;
      newCanvasY = null;
    }
    newContext.clearRect(0, 0, width, height);

    originX = hand[0].keypoints[8].x;
    originY = hand[0].keypoints[8].y;
    context.beginPath();
    context.moveTo(originX, originY);
  }

  if (points[0][0] !== originX && points[0][1] !== originY) {
    if (points.length > 3) {
      pathsry.push(points);
    }

    points = [];
  }
};

export default drawWithHand;
