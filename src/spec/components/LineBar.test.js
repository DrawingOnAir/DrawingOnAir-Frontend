import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import store from "../../app/store";
import renderWithProviders from "../utils/test-utils";
import LineBar from "../../components/LineBar";

describe("LineBar 리덕스 테스트", () => {
  it("LineBar에서 원하는 부분 클릭시 선의 두께가 변경이 됩니다.", () => {
    renderWithProviders(<LineBar />);
    const eventAddButton = screen.getAllByRole("button");
    fireEvent.click(eventAddButton[1]);

    expect(store.getState().selectingLineThickness).toEqual(5);
  });
});
