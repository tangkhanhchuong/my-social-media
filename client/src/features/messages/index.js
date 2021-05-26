import React from 'react'
import styled from 'styled-components'

import SideBar from './SideBar/SideBar'
import Conversation from './Conversation/Conversation'

const MessageContainer = styled.div`
    display: grid;
    grid-template-columns: 35% 1fr;
`

const Messages = () => {
    return (
        <MessageContainer>
            <SideBar />
            <Conversation />     
        </MessageContainer>
    )
}

export default Messages