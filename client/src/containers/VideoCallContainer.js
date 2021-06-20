import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { StButton } from 'shared/styles/Buttons'

const VideoCallContainer = () => {
    const history = useHistory()
    const messageReducer = useSelector(state => state.message)
    const { myPeerId, videoCall } = messageReducer
    const { caller, callId } = videoCall

    const [confirmModal, setConfirmModal] = useState(false)
    const toggleConfirm = () => setConfirmModal(confirmModal => !confirmModal)
    const confirm = () => {
        toggleConfirm()
        console.log(callId)
        history.push(`messages/${callId}`)
    }  

    useEffect(() => {
        if(caller && caller !== myPeerId) {
            toggleConfirm()
        }
      }, [caller])

    return (
        <Modal isOpen={confirmModal} >
            <ModalBody>
                {caller} is calling you
            </ModalBody>
            <ModalFooter>
                <StButton sm outline onClick={confirm}>Accept</StButton>
            </ModalFooter>
        </Modal>
    )
}

export default VideoCallContainer
