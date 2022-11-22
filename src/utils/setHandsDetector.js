import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const setHandsDetector = async () => {
  const hands = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    modelType: "full",
    maxHands: 2,
  };
  const handsDetector = await handPoseDetection.createDetector(
    hands,
    detectorConfig,
  );

  return handsDetector;
};

export default setHandsDetector;
