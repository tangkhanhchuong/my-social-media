import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

const MessagesContainer = styled.div`
    background-color: white;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
` 

const Message = styled.div`
    display: flex;
    justify-content: ${props => props.fromMe ? "flex-end": "flex-start"};
`

const Bubble = styled.div`
    margin: 10px 25px;
    padding: 8px 12px;
    word-wrap: break-word;


    background-color: ${props => props.fromMe ? "#CA2055": "lightgray"};
    color: ${props => props.fromMe ? "white": "black"};
    border-radius: 40px
`

const Messages = (props) => {
    const { messages, authInfo } = props
    const ref = useRef()

    useEffect(()=>{
        const scrollToBottomOfView = () => {
            ref.current.scrollTop = (ref.current.scrollHeight - ref.current.offsetHeight)
        }
        scrollToBottomOfView()
    }, [messages])

    return (
        <MessagesContainer ref={ref}> 
            {
                messages.map((msg) => {
                    const senderId = msg.sender._id
                    const fromMe = senderId === authInfo.userId

                    return (
                        <Message key={msg._id} fromMe={fromMe}>
                            <Bubble fromMe={fromMe}>{msg.content}
                            </Bubble>
                        </Message>  
                    )
                })
            }
        </MessagesContainer>
    )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth
    }
}

export default connect(mapStateToProps)(Messages)