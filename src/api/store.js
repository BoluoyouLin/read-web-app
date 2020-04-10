import axios from 'axios'

export function home () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/home`
    })
}

export function detail (book) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_ONLINE_URL}/book/detail`,
        params: book.fileName
    })
}

export function list () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
}