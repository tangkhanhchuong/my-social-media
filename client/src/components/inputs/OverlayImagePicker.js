import React from 'react'
import { FaCamera } from "react-icons/fa"
import styled from "styled-components"

import { StIconButton } from "styled/Buttons"

const SInfoContainer = styled.div`
  position: relative;
  filter: brightness(50%);
  width: ${p => p.size};
  height: ${p => p.size}; 
  input[type=file]::-webkit-file-upload-button { 
    cursor: pointer
  }
`

const StOverlayButton = styled(StIconButton)`
  position: absolute;
  top: calc(50% - ${p => p.top ? p.top + "px" : "0px"});
  left: calc(50% + ${p => p.left ? p.left + "px" : "0px"});
  transform: translate(-50%,-50%);
`

const StInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  opacity: 0
`
const OverlayImagePicker = ({children, onChange}) => {
  const { size, top, left } = children.props
  return (
      <SInfoContainer size={size}>
          {children}
          <StOverlayButton top={top} left={left} bgColor="rgba(0,0,0,0)" bgHoverColor="rgba(0,0,0,0.5)">
            <StInput 
              type="file"
              onChange={onChange}
            />
            <FaCamera size={25} />
          </StOverlayButton>
      </SInfoContainer>
  )
}

export default OverlayImagePicker
