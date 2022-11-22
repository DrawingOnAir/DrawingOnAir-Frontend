import adaptCompositingType from "./adaptCompositingType";
import drawData from "./drawData";

/* eslint-disable prefer-destructuring */
const originX = {};
const originY = {};
const draggingAreaX = {};
const draggingAreaY = {};
const points = {
  Right: [],
  Left: [],
};

let pathsry = [];

const drawWithHand = (
  hand,
  originContext,
  drawingContext,
  draggingContext,
  gesture,
  canvasWidth,
  canvasHeight,
  compositingType,
  canvasColor,
  canvasLineThickness,
  handType,
) => {
  const { keypoints } = hand;
  const { x, y } = keypoints[8];

  drawingContext.strokeStyle = canvasColor;
  drawingContext.lineWidth = canvasLineThickness;

  if (points[handType].length === 0) {
    points[handType].push([
      originX[handType],
      originY[handType],
      canvasColor,
      canvasLineThickness,
    ]);
  }

  switch (gesture) {
    case "clear":
      pathsry = [];

      originContext.clearRect(0, 0, canvasWidth, canvasHeight);
      originContext.beginPath();

      break;
    case "draw":
      points[handType].push([x, y]);

      drawingContext.lineTo(x, y);
      drawingContext.stroke();

      if (
        x - 5 < Math.floor(originX) &&
        Math.floor(originX) < x + 5 &&
        y - 5 < Math.floor(originY) &&
        Math.floor(originY) < y + 5
      ) {
        drawingContext.fillStyle = canvasColor;
        drawingContext.fill();
      }

      break;
    case "drag":
      draggingAreaX[handType] = x;
      draggingAreaY[handType] = y;

      draggingContext.clearRect(0, 0, canvasWidth, canvasHeight);
      draggingContext.strokeRect(
        originX[handType],
        originY[handType],
        x - originX[handType],
        y - originY[handType],
      );

      break;
    default:
      if (draggingAreaX[handType] && draggingAreaY[handType]) {
        originContext.clearRect(0, 0, canvasWidth, canvasHeight);

        pathsry = adaptCompositingType(
          pathsry,
          draggingAreaX[handType],
          draggingAreaY[handType],
          originX[handType],
          originY[handType],
          originContext,
          compositingType,
          canvasColor,
          canvasLineThickness,
        );

        draggingAreaX[handType] = null;
        draggingAreaY[handType] = null;
      }

      draggingContext.clearRect(0, 0, canvasWidth, canvasHeight);

      pathsry = pathsry.map((arr) => {
        drawData(originContext, arr);
        return arr;
      });

      originX[handType] = x;
      originY[handType] = y;

      drawingContext.beginPath();
      drawingContext.moveTo(originX[handType], originY[handType]);
  }

  if (
    points[handType][0][0] !== originX[handType] &&
    points[handType][0][1] !== originY[handType]
  ) {
    if (points[handType].length > 3) {
      pathsry.push(points[handType]);
    }

    points[handType] = [];
  }
};

export default drawWithHand;
