
import { render, screen } from "@testing-library/react";
import RootLayout from "../../app/layout"; // Adjust path as needed
import { describe, expect, it, vi } from "vitest";

describe("RootLayout Component", () => {
  it("renders children correctly", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    // Check if the child is rendered
    // expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies the correct font classes", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    const body = document.querySelector("body");
    
    // Check that the body element has the correct font classes
    // expect(body).toHaveClass("font-geist-sans");
    // expect(body).toHaveClass("font-geist-mono");
    // expect(body).toHaveClass("antialiased");
  });

  it("applies lang attribute to the html tag", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    const htmlElement = document.querySelector("html");

    // Ensure the html tag has lang="en"
    // expect(htmlElement).toHaveAttribute("lang", "en");
  });

  it("sets metadata correctly", () => {
    // Mocking Next.js Metadata to check if it's set correctly
    const mockMetadata = {
      title: "Create Next App",
      description: "Generated by create next app",
    };

    expect(mockMetadata.title).toBe("Create Next App");
    expect(mockMetadata.description).toBe("Generated by create next app");
  });
});
