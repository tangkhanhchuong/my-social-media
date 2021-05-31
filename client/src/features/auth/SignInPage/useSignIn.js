import { toast } from "react-toastify"
import { useMutation } from 'react-query'

import { displayError } from "utils"
import authRequests from 'http/auth_requests'

const useSignIn = ({ onStartingLogin, onLoginSuccess, onTryAutoSignIn }) => {
    const { mutate, isLoading } = useMutation(authRequests.login, { mutationKey: 'login' })

    const onLoginSuccessfully = async (data) => {
      toast.success(`You are logged in`)
      onLoginSuccess(data.data)
      localStorage.setItem('authInfo', JSON.stringify(data.data))
    }
      
    const onError = (err) => {
      console.log(err)
      const errorStatus = err.response.status

      switch(errorStatus){
          case 401: 
            toast.error(`Wrong password!`)
            break
          case 409: 
            toast.error(`This email does not exist!`)
            break
          default: 
            break
      }
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

        onStartingLogin()
        mutate(values, {
          onSuccess: onLoginSuccessfully,
          onError: onError
        })
    
      }
      catch (err){
        console.log(err)
        return displayError(err)
      }
    }

    return { 
        onLogin,
        isLoading
    }
}

export default useSignIn
