import checkOwnCompositingType from "./checkOwnCompositingType";
import drawData from "./drawData";

const adaptCompositingType = (
  pathsry,
  draggingAreaX,
  draggingAreaY,
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

      if (draggingAreaX > originX && draggingAreaY > originY) {
        if (
          maximumX >= originX &&
          minimumX <= draggingAreaX &&
          maximumY >= originY &&
          minimumY <= draggingAreaY
        ) {
          checkOwnCompositingType(arr, index, compositingType);
        }
      }

      if (draggingAreaX > originX && draggingAreaY < originY) {
        if (
          maximumX >= originX &&
          minimumX <= draggingAreaX &&
          maximumY >= draggingAreaY &&
          minimumY <= originY
        ) {
          checkOwnCompositingType(arr, index, compositingType);
        }
      }

      if (draggingAreaX < originX && draggingAreaY > originY) {
        if (
          maximumX >= draggingAreaX &&
          minimumX <= originX &&
          maximumY >= originY &&
          minimumX <= draggingAreaY
        ) {
          checkOwnCompositingType(arr, index, compositingType);
        }
      }

      if (draggingAreaX < originX && draggingAreaY < originY) {
        if (
          maximumX >= draggingAreaX &&
          minimumX <= originX &&
          maximumY >= draggingAreaY &&
          minimumY <= originY
        ) {
          checkOwnCompositingType(arr, index, compositingType);
        }
      }
      drawData(context, arr);

      return arr;
    });
  }
  return pathsry;
};

export default adaptCompositingType;
