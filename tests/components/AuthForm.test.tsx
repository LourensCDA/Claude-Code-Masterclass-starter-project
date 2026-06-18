import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, afterEach } from "vitest"

// component imports
import AuthForm from "@/components/AuthForm"

describe("AuthForm", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders email, password, visibility toggle, and Login button in login mode", () => {
    render(<AuthForm mode="login" />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
  })

  it("renders email, password, visibility toggle, and Sign Up button in signup mode", () => {
    render(<AuthForm mode="signup" />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument()
  })

  it("toggles the password field between hidden and visible", async () => {
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)

    const password = screen.getByLabelText("Password")
    expect(password).toHaveAttribute("type", "password")

    await user.click(screen.getByRole("button", { name: /show password/i }))
    expect(password).toHaveAttribute("type", "text")

    await user.click(screen.getByRole("button", { name: /hide password/i }))
    expect(password).toHaveAttribute("type", "password")
  })

  it("logs the entered values when the login form is submitted", async () => {
    const user = userEvent.setup()
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    render(<AuthForm mode="login" />)

    await user.type(screen.getByLabelText(/email/i), "thief@heist.io")
    await user.type(screen.getByLabelText("Password"), "s3cret")
    await user.click(screen.getByRole("button", { name: "Login" }))

    expect(logSpy).toHaveBeenCalledWith({
      mode: "login",
      email: "thief@heist.io",
      password: "s3cret",
    })
  })

  it("logs the entered values when the signup form is submitted", async () => {
    const user = userEvent.setup()
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    render(<AuthForm mode="signup" />)

    await user.type(screen.getByLabelText(/email/i), "newbie@heist.io")
    await user.type(screen.getByLabelText("Password"), "p4ssword")
    await user.click(screen.getByRole("button", { name: "Sign Up" }))

    expect(logSpy).toHaveBeenCalledWith({
      mode: "signup",
      email: "newbie@heist.io",
      password: "p4ssword",
    })
  })

  it("links to the signup page in login mode", () => {
    render(<AuthForm mode="login" />)

    const link = screen.getByRole("link", { name: /sign up/i })
    expect(link).toHaveAttribute("href", "/signup")
  })

  it("links to the login page in signup mode", () => {
    render(<AuthForm mode="signup" />)

    const link = screen.getByRole("link", { name: /log in/i })
    expect(link).toHaveAttribute("href", "/login")
  })
})
