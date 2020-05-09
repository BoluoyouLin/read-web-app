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
