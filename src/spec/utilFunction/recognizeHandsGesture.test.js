import recognizeHandsGesture from "../../utils/DrawingUtils/recognizeHandsGesture";
import mockUp from "../__mockup__/mockUp";

const { hand, ctx, gesture } = mockUp;

describe("손동작의 제스쳐 감지 인식 함수에 대한 테스트입니다.", () => {
  it("draw 동작 테스트: 드로우 동작이 완료되면 배열의 길이는 1개 이상이여야 합니다.", () => {
    for (let i = 0; i < 3; i += 1) {
      recognizeHandsGesture(hand, ctx, ctx, ctx, gesture.draw);
    }

    expect(
      recognizeHandsGesture(hand, ctx, ctx, ctx, gesture.test).length,
    ).toEqual(1);
  });

  it("clear 동작 테스트: 클리어 동작이 실행된다면 배열은 초기화가 되어야 합니다.", () => {
    for (let i = 0; i < 3; i += 1) {
      recognizeHandsGesture(hand, ctx, ctx, ctx, gesture.draw);
    }
    recognizeHandsGesture(hand, ctx, ctx, ctx, gesture.clear);

    expect(recognizeHandsGesture(hand, ctx, ctx, ctx, gesture.test)).toEqual(
      [],
    );
  });
});
