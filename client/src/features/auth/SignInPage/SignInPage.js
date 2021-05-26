import React from "react"
import { FastField, Formik, Form } from 'formik'
import { connect } from 'react-redux'

import Button from "styles/Button"
import FormContainer from "styles/Form"
import { authStart, authSuccess } from 'store/auth/auth_actions'
import Input from "components/Input"

import useSignIn from './useSignIn'

const SignInPage = (props) => {
    const {
        changeToSignup,
        onStartingLogin, onLoginSuccess
    } = props

    const initialValues = {
        email: '',
        password: ''
    }

    const { isLoading, onLogin } = useSignIn({ onStartingLogin, onLoginSuccess })

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

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // isAuthenticated: state.auth.accessToken !== null,
        // authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartingLogin: () => dispatch(authStart()),
        onLoginSuccess:  (user) => dispatch(authSuccess(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)