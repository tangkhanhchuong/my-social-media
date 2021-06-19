import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaPhone } from 'react-icons/fa'
import styled from 'styled-components'
import Peer from 'peerjs'
import { StButton } from 'shared/styles/Buttons'

import { StIconButton } from 'shared/styles/Buttons'
import { startCalling, joinCall } from 'app/slices/message_slice'

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-auto-rows: 300px;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const VideoCallButton = ({ chatId }) => {
  const [callModal, setCallModal] = useState(false)
  const toggle = () => setCallModal(modal => !modal)  

  // const [confirmModal, setConfirmModal] = useState(false)
  // const toggleConfirm = () => confirmModal(confirmModal => !confirmModal)
  // const confirm = () => {
  //   setConfirmModal(false)
  //   setCallModal(true)
  // }  

  const videoRef = useRef()
  const [videoStream, setVideoStream] = useState()
  const dispatch = useDispatch()
  const messageReducer = useSelector(state => state.message)
  const { myPeerId, videoCall } = messageReducer
  const { caller, joiner } = videoCall
  const myPeer = new Peer()

  const leaveCall = () => {
    videoRef.current.srcObject = null
    videoStream.getTracks().forEach(t => t.stop())
    toggle()
  }

  const connectToNewUser = ({ userId, stream }) => {
    const video = document.createElement('video')
    
    const call = myPeer.call(userId, stream)
    if(!call) return
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  }

  const addVideoStream = (video, stream) => {
    if(!videoRef.current) return
    video.srcObject = stream
    video.muted = true
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    // setVideoStream(null)
    videoRef.current.append(video)
  }
  
  const myVideo = document.createElement('video')

  useEffect(() => {
    if(callModal) {
      
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        setVideoStream(stream)
        addVideoStream(myVideo, stream)
      })
      .catch(err => {
        console.log(err.message)
      }) 
    }
  }, [callModal])

  useEffect(() => {
   if(videoStream)   {
    myPeer.on('call', (call) => {
      call.answer(videoStream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    }) 

    myPeer.on('open', userPeerId => {
      if(!caller) {
        dispatch(startCalling({ chatId, userPeerId }))
      }
      dispatch(joinCall({ userPeerId, chatId }))
      messageReducer.socket.on('user_join_call', (payload) => {
        connectToNewUser({ userId: payload.userPeerId, stream: videoStream })
      })
    }) 
   }
  }, [videoStream])

  useEffect(() => {
    if(caller && caller !== myPeerId) {
      const a = window.confirm(caller + " is calling you ...")
      console.log(a)
      if(a)
        toggle()
    }
  }, [caller])

  return (
      <StIconButton onClick={toggle}>
          <FaPhone />
          <Modal style={{minWidth: '600px', minHeight: '500px'}} isOpen={callModal} >
            <ModalBody>
                <VideoGrid ref={videoRef}></VideoGrid>
            </ModalBody>
            <ModalFooter>
              <StButton sm outline onClick={leaveCall}>Leave</StButton>
            </ModalFooter>
          </Modal>
      </StIconButton>
  )
}

export default VideoCallButton
