import React, { useState } from 'react'
import { FaGithubAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Popover } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'

import { StIconButton } from "styled/Buttons"
import { StCenterWrapper } from "styled/Wrappers"
import { addStickersSuits, changeStickersSuit, sendMessage } from 'app/slices/message_slice'
import stickerRequests from "http/sticker_request"
import { useMutation } from 'react-query'

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

const StStickerPopover = styled(Popover)`
    overflow-y: hidden
`

const StStickersContainer = styled.div`
    width: 300px;
    height: 380px;
    overflow-y: scroll;

    display: grid;
    grid-template-columns: 150px 150px
`

const StStickerSuits = styled.div`
    position: absolute; 
    bottom: 0px;
    height: 90px;
    width: 100%; 
    background-color: white;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    padding: 5px 10px;

    .img {

    }
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

const StickerSuitItem = ({sticker}) => {
    const src = `${REACT_APP_SYSTEM_URL}/storage/stickers${sticker.stickers[0]}`
    
    const dispatch = useDispatch()
    
    const onChangeStickersSuit = () => {
        dispatch(changeStickersSuit(sticker._id))
    }

    return (
        <StSticker
            sm
            onClick={onChangeStickersSuit}
            src={src}
            width={130}
            height={130}
            className="stickers"
        />
    )
}

const StickerItem = ({ sticker, onClosed }) => {
    const dispatch = useDispatch()
    const authReducer = useSelector(state => state.auth)
    const { id: chatId } = useParams()

    const src = `${REACT_APP_SYSTEM_URL}/storage/stickers${sticker}`

    const onSendSticker = () => {
        const newMsg = {
            _id: uuidv4(),
            content: sticker, 
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
    const dispatch = useDispatch()
    const messageReducer = useSelector(state => state.message)
    const [anchorEl, setAnchorEl] = useState(null)
    const { mutate } = useMutation(stickerRequests.get, {
        mutationKey: "get_sticker_collections"
    })

    const onAddStickerCollections = (data) => {
        dispatch(addStickersSuits(data.data))
    }

    const handleClick = (event) => {
        mutate({}, {
            onSuccess: onAddStickerCollections
        })
        setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
        setAnchorEl(null)
    }

    const { current, collection } = messageReducer.stickers
    
    return (
        <div>
            <StIconButton type="button" variant="success" onClick={handleClick}>
                <FaGithubAlt size="25px" />
            </StIconButton>
            <StStickerPopover
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
                {
                    !collection ? <>Loading</> : (
                        <>
                            <StStickerSuits>
                                {
                                    collection.map(st => <StickerSuitItem sm key={st._id} sm sticker={st} onClosed={handleClose} />)
                                }
                            </StStickerSuits>
                            <StStickersContainer>
                                {
                                    current.stickers.map((st) => (
                                        <StCenterWrapper key={st}>
                                            <StickerItem sticker={st} onClosed={handleClose} />
                                        </StCenterWrapper>
                                    ))
                                }
                            </StStickersContainer>    
                        </> 
                    )
                }
            </StStickerPopover>
        </div>
    )
};


export default StickerButton;