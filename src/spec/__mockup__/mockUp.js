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

export default { hand, ctx, gesture };
