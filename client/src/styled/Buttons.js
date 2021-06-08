import styled, { css } from "styled-components";

export const StButton = styled.button`
  padding: ${(props) => (props.sm ? "0.4rem 1rem" : "0.4rem 1.8rem")};
  color: ${(props) => (props.outline ? props.theme.accentColor : "#FFF")};
  background: ${(props) =>
    props.outline ? "inherit" : props.theme.accentColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => (props.sm ? "0.8rem" : "1rem")};
  letter-spacing: 1px;
  cursor: pointer;
  margin: 0.5rem;
  width: ${(props) => (props.xl ? "100%" : "none")};

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
    background-color: ${props => props.theme.accentColor};
    color: #FFF;
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
  background-color: #fff;


  &: hover {
    background-color: ${(props) => props.theme.hover};
  }
`