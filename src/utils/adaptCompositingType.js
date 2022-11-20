/* eslint-disable prefer-destructuring */

const adaptCompositingType = (
  pathsry,
  x,
  y,
  originX,
  originY,
  context,
  compositingType,
) => {
  if (pathsry.length !== 0) {
    pathsry = pathsry.map((arr, index) => {
      const maximumX = arr.reduce((a, b) => Math.max(a, b[0]), -Infinity);
      const minimumX = arr.reduce((a, b) => Math.min(a, b[0]), Infinity);
      const maximumY = arr.reduce((a, b) => Math.max(a, b[1]), -Infinity);
      const minimumY = arr.reduce((a, b) => Math.min(a, b[1]), Infinity);

      context.strokeStyle = arr[0][2];
      context.lineWidth = arr[0][3];

      if (x > originX && y > originY) {
        if (
          maximumX >= originX &&
          minimumX <= x &&
          maximumY >= originY &&
          minimumY <= y
        ) {
          if (!arr[0][4]) {
            arr[0][4] = compositingType;

            if (index === 0) {
              arr[0][4] = "source-over";
            }
          }
        }
      }

      if (x > originX && y < originY) {
        if (
          maximumX >= originX &&
          minimumX <= x &&
          maximumY >= y &&
          minimumY <= originY
        ) {
          if (!arr[0][4]) {
            arr[0][4] = compositingType;

            if (index === 0) {
              arr[0][4] = "source-over";
            }
          }
        }
      }

      if (x < originX && y > originY) {
        if (
          maximumX >= x &&
          minimumX <= originX &&
          maximumY >= originY &&
          minimumX <= y
        ) {
          if (!arr[0][4]) {
            arr[0][4] = compositingType;

            if (index === 0) {
              arr[0][4] = "source-over";
            }
          }
        }
      }

      if (x < originX && y < originY) {
        if (
          maximumX >= x &&
          minimumX <= originX &&
          maximumY >= y &&
          minimumY <= originY
        ) {
          if (!arr[0][4]) {
            arr[0][4] = compositingType;

            if (index === 0) {
              arr[0][4] = "source-over";
            }
          }
        }
      }

      if (arr[0][4]) {
        context.globalCompositeOperation = arr[0][4];
      }

      context.beginPath();
      context.moveTo(arr[0][0], arr[0][1]);

      for (let i = 1; i < arr.length; i += 1) {
        context.lineTo(arr[i][0], arr[i][1]);
        context.stroke();

        if (
          arr[i][0] - 5 < Math.floor(arr[0][0]) &&
          Math.floor(arr[0][0]) < arr[i][0] + 5 &&
          arr[i][1] - 5 < Math.floor(arr[0][1]) &&
          Math.floor(arr[0][1]) < arr[i][1] + 5
        ) {
          context.fillStyle = arr[0][2];
          context.fill();
        }
      }

      context.globalCompositeOperation = "source-over";

      return arr;
    });
  }
  return pathsry;
};

export default adaptCompositingType;
