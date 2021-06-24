import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { displayError } from "utils"
import authRequests from "http/auth_requests"
import { loginSuccess, startLogin, loginFail } from "app/slices/auth_slice"

const useSignIn = () => {
  const { mutate, isLoading } = useMutation(authRequests.login, {
    mutationKey: "login",
  })
  const dispatch = useDispatch()

  const onLoginSuccessfully = async (data) => {
    const user = data.data
    const { username } = user
    toast.success(`Welcome, ${username}`)
    dispatch(loginSuccess(user))
  }

  const onError = (err) => {
    const errorStatus = err.response.status

    switch (errorStatus) {
      case 401:
        toast.error(`Wrong password!`)
        break
      case 409:
        toast.error(`This email does not exist!`)
        break
      default:
        break
    }
    dispatch(loginFail(err))
  }

  const onLogin = (values) => {
    try {
      const { email, password } = values

      if (email.length <= 5) {
        return toast.error("Email field must be at least 5 characters long!")
      }
      if (password.length <= 5) {
        return toast.error("Email field must be at least 5 characters long!")
      }

      // onStartingLogin()
      dispatch(startLogin())

      mutate(values, {
        onSuccess: onLoginSuccessfully,
        onError: onError,
      })
    } catch (err) {
      console.log(err)
      return displayError(err)
    }
  }

  return {
    onLogin,
    isLoading,
  }
}

export default useSignIn
