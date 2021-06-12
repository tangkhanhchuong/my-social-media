import React, { useState } from 'react'
import { FaGithubAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Popover } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'

import { StIconButton } from "styled/Buttons"
import { StCenterWrapper } from "styled/Wrappers"
import { sendMessage } from 'app/slices/message_slice'

const {REACT_APP_SYSTEM_URL} = process.env

const getImagesFromServer = () => {
    const fromId = 19036
    const toId = 19060

    const images = []
    for (let i = fromId; i < toId; i++) {
        images.push(`/sticker-${i}.png`)
    }
    return images
}

const StStickersContainer = styled.div`
    width: 300px;
    height: 350px;

    display: grid;
    grid-template-columns: 150px 150px
`

const StSticker = styled.img`
    cursor: pointer;
    padding: 3px;
    border-radius: 10px;

    &:hover {
        background-color: ${p => p.theme.hover}
    }
`

const StickerItem = ({ imageSrc, onClosed }) => {
    const dispatch = useDispatch()
    const authReducer = useSelector(state => state.auth)
    const { id: chatId } = useParams()

    const src = `${REACT_APP_SYSTEM_URL}/storage/stickers${imageSrc}`

    const onSendSticker = () => {
        const newMsg = {
            _id: uuidv4(),
            content: imageSrc, 
            type: "STICKER",
            chat: chatId,
            sender: {
                _id: authReducer.userId,
                username: authReducer.username
            }
        }      
        dispatch(sendMessage(newMsg))

        onClosed()
    }

    return (
        <StSticker
            onClick={onSendSticker}
            src={src}
            width={130}
            height={130}
            className="stickers"
        />
    )
}

const StickerButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    }
    
    return (
        <div>
            <StIconButton type="button" variant="success" onClick={handleClick}>
                <FaGithubAlt size="25px" />
            </StIconButton>
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            >
                <StStickersContainer>
                    {
                        getImagesFromServer().map((imageSrc) => (
                            <StCenterWrapper key={imageSrc}>
                                <StickerItem imageSrc={imageSrc} onClosed={handleClose} />
                            </StCenterWrapper>
                        ))
                    }
                </StStickersContainer>
            </Popover>
        </div>
    )
};


export default StickerButton;