# Plan: Authentication Forms (Login / Signup)

Spec: `_specs/authentication-forms.md` · Branch: `claude/feature/authentication-forms`

## Context

`/login` and `/signup` are currently 9-line stub pages that render only a heading — no form, no fields, no logic. This is the first form of any kind in the codebase (no existing form components, no validation libs, no auth/session state). The goal of this pass is purely a UI/logging stub: real email/password fields with a show/hide toggle, a submit button, and a way to switch between the two pages — submission just `console.log`s the captured values, with no backend, navigation, or persistence. This unblocks later work (real auth wiring, the splash-page redirect logic already stubbed as a comment in `app/(public)/page.tsx`) without taking on that scope now.

Decisions confirmed with the user:
- Native HTML5 validation (`required`, `type="email"`) blocks empty/invalid submissions — no extra libraries.
- A single parameterized `AuthForm` component (`mode: "login" | "signup"`) is used for both pages rather than two separate components, since all logic/markup is identical except three short strings.
- Switching between `/login` and `/signup` always starts the email field blank (no state lifted above page level).

## Files to create

**`components/AuthForm/AuthForm.tsx`** — new client component (`"use client"`)
- Props: `{ mode: "login" | "signup" }`
- Local `useState`: `email`, `password`, `showPassword`
- Derive from `mode`: submit button label (`"Login"` / `"Sign Up"`), switch-link href (`/signup` / `/login`) and text (`"Don't have an account? Sign up"` / `"Already have an account? Log in"`)
- `<form onSubmit>`:
  - Email: `<label>` + `<input type="email" required autoComplete="email">`
  - Password: `<label>` + wrapper containing `<input type={showPassword ? "text" : "password"} required autoComplete="current-password">` and a `<button type="button">` toggle rendering `Eye`/`EyeOff` from `lucide-react` (already a dependency, already used in `components/Navbar/Navbar.tsx`), with `aria-label`/`aria-pressed` reflecting state
  - Submit: `<button type="submit" className="btn">{label}</button>` — reuse the existing global `.btn` class (same one Navbar's "Create Heist" link uses), not a new style
  - Footer: `<Link href={switchHref}>` with the switch text
- `handleSubmit`: `e.preventDefault(); console.log({ mode, email, password })`. The `required`/`type="email"` attributes mean the browser blocks the submit (and thus the log) on empty/invalid input — no manual validation logic needed.
- Pair every input with a `<label htmlFor>` for accessibility (acceptance criterion: toggle and fields must be keyboard accessible with accessible labels).

**`components/AuthForm/AuthForm.module.css`**
- Starts with `@reference "../../app/globals.css";` per repo convention
- Form layout (vertical stack/gap), label styling, a `relative`-positioned wrapper for the password input + absolutely-positioned toggle button, and muted styling for the footer switch-link text (`text-body`)
- Do not redefine `.btn` — apply via `className="btn"` directly, matching Navbar's pattern

**`components/AuthForm/index.ts`**
```
export { default } from "./AuthForm"
```

**`tests/components/AuthForm.test.tsx`** — follow `tests/components/Navbar.test.tsx` / `Avatar.test.tsx` conventions exactly: explicit `describe/it/expect` imports from `"vitest"`, `render`/`screen` from `@testing-library/react`, `userEvent` from `@testing-library/user-event` (installed, currently unused elsewhere), accessible queries (`getByRole`/`getByLabelText`), a `// component imports` comment before the component import.

Test cases:
1. Login mode renders email field, password field, visibility toggle, and a "Login" button.
2. Signup mode renders the same fields plus a "Sign Up" button.
3. Clicking the visibility toggle switches the password input between `type="password"` and `type="text"` (and back).
4. Submitting the login form (after typing values) calls `console.log` with the entered email/password.
5. Submitting the signup form does the same.
6. The switch link on login mode points to `/signup`; on signup mode it points to `/login`.

## Files to modify

**`app/(public)/login/page.tsx`**
- Fix the copy-paste bug: rename the exported function from `SignupPage` to `LoginPage`.
- Keep the existing heading markup (`center-content` / `page-content` / `form-title` / `<h1>Log in to Your Account</h1>`).
- Import and render `<AuthForm mode="login" />` below the heading, inside `page-content`. Stays a server component — no `"use client"` needed at the page level.

**`app/(public)/signup/page.tsx`**
- Keep `SignupPage` name and existing `<h2>Signup for an Account</h2>` heading.
- Render `<AuthForm mode="signup" />` below it.

No changes needed to `app/(public)/layout.tsx` or `app/globals.css` — existing tokens/classes are sufficient.

## Verification

- `npm test -- run tests/components/AuthForm.test.tsx` — confirm all new tests pass.
- `npm run lint` — confirm no TypeScript/ESLint issues (unused vars, missing key props, etc.).
- `npm run dev`, then manually exercise both pages in the browser:
  - Visit `/login`: confirm email + password fields, toggle eye icon switches masked/plain text, submitting with valid input logs `{ mode: "login", email, password }` to devtools console, submitting empty fields is blocked by the browser's native validation UI.
  - Click the switch link to `/signup`: confirm navigation, fields are blank, repeat the same checks with the "Sign Up" button and `mode: "signup"`.
  - Click back to `/login` from `/signup`'s switch link to confirm the round trip works.
