import * as fingerPose from "../../Fingerpose";
import recognizeHandsGesture from "../DrawingUtils/recognizeHandsGesture";

const detectHands = async (
  network,
  video,
  setIsLoading,
  contextArray,
  canvasWidth,
  canvasHeight,
  compositingType,
  canvasColor,
  canvasLineThickness,
) => {
  try {
    const hands = await network.estimateHands(video);

    if (hands.length !== 0) {
      setIsLoading(false);
    }

    if (hands.length > 0) {
      const GE = new fingerPose.GestureEstimator([
        fingerPose.Gestures.ClearGesture,
        fingerPose.Gestures.DragGesture,
        fingerPose.Gestures.DrawGesture,
        fingerPose.Gestures.NoneGesture,
        fingerPose.Gestures.NoneTwoGesture,
      ]);

      hands.forEach((hand) => {
        const gesture = GE.estimate(hand, 8);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score,
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence),
          );

          if (hand.handedness === "Right") {
            recognizeHandsGesture(
              hand,
              contextArray[0],
              contextArray[1],
              contextArray[2],
              gesture.gestures[maxConfidence].name,
              canvasWidth,
              canvasHeight,
              compositingType,
              canvasColor,
              canvasLineThickness,
            );
          }

          if (hand.handedness === "Left") {
            recognizeHandsGesture(
              hand,
              contextArray[0],
              contextArray[3],
              contextArray[4],
              gesture.gestures[maxConfidence].name,
              canvasWidth,
              canvasHeight,
              compositingType,
              canvasColor,
              canvasLineThickness,
            );
          }
        }
      });
    }
  } catch (error) {
    throw new Error("손 동작 감지에 실패하였습니다.");
  }
};

export default detectHands;
