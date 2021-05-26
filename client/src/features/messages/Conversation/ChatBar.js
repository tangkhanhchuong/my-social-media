import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CustomInput } from 'components/Input'
import { socket } from 'store/messages/messages_actions'
import { v4 as uuidv4 } from 'uuid'

const ChatBar = (props) => {
    const { id: chatId } = useParams()

    const { authInfo } = props

    const onSendMsg = (e) => {
        e.preventDefault()
        const val = e.target.elements[0].value
        if(!val || val === "")    return

        const newMsg = {
            _id: uuidv4(),
            content: val, 
            chat: chatId,
            sender: {
                _id: authInfo.userId,
                username: authInfo.username
            }
        }      
        // setMessages((messages => ([ ...messages, newMsg ])))

        const { _id, username} = JSON.parse(localStorage.getItem('authInfo'))

        if(socket) socket.emit("send_msg", newMsg)
        e.target.elements[0].value = ""
    }

    return (
        <form onSubmit={onSendMsg}>
            <CustomInput mb="1rem" width="100%" padding="0.4rem 1.0rem" color="#e5e5e5" textcolor="#5d5d5d"/>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth
    }
}

export default connect(mapStateToProps)(ChatBar)