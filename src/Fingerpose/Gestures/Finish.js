import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지, 소지만 위로.
const finishDescription = new GestureDescription("finish");

// 엄지
finishDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
finishDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0,
);
finishDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지 소지
[Finger.Index, Finger.Pinky].forEach((finger) => {
  finishDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  finishDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  finishDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  finishDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  finishDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  finishDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
});

// 중지, 약지
[Finger.Middle, Finger.Ring].forEach((finger) => {
  finishDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  finishDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default finishDescription;
