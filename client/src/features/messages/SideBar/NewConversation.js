import React, { useState } from "react"
import styled from "styled-components"
import { useMutation } from "react-query"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import { FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import StAvatar from "shared/styles/Avatar"
import { StIconButton, StButton } from "shared/styles/Buttons"
import chatRequests from "http/chat_requests"

import SearchBar from "./SearchBar"
import { useDispatch } from "react-redux"
import { addConversation } from "app/slices/message_slice"

const avatarSrc = `https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`

const SRecommendUserItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`

const SSelectedUserItem = styled.li``

const SModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RecommendedUsers = ({
  recommendedUsers,
  setSelectedUsers,
  selectedUsers,
  setAddFinish,
}) => {
  if (!recommendedUsers) return <></>

  const onAddUser = (user) => {
    if (selectedUsers.every((u) => u._id !== user._id))
      setSelectedUsers((prev) => [...prev, user])
    else {
      const filteredUsers = selectedUsers.filter((u) => u._id !== user._id)
      setSelectedUsers(filteredUsers)
    }

    setAddFinish(true)
  }

  return (
    <ul>
      {recommendedUsers.map((user) => (
        <SRecommendUserItem key={user._id} onClick={onAddUser.bind(this, user)}>
          <StAvatar size="50px" src={avatarSrc} alt="avatar" />
          {user.username}
        </SRecommendUserItem>
      ))}
    </ul>
  )
}

const SelectedUsers = ({ selectedUsers }) => {
  return (
    <ul>
      {selectedUsers.map((user) => (
        <SSelectedUserItem key={user._id}>{user.username}</SSelectedUserItem>
      ))}
    </ul>
  )
}

const NewConversation = (props) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [addFinish, setAddFinish] = useState(false)

  const onAddSuccess = (data) => {
    toast.success(`Conversation was created`)

    const newConversation = data.data
    dispatch(addConversation(newConversation))

    onCloseModal()
  }

  const { mutate } = useMutation(chatRequests.add, {
    mutationKey: "add_chat",
    onSuccess: onAddSuccess,
  })

  const toggle = () => setModal(!modal)

  const onCloseModal = () => {
    setRecommendedUsers([])
    setSelectedUsers([])
    setAddFinish(false)
    toggle()
  }

  const onCreateConversation = () => {
    mutate(selectedUsers)
    onCloseModal()
  }

  return (
    <StIconButton onClick={toggle}>
      <FaPlus />
      <Modal onClose={onCloseModal} isOpen={modal} toggle={onCloseModal}>
        <ModalHeader toggle={onCloseModal}>New Conversation</ModalHeader>
        <ModalBody>
          <SearchBar
            setRecommendedUsers={setRecommendedUsers}
            addFinish={addFinish}
            setAddFinish={setAddFinish}
          />
          <SelectedUsers selectedUsers={selectedUsers} />
          <RecommendedUsers
            recommendedUsers={recommendedUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setAddFinish={setAddFinish}
          />
          <SModalFooter>
            <StButton onClick={onCreateConversation}>Next</StButton>{" "}
          </SModalFooter>
        </ModalBody>
      </Modal>
    </StIconButton>
  )
}

export default NewConversation
