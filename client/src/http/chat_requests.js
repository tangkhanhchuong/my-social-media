import httpRequest from './http_request'

export default {
    list: () => httpRequest({
        endpoint: `/chats`,
        requireToken: true
    }),
    getMessages: (chatId) => {
        return httpRequest({
            endpoint: `/chats/${chatId}/messages`,
            requireToken: true
        })
    }
}