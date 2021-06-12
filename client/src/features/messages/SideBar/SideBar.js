import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from "styles/Avatar"
import Header from 'components/layout/Header'
import chatRequests from 'http/chat_requests'
import NewConversation from './NewConversation'
import { initializeAllConversations } from 'app/slices/message_slice'

const SChatListContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column
`

const SChatContainer = styled.div`
    border-bottom: 1px solid #CA2055;
    padding: 10px 20px;
    cursor: pointer;
    background-color: ${(props) => props.selected ? props.theme.hover : 'white'};
    &:hover {
        background-color: ${(props) => props.theme.hover};
    }
`

const SAvatarContainer = styled.div`
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

const SNameAndLatedMsg = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    padding-top: -2px;
    flex: 1
`

const SLastMsg = styled.p`
    font-size: 14px;
    color: gray;
    margin-bottom: 0
`

const SChatLink = styled(Link)`
    text-decoration: none !important;
    color: black !important
`


const Chat = ({ chat }) => {
    const authReducer = useSelector(state => state.auth)

    const { chatName, _id, latestMessage, type } = chat

    const MAX_LEN_LAST_MSG = 30

    const currentChatId = useParams().id

    const generateLatestMessage = () => {
        if(!latestMessage)  return ""
        if(type === "TEXT") return latestMessage
        const sender = latestMessage.sender._id === authReducer.userId ? "You" : latestMessage.sender.username
        return sender + " sent a sticker !"
    }

    const generateFitContent = (content) => {
        return content.length < MAX_LEN_LAST_MSG ? content : content.slice(0, MAX_LEN_LAST_MSG) + " ..."
    }

    return (
        <SChatContainer selected={currentChatId===_id}>
            <SChatLink to={`/messages/${_id}`}>        
                <SAvatarContainer>
                    <Avatar size="50px" src={`https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`} alt="avatar" />
                    <SNameAndLatedMsg>
                        <b>{generateFitContent(chatName)}</b>
                        <SLastMsg>{generateFitContent(generateLatestMessage())}</SLastMsg>
                    </SNameAndLatedMsg>
                </SAvatarContainer>
            </SChatLink>
        </SChatContainer>
    )   
}

const ChatList = () => {
    const dispatch = useDispatch()
    const messagesReducer = useSelector(state => state.message)

    const onChatListFetched = (data) => {
        const allConversations = data.data
        dispatch(initializeAllConversations(allConversations))
    }

    const { isLoading } = useQuery('get_chats', chatRequests.list, { onSuccess: onChatListFetched })

    if(isLoading)   return <>Loading</>

    return Object.values(messagesReducer.allConversations).map(chat => <Chat chat={chat} key={chat._id}/>  )    
}

const SideBar = () => {
    return (
        <SChatListContainer>
            <Header justify="space-between">
                <b>Messages</b>
                <NewConversation buttonLabel="Hello" />
            </Header>
            <ChatList />
        </SChatListContainer>
    )
}

export default SideBar
