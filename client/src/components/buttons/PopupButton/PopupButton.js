import React from 'react'
import styled from 'styled-components'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import Button from 'styles/Button'
import { StIconButton } from "shared/styles/Buttons"

import usePopupButton from './usePopupButton'

const SModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PopupButton = ({ Icon, Header, Body, footerButtonTitle, onBeforeToggle, onAfterToggle, onSubmit }) => {
    const { modal, toggle } = usePopupButton()

    const onToggle = () => {
        if(onBeforeToggle)  onBeforeToggle()
        if(onAfterToggle)   onAfterToggle()
        toggle()
    }

    return (
        <StIconButton>
            <Icon size={30} onClick={onToggle}/>
            <Modal onClose={onToggle} isOpen={modal} toggle={onToggle} style={{height: "300px !important"}}>
                <ModalHeader toggle={onToggle}>
                    <Header />
                </ModalHeader>
                <ModalBody>
                    <Body /> 
                    <SModalFooter>
                        <Button onClick={() => { 
                            onSubmit()
                            toggle()
                        }}>
                            { footerButtonTitle }
                        </Button>
                    </SModalFooter> 
                </ModalBody>
            </Modal>
        </StIconButton>
    )
}

export default PopupButton
