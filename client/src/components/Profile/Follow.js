import React, { useState } from "react"
import Button from "../../styles/Button"
import { displayError } from "../../utils"

const Follow = ({ isFollowing, id, sm = false, relative = false }) => {
  const [followState, setFollowState] = useState(isFollowing)

  const handleFollow = async () => {
    setFollowState(follow => !follow)
  }

  return (
    <Button outline={followState} sm={sm} relative={relative} onClick={handleFollow}>
      <b>
        {followState ? "Following" : "Follow"}
      </b>
    </Button>
  )
}

export default Follow
