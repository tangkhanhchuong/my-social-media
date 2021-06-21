import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { startCalling } from "app/slices/message_slice"

const VideoCallWindow = ({ chatId }) => {
  useEffect(() => {
    const myVideo = document.createElement("video")
    myVideo.muted = true
    const peers = {}

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream)

        myPeer.on("open", (userId) => {
          dispatch(startCalling({ chatId, userId }))
        })

        myPeer.on("call", (call) => {
          call.answer(stream)
          const video = document.createElement("video")
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream)
          })
        })
      })
      .catch((err) => {
        console.log(err.message)
      })

    const leaveCall = () => {}

    const connectToNewUser = ({ userId, stream }) => {
      const call = myPeer.call(userId, stream)
      const video = document.createElement("video")
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream)
      })
      call.on("close", () => {
        video.remove()
      })

      peers[userId] = call
    }

    const addVideoStream = (video, stream) => {
      video.srcObject = stream
      video.addEventListener("loadedmetadata", () => {
        video.play()
      })
      videoRef.current.append(video)
    }
  }, [])

  return (
    <>
      <VideoGrid ref={videoRef}></VideoGrid>
    </>
  )
}

export default VideoCallWindow
