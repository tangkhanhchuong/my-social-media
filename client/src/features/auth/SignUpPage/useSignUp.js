import { toast } from "react-toastify"
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'

import { displayError } from "utils"
import authRequests from 'http/auth_requests'
 
const delayTimeSignUp = 2000

const useSignUp = () => {
    const history = useHistory()

    const onRegisterSuccessfully = (data) => {
        toast.success(`Your account are created!`)
        setTimeout(() => {
            history.push('/login')
        }, delayTimeSignUp)
    }
    
    const onError = (err) => {
        const errorStatus = err.response.status

        switch(errorStatus){
        case 409: 
            toast.error(`Email already exist! Please select another email!`)
            break
        default: 
            break
        }
    }

    const { mutate, isLoading } = useMutation(authRequests.register, { mutationKey: 'register' })

    const onSignUp = (values) => {
        try {
        const { email, password, username, confirm } = values

        if (email.length <= 5) {
            return toast.error("Email field must be at least 5 characters long!")
        }
        if (username.length <= 5) {
            return toast.error("Username field must be at least 5 characters long!")
        }
        if (password.length <= 5) {
            return toast.error("Password field must be at least 8 characters long!")
        }
        if(password !== confirm){
            return toast.error("The password confirmation does not match!")
        }

        mutate(values, {
            onSuccess: onRegisterSuccessfully,
            onError: onError
        })
        }
        catch (err){
        return displayError(err)
        }
    }

    return { isLoading, onSignUp }
}

export default useSignUp
