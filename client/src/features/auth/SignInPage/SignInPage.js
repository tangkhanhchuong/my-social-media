import React from "react"
import { FastField, Formik, Form } from 'formik'

import { StButton, StLinkButton } from "shared/styles/Buttons"
import FormContainer from "shared/styles/Form"
import Input from "components/Input"

import useSignIn from './useSignIn'

const SignInPage = (props) => {

    const initialValues = {
        email: '',
        password: ''
    }

    const { isLoading, onLogin } = useSignIn()

    return (
        <FormContainer center>
            <Formik
            initialValues={initialValues}
            onSubmit={onLogin}
            >
                {formikProps => {
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
                        <StButton xl outline type="submit">
                            {isLoading ? "Logging in" : "Login"}
                        </StButton>
                        <span>or</span>
                        <StLinkButton type="button" to='/signup'>
                            Signup
                        </StLinkButton>
                        </Form>
                    )
                }}
            </Formik>
        </FormContainer>
    )
}

export default SignInPage