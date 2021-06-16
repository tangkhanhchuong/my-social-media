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
    border: 1px solid lightgray;
`

const StToolButtons = styled.div`
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

    const onSendMsg = (e) => {
        e.preventDefault()
        const val = e.target.elements[1].value
        if(!val || val === "")    return
        
        const newMsg = {
            _id: uuidv4(),
            content: val, 
            chat: chatId,
            type: "TEXT",
            sender: {
                _id: authReducer.userId,
                username: authReducer.username
            }
        }      
        dispatch(sendMessage(newMsg))

        e.target.elements[1].value = ""
    }

    return (
        <StChatBarContainer onSubmit={onSendMsg}>
            <StToolButtons>
                <StickerButton />  
                <FileIconInput Icon={FaPhotoVideo}/>
            </StToolButtons>
            <CustomInput mb="0" width="100%" padding="0.4rem 1.0rem" color="#e5e5e5" textcolor="#5d5d5d"/>
        </StChatBarContainer>
    )
}

export default ChatBar