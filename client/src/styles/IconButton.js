import styled from 'styled-components'

export const SIconButton = styled.button`
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