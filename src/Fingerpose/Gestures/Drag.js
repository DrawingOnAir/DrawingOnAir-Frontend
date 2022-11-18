import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// 제스쳐: 검지, 중지만 위로
const dragDescription = new GestureDescription("drag");

// 엄지:
dragDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
dragDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
dragDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0,
);

// 검지, 중지:
[Finger.Index, Finger.Middle].forEach((finger) => {
  dragDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  dragDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  dragDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  dragDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  dragDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  dragDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
});

// 약지, 소지
[Finger.Ring, Finger.Pinky].forEach((finger) => {
  dragDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  dragDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
});

export default dragDescription;
