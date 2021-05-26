import http_request from './http_request'

export default {
    login: (user) => http_request({
        endpoint: "/auth/login",
        method: 'post',
        bodyParameters: user
    }),
    register: (user) => http_request({
        endpoint: "/auth/register",
        method: 'post',
        bodyParameters: user
    })
}