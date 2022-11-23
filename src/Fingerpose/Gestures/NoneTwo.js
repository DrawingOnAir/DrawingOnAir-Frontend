import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지, 중지, 약지 위로
const noneTwoDescription = new GestureDescription("none-two");

// 엄지:
noneTwoDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
noneTwoDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0,
);
noneTwoDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지, 중지:
[Finger.Index, Finger.Middle, Finger.Ring].forEach((finger) => {
  noneTwoDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  noneTwoDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  noneTwoDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  noneTwoDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  noneTwoDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  noneTwoDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
});

// 소지
[Finger.Pinky].forEach((finger) => {
  noneTwoDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  noneTwoDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default noneTwoDescription;
