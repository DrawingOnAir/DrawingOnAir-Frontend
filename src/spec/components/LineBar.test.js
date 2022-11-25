import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import store from "../../app/store";

import renderWithProviders from "../utils/test-utils";
import LineBar from "../../components/LineBar";

function TestLineBar() {
  return <LineBar />;
}

describe("CompostingBar 리덕스 테스트", () => {
  it("CompostingBar에서 원하는 부분 클릭시 변경이 됩니다.", () => {
    renderWithProviders(<TestLineBar />);
    const eventAddButton = screen.getAllByRole("button");
    fireEvent.click(eventAddButton[1]);
    // const xxx = screen.getByRole("button")[0];
    // console.log(eventAddButton[0]);
    console.log(store.getState().selectingLineThickness);
    expect(store.getState().selectingLineThickness).toEqual(5);
  });
});
