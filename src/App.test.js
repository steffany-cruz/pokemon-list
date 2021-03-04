import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders list", () => {
  render(<App />);
  const linkElement = screen.getByTestId("list");
  expect(linkElement).toBeCalledTimes(1);
});
