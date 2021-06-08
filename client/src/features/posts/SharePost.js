import React, { useState } from "react"
import { toast } from "react-toastify"
import { FaShare } from "react-icons/fa"
import { displayError } from "utils"

const SharePost = ({ id, isRetweet, retweetsCount }) => {
  const [retweet, setRetweet] = useState(isRetweet)
  const [retweetsCountState, setRetweetsCount] = useState(retweetsCount)
  return (
    <span>
        <FaShare color="#17BF63" />
    </span>
  )
}

export default SharePost
