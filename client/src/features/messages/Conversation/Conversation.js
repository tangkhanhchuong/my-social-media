import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/Header'

import ConversationContainer from './ConversationContainer'
import ChatBar from './ChatBar'

const S_ConversationContainer = styled.div`
    border: 1px solid lightgray; 
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-right: 10%
`

const Conversation = () => {
    const chatId = useParams().id

    if(!chatId)  {
        return (
            <S_ConversationContainer>
                <Header>Conversation</Header>
                Select Conversation
            </S_ConversationContainer>
        )
    }

    return (
        <S_ConversationContainer>
            <Header>{ chatId }</Header>
            <ConversationContainer/>
            <ChatBar />
        </S_ConversationContainer>  
    )

}

export default Conversation
