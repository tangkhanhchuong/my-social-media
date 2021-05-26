import React from "react"
import { FastField, Formik, Form } from 'formik'
import { toast } from "react-toastify"
import { useMutation } from 'react-query'

import Button from "styles/Button"
import FormContainer from "styles/Form"
import { displayError } from "utils"

import Input from "components/Input"
import authRequests from 'http/auth_requests'

const LoginPage = ({ changeToSignup }) => {
  
  const onLoginSuccessfully = (data) => {
    return toast.success(`You are logged in`)
  }
  
  const onError = (err) => {
    const errorStatus = err.response.status

    switch(errorStatus){
      case 401: 
        toast.error(`Wrong password!`)
        break
      case 409: 
        toast.error(`This email does not exist!`)
        break
    }
  }

  const { mutate, isLoading } = useMutation(authRequests.login, { mutationKey: 'login' })

  const onLogin = (values) => {
    try {
      const { email, password } = values

      if (email.length <= 5) {
        return toast.error("Email field must be at least 5 characters long!")
      }
      if (password.length <= 8) {
        return toast.error("Email field must be at least 8 characters long!")
      }

      mutate(values, {
        onSuccess: onLoginSuccessfully,
        onError: onError
      })
  
    }
    catch (err){
      return displayError(err)
    }
  }

  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <FormContainer center>
    <Formik
      initialValues={initialValues}
      onSubmit={onLogin}
    >
        {formikProps => {
          // const { values, errors, touched, isSubmitting } = formikProps
          return ( 
          <Form>
            <h1><b>LOGIN</b></h1>
            <FastField
              name="email"
              component={Input}
              placeholder="Email"
            />
            <FastField
              name="password"
              component={Input}
              placeholder="Password"
            />
          <Button xl outline type="submit">
            {isLoading ? "Logging in" : "Login"}
          </Button>
          <span>or</span>
          <Button xl type="button" onClick={changeToSignup}>
            Signup
          </Button>
        </Form>
        )
        }}
      </Formik>
      </FormContainer>
  )
}

export default LoginPage