import axios from 'axios'

/**
 * 获取书架数据
 * @param userId
 * @returns {AxiosPromise}
 */
export function shelf (userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf`,
        params: {
            userId
        }
    })
}

/**
 * 将图书从书架中移除
 * @param shelfId
 * @returns {AxiosPromise}
 */
export function removeBookOfShelf (shelfId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/removeBookOfShelf`,
        params: {
            shelfId
        }
    })
}

/**
 * 设置图书私密阅读状态
 * @param shelfId
 * @param privateStatus
 * @returns {AxiosPromise}
 */
export function setBookPrivate (shelfId, privateStatus) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/setBookPrivate`,
        params: {
            shelfId,
            privateStatus
        }
    })
}

/**
 * 设置图书缓存状态
 * @param shelfId
 * @param cache
 * @returns {AxiosPromise}
 */
export function setBookCache (shelfId, cache) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/setBookCache`,
        params: {
            shelfId,
            cache
        }
    })
}

/**
 * 添加图书到书架
 * @param bookId
 * @param userId
 */
export function addBookToShelfInDataBase (bookId, userId) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/setBookCache`,
        data: {
            bookId,
            userId
        }
    })
}

/**
 * 新建文件夹
 * @param title
 * @param userId
 * @returns {AxiosPromise}
 */
export function addNewDirectory (title, userId) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/addNewDirectory`,
        data: {
            title,
            userId
        }
    })
}

/**
 * 将图书移入文件夹
 * @param directoryId
 * @param shelfId
 * @returns {AxiosPromise}
 */
export function moveBookToDirectory (directoryId, shelfId) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/moveBookToDirectory`,
        data: {
            directoryId,
            shelfId
        }
    })
}
