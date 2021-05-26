import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { authCheckState } from 'store/auth/auth_actions'
import { connectSocket } from 'store/messages/messages_actions'

import AuthContainer from "./AuthContainer"
import RouterContainer from "./RouterContainer"

const App = (props) => {
    const { isAuthenticated, authInfo } = props
    let accessToken = authInfo.token

    useEffect(() => {
        if(!accessToken){
            props.onTryAutoSignIn()
        }
            
    }, [accessToken])

    useEffect(() => {
        if(accessToken){
            props.onTryToConnectSocket(accessToken)
        }
            
    }, [accessToken])

    return (
        <>
          {isAuthenticated ? <RouterContainer /> : <AuthContainer />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth,
        isAuthenticated: !!state.auth.token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: async () => await dispatch(authCheckState()),
        onTryToConnectSocket: async (token) => await dispatch(connectSocket(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
