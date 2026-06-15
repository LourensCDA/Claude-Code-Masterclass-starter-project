import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

// component imports
import Avatar from "@/components/Avatar"

describe("Avatar", () => {
  it("renders successfully", () => {
    render(<Avatar name="John" />)

    expect(screen.getByText("J")).toBeInTheDocument()
  })

  it("shows the first letter for a simple name", () => {
    render(<Avatar name="alice" />)

    expect(screen.getByText("A")).toBeInTheDocument()
  })

  it("shows the first two uppercase letters for a PascalCase name", () => {
    render(<Avatar name="JohnDoe" />)

    expect(screen.getByText("JD")).toBeInTheDocument()
  })
})
