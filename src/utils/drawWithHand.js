/* eslint-disable prefer-destructuring */
const strokeStyle = "default";
const lineWidth = "default";

let newCanvasX = null;
let newCanvasY = null;
let pathsry = [];
let points = [];

const checkStrokeStyle = (context) => {
  if (strokeStyle === "default") {
    context.strokeStyle = "black";
  }

  context.strokeStyle = strokeStyle;
};

const checkLineWidth = (context) => {
  if (lineWidth === "default") {
    context.lineWidth = 2.5;
  }

  context.lineWidth = lineWidth;
};

const drawWithHand = (
  hand,
  context,
  gesture,
  width,
  height,
  originX,
  originY,
  newContext,
  compositingType,
) => {
  const { keypoints } = hand[0];
  const { x, y } = keypoints[8];

  checkStrokeStyle(context);
  checkLineWidth(context);

  if (points.length === 0) {
    points.push([originX, originY]);
  }

  if (gesture === "start") {
    context.beginPath();
    context.moveTo(x, y);
  }

  if (gesture === "draw") {
    context.lineTo(x, y);
    context.stroke();
    points.push([x, y]);

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
    pathsry = [];
  }

  if (gesture === "drag") {
    const w = x - originX;
    const h = y - originY;

    newCanvasX = x;
    newCanvasY = y;
    newContext.clearRect(0, 0, width, height);
    newContext.strokeRect(originX, originY, w, h);
  }

  if (gesture !== "drag") {
    if (newCanvasX && newCanvasY) {
      context.clearRect(originX, originY, x - originX, y - originY);

      if (pathsry.length !== 0) {
        pathsry = pathsry.filter((arr, index) => {
          const maximumX = arr.reduce((a, b) => Math.max(a, b[0]), -Infinity);
          const minimumX = arr.reduce((a, b) => Math.min(a, b[0]), Infinity);
          const maximumY = arr.reduce((a, b) => Math.max(a, b[1]), -Infinity);
          const minimumY = arr.reduce((a, b) => Math.min(a, b[1]), Infinity);

          if (x > originX && y > originY) {
            if (
              maximumX >= originX &&
              minimumX <= x &&
              maximumY >= originY &&
              minimumY <= y
            ) {
              context.globalCompositeOperation = compositingType;

              if (index === 0) {
                context.globalCompositeOperation = "source-over";
              }
              context.beginPath();
              context.moveTo(arr[0][0], arr[0][1]);

              for (let i = 1; i < arr.length; i += 1) {
                context.lineTo(arr[i][0], arr[i][1]);
                context.stroke();
              }
              if (
                arr[arr.length - 1][0] - 15 < Math.floor(arr[0][0]) &&
                Math.floor(arr[0][0]) < arr[arr.length - 1][0] + 15 &&
                arr[arr.length - 1][1] - 15 < Math.floor(arr[0][1]) &&
                Math.floor(arr[0][1]) < arr[arr.length - 1][1] + 15
              ) {
                context.fill();
              }

              context.globalCompositeOperation = "source-over";

              return false;
            }
            return true;
          }

          if (x > originX && y < originY) {
            if (
              maximumX >= originX &&
              minimumX <= x &&
              maximumY >= y &&
              minimumY <= originY
            ) {
              context.globalCompositeOperation = compositingType;

              if (index === 0) {
                context.globalCompositeOperation = "source-over";
              }
              context.beginPath();
              context.moveTo(arr[0][0], arr[0][1]);

              for (let i = 1; i < arr.length; i += 1) {
                context.lineTo(arr[i][0], arr[i][1]);
                context.stroke();
              }

              if (
                arr[arr.length - 1][0] - 15 < Math.floor(arr[0][0]) &&
                Math.floor(arr[0][0]) < arr[arr.length - 1][0] + 15 &&
                arr[arr.length - 1][1] - 15 < Math.floor(arr[0][1]) &&
                Math.floor(arr[0][1]) < arr[arr.length - 1][1] + 15
              ) {
                context.fill();
              }

              context.globalCompositeOperation = "source-over";
              
              return false;
            }
            return true;
          }

          if (x < originX && y > originY) {
            if (
              maximumX >= x &&
              minimumX <= originX &&
              maximumY >= originY &&
              minimumX <= y
            ) {
              context.globalCompositeOperation = compositingType;
              
              if (index === 0) {
                context.globalCompositeOperation = "source-over";
              }
              
              context.beginPath();
              context.moveTo(arr[0][0], arr[0][1]);
              
              for (let i = 1; i < arr.length; i += 1) {
                context.lineTo(arr[i][0], arr[i][1]);
                context.stroke();
              }
              
              if (
                arr[arr.length - 1][0] - 15 < Math.floor(arr[0][0]) &&
                Math.floor(arr[0][0]) < arr[arr.length - 1][0] + 15 &&
                arr[arr.length - 1][1] - 15 < Math.floor(arr[0][1]) &&
                Math.floor(arr[0][1]) < arr[arr.length - 1][1] + 15
              ) {
                context.fill();
              }
              
              context.globalCompositeOperation = "source-over";
              
              return false;
            }
            return true;
          }

          if (x < originX && y < originY) {
            if (
              maximumX >= x &&
              minimumX <= originX &&
              maximumY >= y &&
              minimumY <= originY
            ) {
              context.globalCompositeOperation = compositingType;
              
              if (index === 0) {
                context.globalCompositeOperation = "source-over";
              }
              
              context.beginPath();
              context.moveTo(arr[0][0], arr[0][1]);
              
              for (let i = 1; i < arr.length; i += 1) {
                context.lineTo(arr[i][0], arr[i][1]);
                context.stroke();
              }
              
              if (
                arr[arr.length - 1][0] - 15 < Math.floor(arr[0][0]) &&
                Math.floor(arr[0][0]) < arr[arr.length - 1][0] + 15 &&
                arr[arr.length - 1][1] - 15 < Math.floor(arr[0][1]) &&
                Math.floor(arr[0][1]) < arr[arr.length - 1][1] + 15
              ) {
                context.fill();
              }
              
              context.globalCompositeOperation = "source-over";
              
              return false;
            }
            return true;
          }
          return true;
        });
      }

      newCanvasX = null;
      newCanvasY = null;
    }
    
    newContext.clearRect(0, 0, width, height);
  }

  if (points[0][0] !== originX && points[0][1] !== originY) {
    if (points.length !== 1) {
      pathsry.push(points);
    }

    points = [];
  }
};

export default drawWithHand;
