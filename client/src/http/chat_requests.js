import httpRequest from './http_request'

export default {
    list: () => httpRequest({
        endpoint: `/chats`,
        requireToken: true
    }),
    getMessages: (chatId) => httpRequest({
        endpoint: `/chats/${chatId}/messages`,
        requireToken: true
    }),
    add: (chat) => httpRequest({
        endpoint: `/chats`,
        method: 'post',
        bodyParameters: {
            users: chat
        },
        requireToken: true
    })
}