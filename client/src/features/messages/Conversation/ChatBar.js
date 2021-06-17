import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { FaPhotoVideo } from "react-icons/fa"

import { CustomInput } from 'components/Input'
import { sendMessage } from 'app/slices/message_slice'
import StickerButton from './StickerButton'
import FileIconInput from 'shared/inputs/FileIconInput'

const StChatBarContainer = styled.form`
`

const StToolButtons = styled.div`
    border: 1px solid lightgray;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    button {
        margin: 0 10px;
    }
`

const ChatBar = () => {
    const { id: chatId } = useParams()

    const authReducer = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSendMessage = (type, val) => {
        const newMsg = {
            _id: uuidv4(),
            content: val, 
            chat: chatId,
            type,
            sender: {
                _id: authReducer.userId,
                username: authReducer.username
            }
        }      
        dispatch(sendMessage(newMsg))
    }

    const onSendTextMessage = (e) => {
        e.preventDefault()

        const textVal = e.target.elements[0].value
        if(!textVal || textVal === "")    return
        onSendMessage("TEXT", textVal)

        e.target.elements[0].value = ""
    }

    const onImageTextMessage = (e) => {
        e.preventDefault()

        const imageVal = e.target.files[0]
        console.log(imageVal)
        // onSendMessage("IMAGE", textVal)

        // e.target.elements[0].value = ""
    }

    return (
        <>
            <StToolButtons>
                <StickerButton />  
                <FileIconInput Icon={FaPhotoVideo} type="image" onChange={onImageTextMessage}/>
            </StToolButtons>
            <StChatBarContainer onSubmit={onSendTextMessage}>
                <CustomInput mb="0" width="100%" padding="0.4rem 1.0rem" color="#e5e5e5" textcolor="#5d5d5d"/>
            </StChatBarContainer>
        </>
    )
}

export default ChatBar