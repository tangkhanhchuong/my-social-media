import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { FaTwitter } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import Button from "styles/Button"
import { logout } from 'app/slices/auth_slice'

const SCenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: lightgray
`

const SPopUp = styled.div`
    border-radius: 10px;
    box-shadow: 1px 2px 10px black;
    
    background-color: #fff;

    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    max-width: 360px
`

const SSignOutTitle = styled.b`
    font-size: 22px
`

const SSignOutContent = styled.p`
    font-size: 16px;
    text-align: center;
`

const SignOutPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onCancel = () => {
        history.push('/')
    }

    const onSignOut = () => {
        localStorage.removeItem('authInfo')
        dispatch(logout())
        history.push('/')
    }

    return (
        <SCenterContainer>
            <SPopUp>
                <FaTwitter size={35} color="#CA2055" />
                <SSignOutTitle>Log out of Twitter?</SSignOutTitle>
                <SSignOutContent>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </SSignOutContent>
                <div>
                    <Button outline onClick={onCancel}>Cancel</Button>
                    <Button outline onClick={onSignOut}>Logout</Button>
                </div>
            </SPopUp>
        </SCenterContainer>
    )
}

export default SignOutPage
