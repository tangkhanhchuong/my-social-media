import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/Header'

import ConversationContainer from './ConversationContainer'

const StyledConversationContainer = styled.div`
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
            <StyledConversationContainer>
                <Header>Conversation</Header>
                Select Conversation
            </StyledConversationContainer>
        )
    }

    return (
        <StyledConversationContainer>
            <Header>{ chatId }</Header>
            <ConversationContainer chatId={chatId}/>
        </StyledConversationContainer>  
    )

}

export default Conversation
