import styled from "styled-components";

export default styled.img`
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;

  @media screen and (max-width: 530px) {
    height: ${(props) => (props.lg ? "110px" : "40px")};
    width: ${(props) => (props.lg ? "110px" : "40px")};
  }
`;
