import React from "react"
import { FastField, Formik, Form } from 'formik'

import Button from "styles/Button"
import LinkButton from "styles/LinkButton"
import FormContainer from "styles/Form"

import Input from "components/Input"
import useSignUp from "./useSignUp"

const SignUpPage = () => {
  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirm: ''
  }

  const { isLoading, onSignUp } = useSignUp()

  return (
    <FormContainer center>
      <Formik
        initialValues={initialValues}
        onSubmit={onSignUp}
      >
          {formikProps => {
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
            <LinkButton xl type="button" to='/login'>
              Sign In
            </LinkButton>
          </Form>
          )
          }}
        </Formik>
      </FormContainer>
  )
}

export default SignUpPage