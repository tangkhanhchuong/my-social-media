import React, { useState } from "react"
import { FaHeart } from "react-icons/fa"

const LikeTweet = ({ id, isLiked, likesCount }) => {
  const [liked, setLiked] = useState(isLiked)
  const [likesCountState, setLikesCount] = useState(likesCount)

  const handleToggleLike = () => {
    setLiked(!liked)
    if (liked) {
      setLikesCount(likesCountState - 1)
    } else {
      setLikesCount(likesCountState + 1)
    }
  }

  return (
    <span>
      {liked ? (
        <FaHeart color="#E0245E" onClick={handleToggleLike} />
      ) : (
        <FaHeart onClick={handleToggleLike} />
      )}
      {likesCountState ? likesCountState : null}
    </span>
  )
}

export default LikeTweet
