import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지, 중지만 위로
const exampleDescription = new GestureDescription("example");

// 엄지:
exampleDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
exampleDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0,
);
exampleDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지, 중지:
[Finger.Index, Finger.Middle, Finger.Ring].forEach((finger) => {
  exampleDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  exampleDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  exampleDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  exampleDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  exampleDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  exampleDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
});

// 약지, 소지
[Finger.Pinky].forEach((finger) => {
  exampleDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  exampleDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default exampleDescription;
