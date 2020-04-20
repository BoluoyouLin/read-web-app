import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

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
        params: {
            fileName: book.fileName
        }
    })
}

export function list () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
}

export function shelf () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
}

export function download (book, successCallback, errorCallback, progressCallback) {
    if (!progressCallback) {
        progressCallback = errorCallback
        errorCallback = null
    }
    axios.create({
        baseURL: `${process.env.VUE_APP_RESOURCE_URL}/epub`,
        method: 'get',
        responseType: 'blob',
        timeout: 180 * 1000,
        onDownloadProgress: progressEvent => {
            if (progressCallback) progressCallback(progressEvent)
        }
    }).get(`${book.categoryText}/${book.fileName}.epub`).then(res => {
        const blob = new Blob([res.data])
        setLocalForage(book.fileName, blob, () => {
            if (successCallback) successCallback(book)
        }, err => {
            if (errorCallback) errorCallback(err)
        })
    }).catch(err => {
        if (errorCallback) errorCallback(err)
    })
}

export function flatList () {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_ONLINE_URL}/book/flat-list`
    })
}
