import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import renderWithProviders from "../utils/test-utils";

function PathLocation() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

function TestApp() {
  return (
    <>
      <Footer />
      <PathLocation />
    </>
  );
}

describe("Footer Component의 테스트 메인페이지로", () => {
  it("페이지 이동 확인", () => {
    renderWithProviders(<TestApp />);
    const eventAddButton = screen.getByText(/Main/);

    fireEvent.click(eventAddButton);

    expect(screen.getByTestId("location-display")).toHaveTextContent("/main");
  });
});
