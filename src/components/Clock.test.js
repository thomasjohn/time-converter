import React from "react";
import Clock from "./Clock";
import { render, screen } from "@testing-library/react";

test("renders Clock component", () => {
  render(<Clock label="label1" time="time1" onTimeChange={() => {}} />);
  const clock = screen.getByTestId("id-clock-label1");
  expect(clock).toBeInTheDocument();
  expect(clock).toHaveAttribute("value", "time1");
});
