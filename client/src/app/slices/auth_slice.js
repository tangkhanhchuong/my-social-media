import { createSlice } from "@reduxjs/toolkit"

const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: true,
        accessToken: null,
        username: null,
        userId: null,
        profile: {},
        error: null
    },
    reducers: {
        startLogin: (state, action) => {
            state.isLoading = true
        },

        loginSuccess: (state, action) => {
            const { username, _id, accessToken, email, userId, profile } = action.payload
            state = { 
                isLoading: false,
                error: null,
                accessToken,
                userId: userId || _id,
                username,
                email,
                profile
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
        },

        changeProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload }
            state.username = action.payload.username
            localStorage.setItem('authInfo', JSON.stringify(state))
        }
    },
})

const { reducer, actions } = auth
export const { startLogin, loginSuccess, loginFail, logout, changeProfile } = actions
export default reducer