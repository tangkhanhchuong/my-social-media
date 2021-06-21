import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loginSuccess, logout } from "app/slices/auth_slice"
import useSocket from "features/messages/useSocket"
import { CenterLoadingIndicator } from "shared/others/LoadingIndicator"

import AuthContainer from "./AuthContainer"
import RouterContainer from "./RouterContainer"

const App = () => {
  const authInfo = useSelector((state) => state.auth)
  const { accessToken } = authInfo

  const dispatch = useDispatch()
  useSocket({ accessToken })

  useEffect(() => {
    const tryToLogIn = () => {
      const infoInLocalStorage = JSON.parse(localStorage.getItem("authInfo"))
      if (!infoInLocalStorage) {
        dispatch(logout())
        return
      }
      dispatch(loginSuccess(infoInLocalStorage))
    }
    setTimeout(tryToLogIn, 100)
    tryToLogIn()
  }, [accessToken])

  if (authInfo.isLoading) return <CenterLoadingIndicator fluid />

  return <>{accessToken ? <RouterContainer /> : <AuthContainer />}</>
}

export default App
