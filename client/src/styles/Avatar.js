import styled from "styled-components";

export default styled.img`
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  background-color: white;

  @media screen and (max-width: 530px) {
    height: ${(props) => (props.lg ? "110px" : "40px")};
    width: ${(props) => (props.lg ? "110px" : "40px")};
  }

  &:hover {
    background-color: lightgray;
  }
`;
