import React from "react"
import { FastField, Formik, Form } from 'formik'

import LinkButton from "styles/LinkButton"
import Button from "styles/Button"
import FormContainer from "styles/Form"
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
                        <Button xl outline type="submit">
                            {isLoading ? "Logging in" : "Login"}
                        </Button>
                        <span>or</span>
                        <LinkButton type="button" to='/signup'>
                            Signup
                        </LinkButton>
                        </Form>
                    )
                }}
            </Formik>
        </FormContainer>
    )
}

export default SignInPage