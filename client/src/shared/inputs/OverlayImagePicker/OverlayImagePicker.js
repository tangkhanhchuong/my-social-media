import React from 'react'
import { FaCamera } from "react-icons/fa"

import { SInfoContainer, StOverlayButton, StInput } from './OverlayImagePicker.styled'

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
