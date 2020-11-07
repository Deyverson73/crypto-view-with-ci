import React from "react";
import { render, screen } from "@testing-library/react";
import { Coin } from "./index";

it("Check coin label", () => {
  render(<Coin coin="BTC" currentPrice={0} oldPrice={0} />);
  // eslint-disable-next-line jest/valid-expect
  expect(screen.getByText("BTC"));
});
