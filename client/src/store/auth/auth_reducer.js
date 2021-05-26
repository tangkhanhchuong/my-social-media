import { AuthStatus } from './auth_actions'

const initialState = {
    token: null,
    userId: null,
    username: null,
    error: null,
    loading: false,
    
}

const authStart = ( state, action ) => {
    return { ...state, error: null, loading: true }
}

const authSuccess = (state, { username, token, userId }) => {
    return { 
        ...state, error: null,loading: false,
        username, token, userId        
    }
}

const authFail = (state, { error }) => {
    return { ...state, error, loading: false}
}

const authLogout = (state, action) => {
    return { ...state, token: null, userId: null, username: null, socket: null }
}

const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case AuthStatus.AUTH_START: 
            console.log('auth start')
            return authStart(state, action)
            case AuthStatus.AUTH_SUCCESS: 
            console.log('auth success')
            return authSuccess(state, action)
        case AuthStatus.AUTH_FAIL: 
            console.log('auth fail')
            return authFail(state, action)
        case AuthStatus.AUTH_LOGOUT: 
            console.log('auth logout')
            return authLogout(state, action)
        default:
            return state
    }
}

export default authReducer