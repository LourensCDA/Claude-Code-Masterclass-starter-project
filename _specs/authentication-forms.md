# Spec for authentication-forms

branch: claude/feature/authentication-forms

## Summary

Build the authentication forms for the `/login` and `/signup` pages, which are currently stub pages. Both forms collect an email and password, let the user toggle password visibility, and submit via a labeled button ("Login" or "Sign Up"). Since there is no backend yet, submission simply logs the captured form details to the console rather than performing real authentication. Users should be able to easily move between the login and signup forms (e.g. via a link or toggle), so it's quick to compare or switch context without retyping shared information unnecessarily.

## Functional Requirements

- `/login` page renders a login form with: email field, password field, password visibility toggle icon, and a "Login" submit button.
- `/signup` page renders a signup form with: email field, password field, password visibility toggle icon, and a "Sign Up" submit button.
- Password field is masked by default; clicking/tapping the visibility icon toggles between masked and plain-text display of the password value.
- On submit, the form logs the captured field values (e.g. email and password) to the console and does not navigate away, call an API, or persist data anywhere.
- Submitting the form does not require integration with any authentication/session system — this is a UI/logging-only stub for now.
- Each page provides a clearly visible way to switch to the other auth page (e.g. "Don't have an account? Sign up" on `/login`, "Already have an account? Log in" on `/signup`).
- Switching between the two forms should be quick — a single click/tap navigation between `/login` and `/signup`.
- Both forms share consistent visual styling and structure, consistent with the rest of the app's existing design tokens and components.

## Possible Edge Cases

- Submitting the form with one or both fields empty.
- Submitting an email in an invalid format (e.g. missing `@`).
- Toggling password visibility multiple times in a row.
- Toggling password visibility, then submitting — submitted/logged value should be unaffected by the current visibility state.
- Very long email or password input.
- Navigating directly to `/login` or `/signup` via URL versus via the in-form switch link.
- Rapid repeated form submissions (e.g. double-clicking submit).

## Acceptance Criteria

- [ ] `/login` renders email field, password field, visibility toggle icon, and "Login" button.
- [ ] `/signup` renders email field, password field, visibility toggle icon, and "Sign Up" button.
- [ ] Clicking the visibility icon toggles the password field between masked and visible text.
- [ ] Submitting either form logs the entered email and password to the console.
- [ ] Submitting either form does not trigger a page navigation, network request, or error.
- [ ] `/login` includes a link/control to navigate to `/signup`, and vice versa.
- [ ] Both forms are keyboard accessible (tab order, enter-to-submit) and password toggle has an accessible label/state.

## Open Questions

- Should client-side validation (e.g. required fields, email format) block submission/logging, or should the form log whatever was entered regardless of validity?
- Should the password visibility icon have distinct visual states (e.g. eye vs. eye-slash icon), or just a single icon with a tooltip/label change?
- Should switching between `/login` and `/signup` preserve any already-entered email value, or always start blank?
- Are there existing icon assets/libraries in the project to use for the show/hide password icon, or should a new one be added?

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature and create meaningful tests for the following cases, without going too heavy:

- Login form renders email, password, visibility toggle, and submit button.
- Signup form renders email, password, visibility toggle, and submit button.
- Clicking the visibility toggle changes the password input's type/visibility.
- Submitting the login form calls console.log with the entered values.
- Submitting the signup form calls console.log with the entered values.
- The switch link on `/login` points to `/signup` and vice versa.
