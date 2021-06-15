import React, { useState } from "react"
import { StIconButton, StButton } from 'shared/styles/Buttons'

const Follow = ({ isFollowing, id, sm = false, relative = false }) => {
  const [followState, setFollowState] = useState(isFollowing)

  const handleFollow = async () => {
    setFollowState(follow => !follow)
  }

  return (
    <StButton outline={followState} sm={sm} relative={relative} onClick={handleFollow}>
      <b>
        {followState ? "Following" : "Follow"}
      </b>
    </StButton>
  )
}

export default Follow
