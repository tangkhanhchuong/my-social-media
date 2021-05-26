import { SocketStatus } from './messages_actions'

const initialState = {
    allMessages: [],
    socket: "null",
    initialized: false,
    sticker_collections: []
}

// const increaseNumOfNoti = ( state, action ) => {
//     return updateObject( state, { numOfNoti: state.numOfNoti + action.num } )
// }

const deleteSocket = (state) => {
    console.log('delete socket')
    return { ...state, socket: null }
} 

const setSocket = (state, action) => {
    return { ...state, socket: action.socket }
} 

// const addCollectionsToStickerCollections = ( state, action ) => {
//     return updateObject( state, {
//         //sticker_collections: [...state.sticker_collections, ...action.collections]
//         sticker_collections: [...action.collections]
//     })
// }

const setAllMessages = (state, action) => {

    return { 
        ...state,  
        allMessages: [...action.allMessages],
        initialized: true 
    }
}

const addMessagesToConversation = (state, action) => {
    const newMsg = action.msg
    const { allMessages } = state

    if(!allMessages)   return { ...state, allMessages: [ newMsg ] }
    
    return { ...state, allMessages: [ ...allMessages, newMsg ]  }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SocketStatus.SET_SOCKET: 
            return setSocket(state, action)
        case SocketStatus.SET_ALL_MESSAGES: 
            return setAllMessages(state, action)
        case SocketStatus.DELETE_SOCKET:
            return deleteSocket(state, action)
        case SocketStatus.SEND_MSG: 
        case SocketStatus.RECEIVE_MSG:
            return addMessagesToConversation(state, action)
        default:
            return state
    }
}

export default reducer