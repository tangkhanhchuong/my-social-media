import React, { useState } from "react"

import { SignInPage } from "features/auth/SignInPage"
import { SignUpPage } from "features/auth/SignUpPage"

const AuthState = {
  LOGIN: 0, SIGNUP: 1
}

const AuthContainer = () => {
  const [authAction, setAuthAction] = useState(AuthState.LOGIN)
  const changeToLogin = () => setAuthAction(AuthState.LOGIN)
  const changeToSignup = () => setAuthAction(AuthState.SIGNUP)

  return (
    <>
      {authAction === AuthState.LOGIN? (
        <SignInPage changeToSignup={changeToSignup} />
      ) : (
        <SignUpPage changeToLogin={changeToLogin} />
      )}
    </>
  )
}

export default AuthContainer
