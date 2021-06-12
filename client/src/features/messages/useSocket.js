import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { receiveMessage, connectSocket, disconnectSocket } from 'app/slices/message_slice'

const useSocket = ({accessToken}) => {
    const dispatch = useDispatch()
    const authReducer = useSelector(state => state.auth)

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

            socket.on("is_invited_to_conversation", (payload) => {
                const usersInRoom = payload.users
                if(usersInRoom.includes(authReducer.userId))   socket.emit('join_conversation', payload._id)
            })
        }
    }, [accessToken])

    return {}
}

export default useSocket
