import React, { useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import chatRequests from 'http/chat_requests'
import { setAllMessages } from 'store/messages/messages_actions'

import Messages from './Messages'

const S_MessagesContainer = styled.div`
    flex: 1
`

const mapStateToProps = state => {
    return {
        allMessages: state.socket.allMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeConversation: async (messages) => await dispatch(setAllMessages(messages))
    }
}

const ConversationContainer = (props) => {
    const startMessage = {
        _id: 1,
        content: "Begin to chat with him",
        sender: { _id: 1 }
    }

    const chatId = useParams().id
    const { initializeConversation, allMessages } = props

    const { data, mutate } = useMutation(chatRequests.getMessages)

    useEffect(() => {
        mutate(chatId)
    }, [chatId])

    useEffect(() => {
        if(data) {
            initializeConversation(data.data)
            
        }
    }, [data])

    if(!data)   return <S_MessagesContainer>Loading</S_MessagesContainer>

    return  <Messages messages={allMessages.length !== 0 ? allMessages : [startMessage]}/> 
}


export default connect(mapStateToProps, mapDispatchToProps)(ConversationContainer)