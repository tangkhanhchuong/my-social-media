import http_request from './http_request'

export default {
    search: (username) => http_request({
        endpoint: `/users/search?username=${username}`
    }),

    changeProfile: (profile) => http_request({
        endpoint: `/users/profile`,
        method: 'patch',
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData"
        },
        bodyParameters: profile,
        requireToken: true
    }),
}