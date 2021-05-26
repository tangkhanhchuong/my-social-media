import { io } from 'socket.io-client' 

let socket

export { socket }

export const SocketStatus = {
    SEND_MSG: "SEND_MSG", 
    SET_ALL_MESSAGES: "SET_ALL_MESSAGES",
    DELETE_SOCKET: "DELETE_SOCKET",
    SET_SOCKET: "SET_SOCKET",
    RECEIVE_MSG: "RECEIVE_MSG"
}

const initSocket = (socket) => {
    return dispatch => {
        return dispatch({ type: SocketStatus.SET_SOCKET, socket: socket })
    }
}

export const deleteSocket = () => dispatch => {
    return dispatch({ type: SocketStatus.DELETE_SOCKET })
}

export const receiveMsg = (msg) => dispatch => {
    return dispatch({ type: SocketStatus.RECEIVE_MSG, msg })
}

export const setAllMessages = (allMessages) => dispatch => {
    return dispatch({ type: SocketStatus.SET_ALL_MESSAGES, allMessages })
}

export const connectSocket = (userToken) => {
    return dispatch => {
        if (userToken) {
            socket = io(process.env.REACT_APP_SYSTEM_URL, { transport: ['websocket'] })

            dispatch(initSocket(socket))

            socket.on("disconnect", () => {
                dispatch(deleteSocket())
            })
        
            socket.on("user_connected", (payload) => {
                
            })

            socket.on("receive_msg", (payload) => {
                console.log(payload)
                dispatch(receiveMsg(payload))
            })

            // initSocket(socket)
            
            // newSocket.on('Server_NewMessages', (data) => {
            //     console.log("Server_NewMessages", data);
            //     dispatch(increaseNumOfNoti(data.messages?.length));
            //     dispatch(addMessagesToConversation(data.conversation_id, data.messages));
            // })

            // newSocket.on('Server_ChangeStatusMessage', (data) => {
            //     console.log("Server_ChangeStatusMessage", data);
            //     dispatch(changeStatusMessage(data.conversation_id, data._id, data.newChanges))
            // })

            // newSocket.on('Server_AllConversation', (data) => {
            //     console.log("Server_AllConversation", data);
            //     data.forEach(e => {
            //         dispatch(addMessagesToConversation(e._id, [e.last_message]));
            //     });
            // });

            // newSocket.on('Server_Conversations_UserProfiles', (data) => {
            //     console.log("Server_Conversations_UserProfiles", data);
            //     data.forEach(e => {
            //         dispatch(changeConversationInformation(e._id, {
            //             user_profiles: e.user_profiles
            //         }));
            //     });
            // });
        
            // dispatch(setSocket(newSocket));
        }
    }
}