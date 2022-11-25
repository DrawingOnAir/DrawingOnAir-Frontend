import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import store from "../../app/store";
import renderWithProviders from "../utils/test-utils";
import ColorBar from "../../components/ColorBar";

describe("LineBar 리덕스 테스트", () => {
  it("LineBar에서 원하는 부분 클릭시 선의 두께가 변경이 됩니다.", () => {
    renderWithProviders(<ColorBar />);
    const eventAddButton = screen.getAllByRole("button");
    fireEvent.click(eventAddButton[2]);

    expect(store.getState().selectingColor).toEqual("#ff8c00");
  });
});
