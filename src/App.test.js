import React from "react";
import App from "./App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("renders title", () => {
  render(<App />);
  const titleElement = screen.getByText(/time zones/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders new clock input field", () => {
  render(<App />);
  const newClockInput = screen.getByTestId("id-new-clock");
  expect(newClockInput).toBeInTheDocument();
});

test("waiting for new clock", async () => {
  render(<App />);
  const addZoneButton = screen.getByTestId("id-add-zone");
  fireEvent.click(addZoneButton);
  await waitFor(() => {
    const clockLabel = screen.getByTestId("id-clock-asia/jakarta");
    expect(clockLabel).toBeInTheDocument();
  });
});
