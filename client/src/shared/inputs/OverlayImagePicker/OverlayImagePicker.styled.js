import styled from "styled-components"

import { StIconButton } from "shared/styles/Buttons"

export const SInfoContainer = styled.div`
  position: relative;
  filter: brightness(50%);
  width: ${p => p.size};
  height: ${p => p.size}; 
  input[type=file]::-webkit-file-upload-button { 
    cursor: pointer
  }
`

export const StOverlayButton = styled(StIconButton)`
  position: absolute;
  top: calc(50% - ${p => p.top ? p.top + "px" : "0px"});
  left: calc(50% + ${p => p.left ? p.left + "px" : "0px"});
  transform: translate(-50%,-50%);
`

export const StInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  opacity: 0
`