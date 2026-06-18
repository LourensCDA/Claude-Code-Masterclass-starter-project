"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import styles from "./AuthForm.module.css"

interface AuthFormProps {
  mode: "login" | "signup"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = mode === "login"
  const submitLabel = isLogin ? "Login" : "Sign Up"
  const switchHref = isLogin ? "/signup" : "/login"
  const switchPrompt = isLogin
    ? "Don't have an account?"
    : "Already have an account?"
  const switchLabel = isLogin ? "Sign up" : "Log in"

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({ mode, email, password })
  }

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className="btn">
        {submitLabel}
      </button>

      <p className={styles.switch}>
        {switchPrompt} <Link href={switchHref}>{switchLabel}</Link>
      </p>
    </form>
  )
}
