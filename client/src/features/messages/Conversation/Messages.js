import React, { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { StVerticalScrollWrapper, StKingWrapper } from "shared/styles/Wrappers"
import StAvatar from "shared/styles/Avatar"
import { CenterLoadingIndicator } from "shared/others/LoadingIndicator"
import chatRequests from "http/chat_requests"
import { loadMoreMessages } from "app/slices/message_slice"

const { REACT_APP_SYSTEM_URL } = process.env

const StMessagesContainer = styled(StVerticalScrollWrapper)`
  background-color: white;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
`

const StMessage = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.fromMe ? "row-reverse" : "row")};
  justify-content: flex-start;
  align-items: center;
`

const StBubble = styled.div`
  margin: 5px 10px;
  padding: 6px 12px;
  max-width: 350px;
  min-width: 44px;
  word-wrap: break-word;

  background-color: ${(props) => (props.fromMe ? "#CA2055" : "lightgray")};
  color: ${(props) => (props.fromMe ? "white" : "black")};
  border-radius: 25px;
`

const StSticker = styled.img`
  cursor: pointer;
  padding: 3px;
  border-radius: 10px;
  width: ${(p) => (p.sm ? "120px" : "200px")};
  height: ${(p) => (p.sm ? "120px" : "200px")};
`

const Messages = ({ conversation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const chatId = useParams().id
  const dispatch = useDispatch()
  const authReducer = useSelector((state) => state.auth)
  const messageReducer = useSelector((state) => state.message)
  const { currentPage, numOfNewMessages } = messageReducer.allConversations[chatId]
  const { mutate } = useMutation(chatRequests.getMessages)

  const { messages } = conversation
  const ref = useRef()

  useEffect(() => {
    const scrollToBottomOfView = () => {
      if (Math.abs(ref.current.scrollTop - ref.current.offsetHeight) > 1) {
        ref.current.scrollTop =
          ref.current.scrollHeight - ref.current.offsetHeight
      }
    }
    scrollToBottomOfView()
  }, [messages])

  const onLoadMoreSuccess = (data) => {
    const moreMessages = data.data
    setTimeout(() => {
      dispatch(loadMoreMessages({ moreMessages, chatId }))

      if (moreMessages.length > 0)
        ref.current.scrollTop = ref.current.offsetHeight
      else {
        setCanLoadMore(false)
        ref.current.scrollTop = 0
      }
      setIsLoading(false)
    }, 1000)
  }

  const detectReachingTop = () => ref.current.scrollTop === 0
  
  const onLoadMore = (currentPage) => {
    if (!detectReachingTop() || isLoading || !canLoadMore) return
    setIsLoading(true)
    mutate(
      { chatId, page: currentPage, skip: numOfNewMessages },
      { onSuccess: onLoadMoreSuccess }
    )
  }

  const startMessage = {
    _id: 1,
    content: "Begin to chat with him",
    sender: { _id: 1 },
    type: "TEXT",
  }

  const showMessages = messages.length !== 0 ? messages : [startMessage]

  return (
    <StMessagesContainer
      ref={ref}
      onScroll={onLoadMore.bind(this, currentPage)}
    >
      <StKingWrapper justify="center" direction="row">
        {isLoading && <CenterLoadingIndicator />}
      </StKingWrapper>
      {showMessages.map((msg, index) => {
        const { _id: senderId, avatar } = msg.sender
        const fromMe = senderId === authReducer.userId

        const prevMessage = showMessages[index - 1]
        const isNotFirstMsg = prevMessage
          ? prevMessage.sender._id !== senderId
          : true

        const tempAvatar =
          "https://img2.thuthuatphanmem.vn/uploads/2018/12/12/anh-naruto-be-bong-dep_104804081.jpg"
        const showAvatar = avatar
          ? process.env.REACT_APP_SYSTEM_URL + "/" + avatar
          : tempAvatar

        return (
          <StMessage key={msg._id} fromMe={fromMe}>
            <StAvatar
              hidden={fromMe}
              conceal={!isNotFirstMsg}
              src={showAvatar}
            />
            {msg.type === "TEXT" ? (
              <StBubble fromMe={fromMe}>{msg.content}</StBubble>
            ) : (
              <StSticker
                src={`${REACT_APP_SYSTEM_URL}/storage/stickers/${msg.content}`}
                alt=""
              />
            )}
          </StMessage>
        )
      })}
    </StMessagesContainer>
  )
}

export default Messages
