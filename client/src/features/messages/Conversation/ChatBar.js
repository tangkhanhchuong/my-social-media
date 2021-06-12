import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { CustomInput } from 'components/Input'
import { sendMessage } from 'app/slices/message_slice'

const ChatBar = (props) => {
    const { id: chatId } = useParams()

    const authReducer = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSendMsg = (e) => {
        e.preventDefault()
        const val = e.target.elements[0].value
        if(!val || val === "")    return

        const newMsg = {
            _id: uuidv4(),
            content: val, 
            chat: chatId,
            sender: {
                _id: authReducer.userId,
                username: authReducer.username
            }
        }      
        dispatch(sendMessage(newMsg))

        e.target.elements[0].value = ""
    }

    return (
        <form onSubmit={onSendMsg}>
            <CustomInput mb="1rem" width="100%" padding="0.4rem 1.0rem" color="#e5e5e5" textcolor="#5d5d5d"/>
        </form>
    )
}

export default ChatBar