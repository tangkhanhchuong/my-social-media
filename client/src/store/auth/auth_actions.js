export const AuthStatus = {
    AUTH_START: "AUTH_START",
    AUTH_SUCCESS: "AUTH_SUCCESS",
    AUTH_FAIL: "AUTH_FAIL", 
    AUTH_LOGOUT: "AUTH_LOGOUT"
}

export const authStart = () => {
    console.log('AuthStart')
    return (dispatch) => {
        dispatch({ type: AuthStatus.AUTH_START })
    }
}

export const authSuccess = (props) => {
    console.log('AuthSuccess')
    const { username, accessToken, _id, email } = props
    return (dispatch) => {
        dispatch({
            type: AuthStatus.AUTH_SUCCESS,
            username, token: accessToken, userId: _id, email
        })
    }
}

export const authFail = (error) => {
    return (dispatch) => {
        dispatch({
            type: AuthStatus.AUTH_FAIL,
            error
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: AuthStatus.AUTH_LOGOUT
        })
    }
}

const _checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            // dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authCheckState = () => {
    return dispatch => {
        const authInfo = JSON.parse(localStorage.getItem('authInfo'))
        if (!authInfo) {
            // dispatch(logout())
        } else {
            const expirationDate = new Date(authInfo.expirationDate)
            if (expirationDate <= new Date()) {
                // dispatch(logout())
            } else {

                dispatch(authSuccess(authInfo))
                dispatch(_checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }   
        }
    }
}