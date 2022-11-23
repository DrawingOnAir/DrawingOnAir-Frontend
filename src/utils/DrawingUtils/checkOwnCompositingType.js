const checkOwnCompositingType = (drawingDataArray, index, compositingType) => {
  if (!drawingDataArray[0][4]) {
    drawingDataArray[0][4] = compositingType;

    if (index === 0) {
      drawingDataArray[0][4] = "source-over";
    }
  }
};

export default checkOwnCompositingType;
