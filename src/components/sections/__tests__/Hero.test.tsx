import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Hero from "../Hero";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

test("Hero renders correctly", () => {
  render(<Hero />);

  // Check if the name exists
  expect(screen.getByText(/Shibil S/i)).toBeInTheDocument();

  // Check if the title exists
  expect(
    screen.getByRole("heading", { name: /Best Digital Marketing Strategist in Kerala/i, level: 2 }),
  ).toBeInTheDocument();

  // Check if the main heading exists
  expect(screen.getByText(/I Help Businesses Turn Ads/i)).toBeInTheDocument();

  // Check for CTA buttons
  expect(screen.getByText(/Direct Call/i)).toBeInTheDocument();
  expect(screen.getByText(/Download CV/i)).toBeInTheDocument();
});
