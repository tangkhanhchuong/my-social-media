import { createSlice } from "@reduxjs/toolkit"

const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        accessToken: null,
        username: null,
        userId: null,
        error: null
    },
    reducers: {
        startLogin: (state, action) => {
            state.isLoading = true
        },

        loginSuccess: (state, action) => {
            const { username, _id, accessToken, email, userId } = action.payload
            state = { 
                isLoading: false,
                error: null,
                username,
                email,
                accessToken,
                userId: userId || _id
            }

            localStorage.setItem('authInfo', JSON.stringify(state))
            return state
        },

        loginFail: (state, { error }) => {
            state = { 
                isLoading: false,
                username: null,
                userId: null,
                accessToken: null,
                error
            }
            return state
        },

        logout: (state) => {
            state = { 
                isLoading: false,
                username: null,
                userId: null,
                accessToken: null,
                error:null
            }
            return state
        }
    },
})

const { reducer, actions } = auth
export const { startLogin, loginSuccess, loginFail, logout } = actions
export default reducer