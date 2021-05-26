import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FaTwitter } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Button from "styles/Button"
import { logout } from "store/auth/auth_actions"

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh
`

const PopUp = styled.div`
    border-radius: 10px;
    box-shadow: 1px 2px 10px black;

    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    max-width: 360px
`

const SignOutTitle = styled.b`
    font-size: 22px
`

const SignOutContent = styled.p`
    font-size: 16px;
    text-align: center;
`

const SignOutPage = (props) => {
    const history = useHistory()

    const onCancel = () => {
        history.push('/')
    }

    const onSignOut = () => {
        localStorage.removeItem('authInfo')
        props.onLogout()
        history.push('/')
    }

    return (
        <CenterContainer>
            <PopUp>
                <FaTwitter size={35} color="#CA2055" />
                <SignOutTitle>Log out of Twitter?</SignOutTitle>
                <SignOutContent>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </SignOutContent>
                <div>
                    <Button outline onClick={onCancel}>Cancel</Button>
                    <Button outline onClick={onSignOut}>Logout</Button>
                </div>
            </PopUp>
        </CenterContainer>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: async () => await dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage)
