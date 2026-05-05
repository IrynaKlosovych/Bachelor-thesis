import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import useWindowWidth from "../hooks/useWindowWidth";
import { TEST_SCREEN_WIDTHS } from "../constants/constants";

vi.mock("../hooks/useWindowWidth", () => ({
  default: vi.fn(),
}));

describe("Screen size behavior", () => {
  //test 1
  it("shows warning on small screen", () => {
    vi.mocked(useWindowWidth).mockReturnValue(TEST_SCREEN_WIDTHS.SMALL);

    render(<App />);
    expect(screen.getByTestId("warning")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByTestId("layout")).toHaveAttribute("aria-hidden", "true");
  });
  
  //test 2
  it("shows layout on large screen", () => {
    vi.mocked(useWindowWidth).mockReturnValue(TEST_SCREEN_WIDTHS.LARGE);

    render(<App />);

    expect(screen.getByTestId("warning")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("layout")).toHaveAttribute("aria-hidden", "false");
  });
});