import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지만 위로.
const drawDescription = new GestureDescription("indexFinger");

// 엄지:
drawDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
drawDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
drawDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지:
drawDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
drawDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
drawDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
drawDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0,
);
drawDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
drawDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0,
);

// 중지, 약지, 소지
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  drawDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  drawDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default drawDescription;
