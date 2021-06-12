import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit"

import authReducer from "./slices/auth_slice"
import messageReducer from "app/slices/message_slice"

const rootReducer = {
    auth: authReducer,
    message: messageReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store