import React from "react"
import { FastField, Formik, Form } from 'formik'

import Button from "styles/Button"
import FormContainer from "styles/Form"

import Input from "components/Input"
import useSignUp from "./useSignUp"

const SignUpPage = ({ changeToLogin }) => {
  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirm: ''
  }

  const { isLoading, onSignUp } = useSignUp(changeToLogin)

  return (
    <FormContainer center>
      <Formik
        initialValues={initialValues}
        onSubmit={onSignUp}
      >
          {formikProps => {
            // const { values, errors, touched, isSubmitting } = formikProps
            return ( 
            <Form>
              <h1><b>SIGN UP</b></h1>
              <FastField
                name="email"
                component={Input}
                placeholder="Email"
              />
              <FastField
                name="username"
                component={Input}
                placeholder="Username"
              />
              <FastField
                name="password"
                component={Input}
                placeholder="Password"
              />
              <FastField
                name="confirm"
                component={Input}
                placeholder="Confirm"
              />
            <Button xl outline type="submit">
              {isLoading ? "Signing Up" : "Sign Up"}
            </Button>
            <span>or</span>
            <Button xl type="button" onClick={changeToLogin}>
              Sign In
            </Button>
          </Form>
          )
          }}
        </Formik>
      </FormContainer>
  )
}

export default SignUpPage