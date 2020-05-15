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
        url: `${process.env.VUE_APP_BASE_URL}/shelf/addBookToShelf`,
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

/**
 * 获取图书书架id
 * @param bookId
 * @param userId
 * @returns {AxiosPromise}
 */
export function getBookShelfId (bookId, userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/getShelfId`,
        params: {
            bookId,
            userId
        }
    })
}

/**
 * 将图书移出书架
 * @param shelfId
 * @returns {AxiosPromise}
 */
export function moveOutBookInDirectory (shelfId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/moveOutBookInDirectory`,
        params: {
            shelfId
        }
    })
}

/**
 * 修改文件夹标题
 * @param title
 * @param directoryId
 * @returns {AxiosPromise}
 */
export function changeDirectoryTitle (title, directoryId) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/changeDirectoryTitle`,
        data: {
            title,
            directoryId
        }
    })
}

/**
 * 删除文件夹
 * @param directoryId
 * @returns {AxiosPromise}
 */
export function deleteDirectory (directoryId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/shelf/deleteDirectory`,
        params: {
            directoryId
        }
    })
}
