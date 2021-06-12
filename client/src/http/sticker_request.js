import http_request from './http_request'

export default {
    get: () => http_request({
        endpoint: "/stickers",
    })
}