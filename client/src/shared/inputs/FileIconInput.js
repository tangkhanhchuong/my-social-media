import React from "react"
import styled from "styled-components"

import { StIconButton } from "shared/styles/Buttons"

const StOverlayButton = styled(StIconButton)`
  position: relative;
  input[type="file"]::-webkit-file-upload-button {
    cursor: pointer;
  }
`

const StInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  opacity: 0;
`

const FileIconInput = (props) => {
  const { onChange, Icon, type } = props

  return (
    <StOverlayButton {...props} type="button">
      <StInput
        type="file"
        onChange={onChange}
        accept={type === "image" ? "image/*" : "*"}
      />
      <Icon size={25} />
    </StOverlayButton>
  )
}

export default FileIconInput
