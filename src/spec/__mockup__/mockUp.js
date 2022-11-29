const hand = {
  handedness: "Right",
  keypoints: [0, 0, 0, 0, 0, 0, 0, 0, { x: 1, y: 1 }],
};

const canvas = global.document.createElement("canvas");
const ctx = canvas.getContext("2d");

const gesture = {
  clear: "clear",
  draw: "draw",
  drag: "drag",
  test: "test",
};

const testPathsryOne = [
  [
    [1, 1],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 8],
  ],
  [
    [1, 1],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 8],
  ],
];

const testPathsryTwo = [
  [
    [1, 1, "black", 0, "병합타입 존재"],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 8],
  ],
  [
    [1, 1],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [7, 8],
  ],
];

export default { hand, ctx, gesture, testPathsryOne, testPathsryTwo };
