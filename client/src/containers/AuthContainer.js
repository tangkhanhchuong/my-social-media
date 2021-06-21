import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { SignInPage } from "features/auth/SignInPage"
import { SignUpPage } from "features/auth/SignUpPage"

const AuthContainer = () => {
  const SignIn = () => <SignInPage />
  const SignUp = () => <SignUpPage />

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}

export default AuthContainer
