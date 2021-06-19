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
        stickers: {},
        videoCall: {
            callId: null,
            caller: null,
            joiner: [],
        },
        myPeerId: null
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
                state.allConversations[conv._id] = { ...conv, messages: [], numOfNewMessages: 0, currentPage: 2, isInitialized: false }
                state.socket.emit('join_conversation', conv._id)
            }
        },

        addConversation: (state, action) => {
            const chat = action.payload
            const { _id: chatId, messages } = chat 

            if(!state.allConversations[chatId])   {
                state.allConversations[chatId] = { ...chat, messages: [], isInitialized: false }
                state.socket.emit('add_conversation', chat)
            }
            else {
                state.allConversations[chatId].messages = [...messages]
                state.allConversations[chatId].isInitialized = true
            }
            state.allConversations = sortObjectKeysByTimestamp(state.allConversations)
            state.allConversations[chatId].messages = state.allConversations[chatId].messages.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1 )
        },
        
        receiveMessage: (state, action) => {
            const { newMessage, chat } = action.payload 

            const chatId = chat._id

            if(!state.allConversations[chatId])
                state.allConversations[chatId] = { ...chat, messages: [], isInitialized: false }

            state.allConversations[chatId].messages.unshift(newMessage)  
            state.allConversations[chatId].latestMessage = newMessage
            state.allConversations[chatId].updatedAt = chat.updatedAt 
            state.allConversations[chatId].numOfNewMessages += 1
            state.allConversations = sortObjectKeysByTimestamp(state.allConversations)
            state.allConversations[chatId].messages = state.allConversations[chatId].messages.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1 )
        },

        loadMoreMessages: (state, action) => {
            const { moreMessages, chatId } = action.payload
            const messages = [...moreMessages, ...state.allConversations[chatId].messages].sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1 )
            state.allConversations[chatId].currentPage += 1
            state.allConversations[chatId].messages = messages
            return state
        },
        
        sendMessage: (state, action) => {
            const message = action.payload  
            if(!state.socket)   return
            state.socket.emit("send_msg", message)
        },

        changeChatName: (state, action) => {
            const { chatId, chatName } = action.payload
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
        },

        startCalling: (state, action) => {
            if(!state.socket)   return

            const { chatId, userPeerId } = action.payload
            state.videoCall.caller = userPeerId
            state.myPeerId = userPeerId
            console.log("start calling")
            state.socket.emit('start_calling', action.payload)
        },

        joinCall: (state, action) => {
            console.log("join")
            const { chatId } = action.payload
            state.socket.emit('join_call', action.payload)
        },

        beCalled: (state, action) => {
            console.log("be called action")

            const { caller, chatId } = action.payload
            state.videoCall.caller = caller
            state.videoCall.callId = chatId
        },

        leaveCall: (state, action) => {
            if(!state.socket)   return

            const { chatId, userId } = action.payload
            state.socket.emit('leave_call', { userId, chatId })
        },

        answerCall: (state, action) => {

        }
    },
})

const { reducer, actions } = messageSlice
export const { 
    connectSocket, disconnectSocket, initializeAllConversations, 
    addConversation, receiveMessage, sendMessage, changeChatName, loadMoreMessages,
    addStickersSuits, changeStickersSuit,
    startCalling, joinCall, leaveCall, answerCall, beCalled
} = actions
export default reducer