import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit"

import authReducer from "features/auth/auth_slice"
import messageReducer from "features/messages/messageSlice"

const rootReducer = {
    auth: authReducer,
    messages: messageReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store