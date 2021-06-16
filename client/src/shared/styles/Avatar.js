import styled from "styled-components"

const StAvatar = styled.img`
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  background-color: white;
  box-shadow: 1px 2px 2px black;
  margin: ${p => p.m || "0px"};
  opacity: ${p => p.conceal ? 0 : 1};

  @media screen and (max-width: 530px) {
    height: ${(props) => (props.lg ? "110px" : "40px")};
    width: ${(props) => (props.lg ? "110px" : "40px")};
  }

  &:hover {
    background-color: lightgray;
  }
`
export default StAvatar