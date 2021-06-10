import styled, { css } from "styled-components";

export const StButton = styled.button`
  padding: ${(props) => (props.sm ? "0.4rem 1rem" : "0.4rem 1.8rem")};
  color: ${(props) => (props.outline ? props.theme.accentColor : "#FFF")};
  background: ${(props) =>
    props.outline ? "inherit" : props.theme.accentColor};
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => (props.sm ? "0.8rem" : "1rem")};
  letter-spacing: 1px;
  cursor: pointer;
  margin: 0.5rem;
  width: ${(props) => (props.sm ? "120px" : props.lg ? "160px" : "140px" )};
  height: ${(props) => (props.sm ? "40px" : props.lg ? "60px" : "50px" )};

  ${(props) =>
    props.relative &&
    css`
			position: relative;
			left: 52%;
	  `}

  @media screen and (max-width: 530px) {
    font-size: 0.8rem;

    ${(props) =>
      props.relative &&
      css`
        position: relative;
        left: 32%;
      `}
  }

  @media screen and (max-width: 430px) {
    ${(props) =>
      props.relative &&
      css`
        position: relative;
        left: 17%;
      `}
  }

  &:hover{ 
    background-color: ${props => props.theme.hover};
    color: ${props => props.theme.accentColor};
  }
`

export const StIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.bgColor};


  &: hover {
    background-color: ${(props) => props.bgHoverColor || props.theme.hover};
  }
`