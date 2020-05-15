import axios from 'axios'

export function saveUserImg (base64Img) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/user/saveUserImg`,
        data: {
            data: base64Img
        }
    })
}

export function register (userName, password) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/user/register`,
        data: {
            userName,
            password
        }
    })
}

export function login (userName, password) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/user/login`,
        data: {
            userName,
            password
        }
    })
}

export function editUserInfo (data) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/user/editUserInfo`,
        data: {
            data
        }
    })
}

export function addUserReadRecord (userId, bookId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/user/addReadRecord`,
        params: {
            userId,
            bookId
        }
    })
}

export function getUserReadRecords (userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/user/getUserReadRecords`,
        params: {
            userId
        }
    })
}

export function deleteUserReadRecord (recordId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/user/deleteUserReadRecord`,
        params: {
            recordId
        }
    })
}

export function getUserSearchHistory (userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/user/getUserSearchHistory`,
        params: {
            userId
        }
    })
}

export function addUserSearchHistory (userId, text) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/user/addUserSearchHistory`,
        data: {
            userId,
            text
        }
    })
}

export function clearUserSearchHistory (userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/user/clearUserSearchHistory`,
        params: {
            userId
        }
    })
}
