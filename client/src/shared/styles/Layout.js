import styled from "styled-components"

const Layout = styled.div`
  margin-left: 26%;
  display: grid;
  grid-template-columns: 58% 1fr;

  @media screen and (max-width: 1110px) {
    grid-template-columns: 1fr;
    margin-left: 10%;
  }

  @media screen and (max-width: 530px) {
    margin-left: 0;
    grid-template-columns: 1fr;
  }
`

export default Layout
