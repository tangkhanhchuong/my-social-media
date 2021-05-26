import React from "react"
import { FastField, Formik, Form } from 'formik'
import { toast } from "react-toastify"
import { useMutation } from 'react-query'

import Button from "styles/Button"
import FormContainer from "styles/Form"
import { displayError } from "utils"

import Input from "../Input"
import authRequests from 'http/auth_requests'

const RegisterPage = ({ changeToLogin }) => {
  
  const delayTimeSignUp = 2000

  const onRegisterSuccessfully = (data) => {
    toast.success(`Your account are created!`)
    setTimeout(() => {
      changeToLogin()
    }, delayTimeSignUp)
  }
  
  const onError = (err) => {
    const errorStatus = err.response.status

    switch(errorStatus){
      case 409: 
        toast.error(`Email already exist! Please select another email!`)
        break
    }
  }

  const { mutate, isLoading } = useMutation(authRequests.register, { mutationKey: 'register' })

  const onRegister = (values) => {
    try {
      const { email, password, username, confirm } = values

      if (email.length <= 5) {
        return toast.error("Email field must be at least 5 characters long!")
      }
      if (username.length <= 5) {
        return toast.error("Username field must be at least 5 characters long!")
      }
      if (password.length <= 5) {
        return toast.error("Password field must be at least 8 characters long!")
      }
      if(password !== confirm){
        return toast.error("The password confirmation does not match!")
      }

      mutate(values, {
        onSuccess: onRegisterSuccessfully,
        onError: onError
      })
    }
    catch (err){
      return displayError(err)
    }
  }

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirm: ''
  }

  return (
    <FormContainer center>
      <Formik
        initialValues={initialValues}
        onSubmit={onRegister}
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

export default RegisterPage