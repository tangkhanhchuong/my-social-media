import httpRequest from './http_request'

export default {
    list: () => httpRequest({
        endpoint: `/chats`,
        requireToken: true
    }),
    getMessages: ({ chatId,  page, limit, skip }) => httpRequest({
        endpoint: `/chats/${chatId}/messages`,
        requireToken: true,
        query: { page, limit, skip }
    }),
    add: (chat) => httpRequest({
        endpoint: `/chats`,
        method: 'post',
        bodyParameters: {
            users: chat
        },
        requireToken: true
    }), 
    update: ({chatId, chatName}) => httpRequest({
        endpoint: `/chats/${chatId}`,
        method: 'patch',
        bodyParameters: {
            updatedChat: { chatName }
        },
        requireToken: true
    }), 
}