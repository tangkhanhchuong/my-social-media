import React from 'react'
import { FaCamera } from 'react-icons/fa'
import styled from 'styled-components'

import FileIconInput from './FileIconInput'

const StPickerContainer = styled.div`
  position: relative;
  display: block;
  filter: brightness(50%);
  width: ${p => p.avatar ? '110px' : '100%'};
  height: ${p => p.avatar ? '110px' : '100%'};
`

const StPicker = styled(FileIconInput)`
  position: absolute;
  top: calc(50% - (${p => p.top ? p.top : 0}px));
  left: calc(50% + (${p => p.left ? p.left : 0}px));
  transform: translate(-50%, -50%);
`

const OverlayImagePicker = ({children, onChange, avatar}) => {
  const { top, left } = children.props

  return (
      <StPickerContainer avatar={avatar}>
          {children}
          <StPicker type="image" top={top} left={left} Icon={FaCamera} onChange={onChange} />
      </StPickerContainer>
  )
}

export default OverlayImagePicker
