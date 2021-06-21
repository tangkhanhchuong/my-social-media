import { Spinner } from "reactstrap"
import styled from "styled-components"

export const StLoadingIndicator = styled(Spinner)`
  color: ${(p) => p.theme.accentColor};
`
