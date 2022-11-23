import adaptCompositingType from "./adaptCompositingType";
import drawData from "./drawData";

const originX = {};
const originY = {};
const draggingAreaX = {};
const draggingAreaY = {};
const points = {
  Right: [],
  Left: [],
};

let pathsry = [];

const recognizeHandsGesture = (
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
) => {
  const { keypoints, handedness } = hand;
  const { x, y } = keypoints[8];

  drawingContext.strokeStyle = canvasColor;
  drawingContext.lineWidth = canvasLineThickness;

  if (points[handedness].length === 0) {
    points[handedness].push([
      originX[handedness],
      originY[handedness],
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
      points[handedness].push([x, y]);

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
      draggingAreaX[handedness] = x;
      draggingAreaY[handedness] = y;

      draggingContext.clearRect(0, 0, canvasWidth, canvasHeight);
      draggingContext.strokeRect(
        originX[handedness],
        originY[handedness],
        x - originX[handedness],
        y - originY[handedness],
      );

      break;
    default:
      if (draggingAreaX[handedness] && draggingAreaY[handedness]) {
        originContext.clearRect(0, 0, canvasWidth, canvasHeight);

        pathsry = adaptCompositingType(
          pathsry,
          draggingAreaX[handedness],
          draggingAreaY[handedness],
          originX[handedness],
          originY[handedness],
          originContext,
          compositingType,
        );

        draggingAreaX[handedness] = null;
        draggingAreaY[handedness] = null;
      }

      draggingContext.clearRect(0, 0, canvasWidth, canvasHeight);
      drawingContext.clearRect(0, 0, canvasWidth, canvasHeight);

      pathsry = pathsry.map((arr) => {
        drawData(originContext, arr);
        return arr;
      });

      originX[handedness] = x;
      originY[handedness] = y;

      drawingContext.beginPath();
      drawingContext.moveTo(originX[handedness], originY[handedness]);
  }

  if (
    points[handedness][0][0] !== originX[handedness] &&
    points[handedness][0][1] !== originY[handedness]
  ) {
    if (points[handedness].length > 3) {
      pathsry.push(points[handedness]);
    }

    points[handedness] = [];
  }
};

export default recognizeHandsGesture;
