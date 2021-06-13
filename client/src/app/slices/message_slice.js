import { createSlice } from "@reduxjs/toolkit"

const sortObjectKeysByTimestamp = (obj) => {
    return Object.fromEntries(Object.entries({...obj})
        .sort((a, b) => {
            return (a[1].updatedAt > b[1].updatedAt) ? -1 : 1
    }))
}

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        isInitialized: false,
        socket: null,
        allConversations: {},
        stickers: {}
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
            if(!state.socket)   return

            const conversations = action.payload
            for(let conv of conversations) {
                const { latestMessage, users } = conv
                const latestMessageSenderName = users.filter(u => u._id === latestMessage.sender)[0].username
                conv.latestMessage.sender = {
                    _id: latestMessage.sender,
                    username: latestMessageSenderName
                }
                state.allConversations[conv._id] = { ...conv, messages: [], isInitialized: false }
                state.socket.emit('join_conversation', conv._id)
            }
        },

        addConversation: (state, action) => {
            const conv = action.payload

            if(!state.allConversations[conv._id])   {
                state.allConversations[conv._id] = { ...conv, messages: [], isInitialized: false }
                state.socket.emit('add_conversation', conv)
            }
            else {
                state.allConversations[conv._id].messages = [...conv.messages]
                state.allConversations[conv._id].isInitialized = true
            }
            
            
            state.allConversations = sortObjectKeysByTimestamp(state.allConversations)
            // return state
        },
        
        receiveMessage: (state, action) => {
            const { newMessage, chat } = action.payload 

            if(!state.allConversations[chat._id])
                state.allConversations[chat._id] = { ...chat, messages: [], isInitialized: false }

            state.allConversations[newMessage.chat].messages.push(newMessage)  
            state.allConversations[newMessage.chat].latestMessage = newMessage
            state.allConversations[newMessage.chat].updatedAt = chat.updatedAt 

            state.allConversations = sortObjectKeysByTimestamp(state.allConversations)
            // return state
        },
        
        sendMessage: (state, action) => {
            const message = action.payload  
            if(!state.socket)   return
            state.socket.emit("send_msg", message)
        },

        changeChatName: (state, action) => {
            const { chatId, chatName } = action.payload
            console.log({chatId, chatName});
            state.allConversations[chatId].chatName = chatName
        },

        addStickersSuits: (state, action) => {
            if(!state.stickers.collection) {
                const stickersCollection = action.payload
                state.stickers.collection = stickersCollection
                state.stickers.current = stickersCollection[0]
            }
        },

        changeStickersSuit: (state, action) => {
            const desStickerSuitId = action.payload
            const desStickerSuit = state.stickers.collection.filter(c => c._id === desStickerSuitId)[0]
            state.stickers.current = desStickerSuit
        }
    },
})

const { reducer, actions } = messageSlice
export const { 
    connectSocket, disconnectSocket, initializeAllConversations, 
    addConversation, receiveMessage, sendMessage, changeChatName, 
    addStickersSuits, changeStickersSuit
} = actions
export default reducer