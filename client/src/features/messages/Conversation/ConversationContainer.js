import React, { useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import chatRequests from 'http/chat_requests'

import Messages from './Messages'
import { addConversation } from '../message_slice'

const SMessagesContainer = styled.div`
    flex: 1
`

const ConversationContainer = () => {
    const dispatch = useDispatch()

    const messagesReducer = useSelector(state => state.messages)
    const chatId = useParams().id
    const { mutate } = useMutation(chatRequests.getMessages)

    const onMessagesFetched = (data) => {
        const conv = { messages: data.data, _id: chatId}
        dispatch(addConversation(conv))
    }
    
    const currentConversation = messagesReducer.allConversations[chatId]
    const isConversationInitialized = currentConversation.isInitialized

    useEffect(() => {
        if(!isConversationInitialized) {
            mutate(chatId, {
                onSuccess: onMessagesFetched
            })
        }
    }, [chatId])

    if(!isConversationInitialized)   return <SMessagesContainer>Loading</SMessagesContainer>
    return  <Messages conversation={currentConversation} /> 
}


export default ConversationContainer