import React from "react"

import { StLoadingIndicator } from "shared/styles/Spinner"
import { StCenterWrapper } from "shared/styles/Wrappers"

export const CenterLoadingIndicator = ({ fluid }) => {
  return (
    <StCenterWrapper fluid={fluid}>
      <StLoadingIndicator />
    </StCenterWrapper>
  )
}
