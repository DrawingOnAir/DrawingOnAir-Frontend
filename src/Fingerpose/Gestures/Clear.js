import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 주먹형태
const clearDescription = new GestureDescription("clear");

// 엄지:
clearDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
clearDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
clearDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  0.9,
);
clearDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  0.9,
);

// 엄지를 제외한 나머지
[Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  clearDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  clearDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

clearDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0,
);
clearDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0,
);
clearDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0,
);
clearDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0,
);

export default clearDescription;
