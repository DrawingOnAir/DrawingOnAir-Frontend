const COMPOSITING_TYPE = [
  {
    name: "source-over",
    explanation: "기존 그림 위에 새로운 그림이 겹쳐서 나옵니다.",
  },
  {
    name: "source-atop",
    explanation:
      "기존 그림 안의 영역에 포함된 새로운 그림만 겹처서 그려지며, 그 외의 그림은 제거됩니다. ",
  },
  {
    name: "source-out",
    explanation:
      "새로운 그림이 그려질 때 기존 그림과 겹쳐진다면 그 부분은 제거됩니다.",
  },
  {
    name: "destination-over",
    explanation: "새로운 그림 위에 기존 이미지가 겹처서 나타납니다.",
  },
  {
    name: "destination-atop",
    explanation:
      "새로운 그림 안의 영역에 포함된 기존 그림만 겹쳐서 그려지며, 그 외의 그림은 제거됩니다.",
  },
  {
    name: "destination-out",
    explanation:
      "기존 그림에 새로운 그림이 겹쳐지는 부분이 전부 제거 되어 그려집니다.",
  },
  {
    name: "xor",
    explanation:
      "기존 그림과 새로운 그림 사이에 교차되는 부분이 제거되어 그려집니다.",
  },
  {
    name: "lighter",
    explanation:
      "기존 그림과 새로운 그림 사이 교차되는 부분이 밝게 표시됩니다.",
  },
  {
    name: "darker",
    explanation:
      "기존 그림과 새로운 그림 사이 교차되는 부분이 어둡게 표시됩니다.",
  },
];

export default COMPOSITING_TYPE;
