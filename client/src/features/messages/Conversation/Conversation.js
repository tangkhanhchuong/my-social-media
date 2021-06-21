import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import styled from "styled-components"
import { FaEdit } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

import { StIconButton, StButton } from "shared/styles/Buttons"
import Header from "shared/layout/Header"
import chatRequests from "http/chat_requests"

import ConversationContainer from "./ConversationContainer"
import ChatBar from "./ChatBar"
import { changeChatName } from "app/slices/message_slice"

const SModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SConversationContainer = styled.div`
  border: 1px solid lightgray;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-right: 10%;
`

const SInput = styled.input`
  border: none;
  width: 100%;
  padding: 4px 20px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
`

const SConversationHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  padding: auto 10px;

  &:hover {
    cursor: pointer;
  }
`

const Conversation = () => {
  const chatId = useParams().id
  const dispatch = useDispatch()
  const messagesReducer = useSelector((state) => state.message)
  const { mutate } = useMutation(chatRequests.update, {
    mutationKey: "update_chat",
  })

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [chatName, setChatName] = useState("")

  useEffect(() => {
    if (messagesReducer.allConversations[chatId]) {
      setChatName(messagesReducer.allConversations[chatId].chatName)
    }
  }, [messagesReducer.allConversations])

  const onOpenModal = () => {
    setChatName(messagesReducer.allConversations[chatId].chatName || "")
    toggle()
  }

  const changeNameSuccess = (data) => {
    const { _id, chatName } = data.data
    dispatch(changeChatName({ chatId: _id, chatName }))

    toast.success(`Conversation's name was changed`)
  }

  const onChangeName = async () => {
    mutate({ chatId, chatName }, { onSuccess: changeNameSuccess })
    toggle()
  }

  if (!chatId) {
    return (
      <SConversationContainer>
        <Header>Conversation</Header>
        Select Conversation
      </SConversationContainer>
    )
  }

  return (
    <SConversationContainer>
      <SConversationHeader>
        <>{messagesReducer.allConversations[chatId]?.chatName}</>
        <StIconButton>
          <FaEdit size={25} onClick={onOpenModal} />
          <Modal
            isOpen={modal}
            toggle={toggle}
            style={{ height: "300px !important" }}
          >
            <ModalHeader toggle={toggle}>Change Conversation Name</ModalHeader>
            <ModalBody>
              <SInput
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <SModalFooter>
                <StButton onClick={onChangeName}>Change</StButton>{" "}
              </SModalFooter>
            </ModalBody>
          </Modal>
        </StIconButton>
      </SConversationHeader>
      <ConversationContainer />
      <ChatBar />
    </SConversationContainer>
  )
}

export default Conversation
