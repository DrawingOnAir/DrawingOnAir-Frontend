/* eslint-disable prefer-destructuring */

const drawData = (context, drawingDataArray) => {
  if (drawingDataArray[0][4]) {
    context.globalCompositeOperation = drawingDataArray[0][4];
  }
  context.strokeStyle = drawingDataArray[0][2];
  context.lineWidth = drawingDataArray[0][3];
  context.beginPath();
  context.moveTo(drawingDataArray[0][0], drawingDataArray[0][1]);

  for (let i = 1; i < drawingDataArray.length; i += 1) {
    context.lineTo(drawingDataArray[i][0], drawingDataArray[i][1]);
    context.stroke();

    if (
      drawingDataArray[i][0] - 5 < Math.floor(drawingDataArray[0][0]) &&
      Math.floor(drawingDataArray[0][0]) < drawingDataArray[i][0] + 5 &&
      drawingDataArray[i][1] - 5 < Math.floor(drawingDataArray[0][1]) &&
      Math.floor(drawingDataArray[0][1]) < drawingDataArray[i][1] + 5
    ) {
      context.fillStyle = drawingDataArray[0][2];
      context.fill();
    }
  }

  context.globalCompositeOperation = "source-over";
};

export default drawData;
