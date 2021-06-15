import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components' 

import { StVerticalScrollWrapper, StKingWrapper } from "shared/styles/Wrappers"
import chatRequests from 'http/chat_requests'
import { loadMoreMessages } from 'app/slices/message_slice'

const { REACT_APP_SYSTEM_URL } = process.env

const SMessagesContainer = styled(StVerticalScrollWrapper)`
    background-color: white;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    padding: 0 10px;
` 

const SMessage = styled.div`
    display: flex;
    justify-content: ${props => props.fromMe ? "flex-end": "flex-start"};
`

const SBubble = styled.div`
    margin: 10px 25px;
    padding: 8px 12px;
    word-wrap: break-word;

    background-color: ${props => props.fromMe ? "#CA2055": "lightgray"};
    color: ${props => props.fromMe ? "white": "black"};
    border-radius: 40px;
`

const StSticker = styled.img`
    cursor: pointer;
    padding: 3px;
    border-radius: 10px;
    width: ${p => p.sm ? "60px" : "120px"};
    height: ${p => p.sm ? "60px" : "120px"};
    &:hover {
        background-color: ${p => p.theme.hover}
    }
`

const Messages = ({ conversation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const chatId = useParams().id
    const dispatch = useDispatch()
    const authReducer = useSelector(state => state.auth)
    const messageReducer = useSelector(state => state.message)
    const { currentPage, numOfNewMessages } = messageReducer.allConversations[chatId]
    const { mutate } = useMutation(chatRequests.getMessages)

    const { messages } = conversation
    const ref = useRef()
    
    useEffect(() => {
        const scrollToBottomOfView = () => {
            if(Math.abs(ref.current.scrollTop - ref.current.offsetHeight) > 1) {
                ref.current.scrollTop = (ref.current.scrollHeight - ref.current.offsetHeight)
            }
        }
        scrollToBottomOfView()
    }, [messages])

    const onLoadMoreSuccess = (data) => {
        const moreMessages = data.data
        dispatch(loadMoreMessages({ moreMessages, chatId }))
        ref.current.scrollTop = ref.current.offsetHeight
        setIsLoading(false)
    }

    const detectReachingTop = () => ref.current.scrollTop === 0
    const onLoadMore = (currentPage) => {
        if(detectReachingTop() && !isLoading) {   
            setIsLoading(true)
            mutate({ chatId, page: currentPage, skip: numOfNewMessages }, { onSuccess: onLoadMoreSuccess })
        }
    }
    
    const startMessage = {
        _id: 1,
        content: "Begin to chat with him",
        sender: { _id: 1 },
        type: 'TEXT'
    }

    const showMessages = messages.length !== 0 ? messages : [startMessage]

    return (
        <SMessagesContainer ref={ref} onScroll={onLoadMore.bind(this, currentPage)}>
            <StKingWrapper justify="center" direction="row">
                {
                    isLoading ? "isLoading" : ""
                }
            </StKingWrapper>
            {
                showMessages.map((msg) => {
                    const senderId = msg.sender._id
                    const fromMe = senderId === authReducer.userId
                    
                    return (
                        <SMessage key={msg._id} fromMe={fromMe}>
                            {
                                msg.type === 'TEXT' ? (
                                    <SBubble fromMe={fromMe}>
                                        {msg.content}
                                    </SBubble>
                                ) : (
                                    <StSticker src={`${REACT_APP_SYSTEM_URL}/storage/stickers/${msg.content}`} alt="" />
                                )
                            }
                        </SMessage>  
                    )
                })
            }
        </SMessagesContainer>
    )
}

export default Messages