import http_request from './http_request'

export default {
    search: (username) => http_request({
        endpoint: `/users/search?username=${username}`
    })
}