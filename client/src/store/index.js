import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './auth/auth_reducer'
import socketReducer from './messages/messages_reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth: authReducer,
    socket: socketReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store