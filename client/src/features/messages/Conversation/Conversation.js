import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/Header'

import ConversationContainer from './ConversationContainer'
import ChatBar from './ChatBar'
import { useSelector } from 'react-redux'

const SConversationContainer = styled.div`
    border: 1px solid lightgray; 
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-right: 10%
`

const Conversation = () => {
    const chatId = useParams().id
    const messagesReducer = useSelector(state => state.messages)

    if(!chatId)  {
        return (
            <SConversationContainer>
                <Header>Conversation</Header>
                Select Conversation
            </SConversationContainer>
        )
    }

    return (
        <SConversationContainer>
            <Header>{ messagesReducer.allConversations[chatId].chatName }</Header>
            <ConversationContainer/>
            <ChatBar />
        </SConversationContainer>  
    )

}

export default Conversation
