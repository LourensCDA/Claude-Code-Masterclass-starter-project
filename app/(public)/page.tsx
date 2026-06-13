// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Welcome to Pocket Heist, where the breakroom is your vault and the
          last cup of coffee is the ultimate prize. Plan tiny capers, assign
          accomplices, and beat the clock before your heist expires.
        </p>
        <p>
          Whether you&apos;re swiping the good stapler or staging a daring snack
          extraction, every great heist starts with a plan. Log in to assemble
          your crew, or sign up to pull off your very first job.
        </p>
      </div>
    </div>
  )
}
