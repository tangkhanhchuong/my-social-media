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
                state.socket.emit('join_conversation', conv._id)
            }
        },

        addConversation: (state, action) => {
            const conv = action.payload

            if(!state.allConversations[conv._id])   {
                state.allConversations[conv._id] = { ...conv, messages: [], isInitialized: false }
                state.socket.emit('add_conversation', conv)
                return
            }
            
            state.allConversations[conv._id].messages = [...conv.messages]
            state.allConversations[conv._id].isInitialized = true
        },
        
        receiveMessage: (state, action) => {
            const { newMessage, chat } = action.payload 

            if(!state.allConversations[chat._id])
                state.allConversations[chat._id] = { ...chat, messages: [], isInitialized: false }

            state.allConversations[newMessage.chat].messages.push(newMessage)  
            state.allConversations[newMessage.chat].latestMessage = newMessage
            state.allConversations[newMessage.chat].updatedAt = chat.updatedAt 
        },
        
        sendMessage: (state, action) => {
            const message = action.payload  

            if(state.socket) {
                state.socket.emit("send_msg", message)
            }
        }
    },
})

const { reducer, actions } = messages
export const { connectSocket, disconnectSocket, initializeAllConversations, addConversation, receiveMessage, sendMessage } = actions
export default reducer