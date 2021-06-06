import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { receiveMessage, connectSocket, disconnectSocket } from './messageSlice'

const useSocket = ({accessToken}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if(accessToken) {
            const socketUrl = process.env.REACT_APP_SYSTEM_URL
            const socket = io(socketUrl, { transport: ['websocket'] })
            dispatch(connectSocket(socket))

            socket.on("disconnect", () => {
                dispatch(disconnectSocket())
            })

            socket.on("user_connected", (payload) => {
                
            })

            socket.on("receive_msg", (payload) => {
                dispatch(receiveMessage(payload))
            })
        }
    }, [accessToken])

    return {}
}

export default useSocket
