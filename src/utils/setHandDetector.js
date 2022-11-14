import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

const setHandDetector = async () => {
  const hands = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    modelType: "full",
    maxHands: 10,
  };
  const handsDetector = await handPoseDetection.createDetector(
    hands,
    detectorConfig,
  );

  return handsDetector;
};

export default setHandDetector;
