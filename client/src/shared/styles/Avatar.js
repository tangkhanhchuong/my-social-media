import styled from "styled-components"

const StAvatar = styled.img`
  width: ${(props) => (props.lg ? "150px" : props.md ? "110px" : "60px")};
  height: ${(props) => (props.lg ? "150px" : props.md ? "110px" : "60px")};
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  margin: ${p => p.m || "0px"};
  opacity: ${p => p.conceal ? 0 : 1};

  margin-top: ${p => p.top ? -p.top + "px" : '0px'};
  margin-left: ${p => p.left ? p.left + "px" : '0px'};
`
export default StAvatar