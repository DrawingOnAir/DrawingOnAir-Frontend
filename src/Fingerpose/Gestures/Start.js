import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지, 소지만 위로.
const StartDescription = new GestureDescription("start");

// 엄지
StartDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
StartDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0,
);
StartDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지 소지
[Finger.Index, Finger.Pinky].forEach((finger) => {
  StartDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  StartDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  StartDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  StartDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  StartDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  StartDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
});

// 중지, 약지
[Finger.Middle, Finger.Ring].forEach((finger) => {
  StartDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  StartDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default StartDescription;
