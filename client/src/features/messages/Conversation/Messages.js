import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components' 

import { StVerticalScrollWrapper } from "styled/Wrappers"

const {REACT_APP_SYSTEM_URL} = process.env

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
    border-radius: 40px
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
    const authReducer = useSelector(state => state.auth)

    const { messages } = conversation
    const ref = useRef()
    useEffect(()=>{
        const scrollToBottomOfView = () => {
            ref.current.scrollTop = (ref.current.scrollHeight - ref.current.offsetHeight)
        }
        scrollToBottomOfView()
    }, [messages])

    
    const startMessage = {
        _id: 1,
        content: "Begin to chat with him",
        sender: { _id: 1 },
        type: 'TEXT'
    }

    const showMessages = messages.length !== 0 ? messages : [startMessage]

    return (
        <SMessagesContainer ref={ref}> 
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