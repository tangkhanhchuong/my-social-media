import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import Avatar from "styles/Avatar"
import Header from 'components/Header'
import chatRequests from 'http/chat_requests'
import NewConversation from './NewConversation'

const S_ChatListContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column
`

const S_ChatContainer = styled.div`
    border-bottom: 1px solid #CA2055;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.hover};
    }
`

const S_AvatarContainer = styled.div`
	display: flex;
    flex-direction: row;
	justify-content: flex-start;

	img {
		margin-top: 8px;
	}
	b {
		margin-top: 15px;
	}
`

const S_NameAndLatedMsg = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    padding-top: -2px;
    flex: 1
`

const S_LastMsg = styled.p`
    font-size: 14px;
    color: gray;
    margin-bottom: 0
`

const S_ChatLink = styled(Link)`
    text-decoration: none !important;
    color: black !important
`


const Chat = ({ chat }) => {
    const { chatName, _id, latestMessage } = chat

    const MAX_LEN_LAST_MSG = 30

    const generateFitContent = (msg) => {
        if(!msg)    return ""

        const msgContent = msg.content
        return msgContent.length < MAX_LEN_LAST_MSG ? msgContent : msgContent.slice(0, MAX_LEN_LAST_MSG) + " ..."
    }

    return (
        <S_ChatContainer>
            <S_ChatLink to={`/messages/${_id}`}>        
                <S_AvatarContainer>
                    <Avatar size="50px" src={`https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`} alt="avatar" />
                    <S_NameAndLatedMsg>
                        <b>{chatName}</b>
                        <S_LastMsg>{generateFitContent(latestMessage)}</S_LastMsg>
                    </S_NameAndLatedMsg>
                </S_AvatarContainer>
            </S_ChatLink>
        </S_ChatContainer>
    )   
}

const ChatList = () => {
    const { data, isLoading } = useQuery('get_chats', chatRequests.list)

    if(isLoading)   return <>Loading</>

    const chatList = data.data

    return chatList.map(chat => <Chat chat={chat} key={chat._id}/>  )    
}

const SideBar = () => {
    return (
        <S_ChatListContainer>
            <Header justify="space-between">
                <b>Messages</b>
                <NewConversation buttonLabel="Hello" />
            </Header>
            <ChatList />
        </S_ChatListContainer>
    )
}

export default SideBar
