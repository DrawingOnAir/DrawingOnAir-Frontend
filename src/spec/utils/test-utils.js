/* eslint-disable react/react-in-jsx-scope */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../app/store";

export default function renderWithProviders(children) {
  render(<Provider store={store}>{children}</Provider>, {
    wrapper: BrowserRouter,
  });
}
