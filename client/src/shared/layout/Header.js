import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 0.6rem 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  display: flex;
  justify-content: ${props => props.justify || "flex-start"};
  align-items: center;
  font-weight: bold;
  background-color: white;
`

const Header = (props) => <Wrapper {...props}>{props.children}</Wrapper>

export default Header
