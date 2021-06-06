import { createSlice, current } from "@reduxjs/toolkit"

const messages = createSlice({
    name: 'messages',
    initialState: {
        isInitialized: false,
        socket: null,
        allConversations: {}
    },
    reducers: {
        connectSocket: (state, action) => {
            state.socket = action.payload
        },

        disconnectSocket: (state, action) => {
            state.socket = null
        },

        initializeAllConversations: (state, action) => {
            state.isInitialized = true

            const conversations = action.payload
            for(let conv of conversations) {
                state.allConversations[conv._id] = { ...conv, messages: [], isInitialized: false }
            }
        },

        addConversation: (state, action) => {
            const conv = action.payload
            state.allConversations[conv.id].messages = [...conv.messages]
            state.allConversations[conv.id].isInitialized = true
        },
        
        receiveMessage: (state, action) => {
            const message = action.payload  
            state.allConversations[message.chat].messages.push(message)          
        },
        
        sendMessage: (state, action) => {
            const { convId, message } = action.payload  
            state.allConversations[convId].messages.push(message)  

            if(state.socket) {
                console.log(message)
                state.socket.emit("send_msg", message)
            }
        }
    },
})

const { reducer, actions } = messages
export const { connectSocket, disconnectSocket, initializeAllConversations, addConversation, receiveMessage, sendMessage } = actions
export default reducer