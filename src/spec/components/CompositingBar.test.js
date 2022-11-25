import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import store from "../../app/store";
import renderWithProviders from "../utils/test-utils";
import CompositingBar from "../../components/CompositingBar";

describe("compostingBar Test", () => {
  it("CompostingBar에서 원하는 부분 클릭시 스테이트 변경", () => {
    renderWithProviders(<CompositingBar />);
    const eventAddButton = screen.getByText(/xor/);
    fireEvent.click(eventAddButton);

    expect(store.getState().compositingData).toEqual("xor");
  });
});
