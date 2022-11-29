import adaptCompositingType from "../../utils/DrawingUtils/adaptCompositingType";
import mockUp from "../__mockup__/mockUp";

const { testPathsryOne, testPathsryTwo, ctx } = mockUp;

describe("병합 타입에 대한 적용이 제대로 작동하는지 확인합니다.", () => {
  it("병합 조건에 미 충족시 병합 조건이 반영되지 않습니다.", () => {
    adaptCompositingType(testPathsryOne, 1, 1, 1, 1, ctx, "병합 타입1");
    expect(testPathsryOne[0][0][4]).toEqual(undefined);
  });

  it("병합 기능이 적용된 적이 없을 경우 첫 드로우는 source-over로, 나머지는 병합 타입이 저장됩니다.", () => {
    adaptCompositingType(testPathsryOne, 2, 2, 1, 1, ctx, "병합 타입1");
    expect(testPathsryOne[0][0][4]).toEqual("source-over");
    expect(testPathsryOne[1][0][4]).toEqual("병합 타입1");
  });

  it("병합 기능이 적용된 적이 있을 경우 첫 드로우는 존재하는 병합 타입으로, 나머지는 병합 타입이 저장됩니다", () => {
    adaptCompositingType(testPathsryTwo, 2, 2, 1, 1, ctx, "병합 타입2");
    expect(testPathsryTwo[0][0][4]).toEqual("병합타입 존재");
    expect(testPathsryTwo[1][0][4]).toEqual("병합 타입2");
  });
});
