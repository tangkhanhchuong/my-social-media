import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-query'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { FaPlus } from 'react-icons/fa'
import { toast } from "react-toastify"

import Button from 'styles/Button'
import Avatar from "styles/Avatar"
import chatRequests from 'http/chat_requests'

import SearchBar from './SearchBar'

const avatarSrc = `https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`

const StyledNewConvBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.accentColor};
  background-color: #fff;


  &: hover {
    background-color: ${(props) => props.theme.hover};
  }
`

const RecommendUserItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;

  &:hover{
    background-color: ${(props) => props.theme.hover};
  }
`

const SelectedUserItem = styled.li`

`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RecommendedUsers = ({ recommendedUsers, setSelectedUsers, selectedUsers, setAddFinish }) => {
  if(!recommendedUsers) return <></>

  const onAddUser = (user) => {
    if(selectedUsers.every((u) => u._id !== user._id))
      setSelectedUsers(prev => ([...prev, user]))
    else {
      const filteredUsers = selectedUsers.filter(u => u._id !== user._id)
      setSelectedUsers(filteredUsers)
    }
    
    setAddFinish(true)
  }

  return (
    <ul>
      {
        recommendedUsers.map(user => (
          <RecommendUserItem key={user._id} onClick={onAddUser.bind(this, user)}>
            <Avatar size="50px" src={avatarSrc} alt="avatar" />
            { user.username }
          </RecommendUserItem>
        ))
      }
    </ul>
  )
}

const SelectedUsers = ({ selectedUsers }) => {
  return (
    <ul>
      {
        selectedUsers.map(user => (
          <SelectedUserItem key={user._id}>
            {user.username}
          </SelectedUserItem>
          
        ))
      }
    </ul>
  )
}

const NewConversation = (props) => {
  const [modal, setModal] = useState(false)
  const [recommendedUsers, setRecommendedUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [addFinish, setAddFinish] = useState(false)

  const onAddSuccess = (data) => {
    toast.success(`Conversation was created`)
    onCloseModal()
  }

  const { mutate } = useMutation(chatRequests.add, {
    mutationKey: 'add_chat',
    onSuccess: onAddSuccess
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
    <StyledNewConvBtn onClick={toggle}>
        <FaPlus />  
        <Modal onClose={onCloseModal} isOpen={modal} toggle={onCloseModal} style={{height: "300px !important"}}>
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
              <ModalFooter>
                <Button onClick={onCreateConversation}>Next</Button>{' '}
              </ModalFooter> 
            </ModalBody>
        </Modal>
    </StyledNewConvBtn>
  )
}

export default NewConversation