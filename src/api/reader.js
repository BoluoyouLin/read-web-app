import axios from 'axios'

/**
 * 获取主题
 * @param userId
 * @returns {AxiosPromise}
 */
export function getUserTheme (userId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/getUserTheme`,
        params: {
            userId
        }
    })
}

/**
 * 添加主题
 * @param userId
 * @param theme
 * @returns {AxiosPromise}
 */
export function addTheme (userId, theme) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/addUserTheme`,
        params: {
            userId,
            theme
        }
    })
}

/**
 * 改变主题
 * @param userId
 * @param theme
 * @returns {AxiosPromise}
 */
export function changeTheme (userId, theme) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/reader/changeUserTheme`,
        data: {
            userId,
            theme
        }
    })
}

/**
 * 获取用户对应书籍的相关信息
 * @param userId
 * @param bookId
 * @returns {AxiosPromise}
 */
export function getUserBookInfo (userId, bookId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/getUserBookInfo`,
        params: {
            userId,
            bookId
        }
    })
}

/**
 * 添加用户阅读书籍信息
 * @param userId
 * @param bookId
 * @param fontSize
 * @param fontFamily
 * @param location
 * @returns {*}
 */
export function addUserBookInfo (userId, bookId, fontSize, fontFamily, location) {
    return axios({
        methods: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/addUserBookInfo`,
        params: {
            userId,
            bookId,
            fontSize,
            fontFamily,
            location
        }
    })
}

/**
 * 更新当前阅读书籍字号
 * @param userId
 * @param bookId
 * @param fontSize
 * @returns {AxiosPromise}
 */
export function updateFontSize (userId, bookId, fontSize) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/reader/updateFontSize`,
        data: {
            userId,
            bookId,
            fontSize
        }
    })
}

/**
 * 更新当前阅读书籍的字体
 * @param userId
 * @param bookId
 * @param fontFamily
 * @returns {*}
 */
export function updateFontFamily (userId, bookId, fontFamily) {
    return axios({
        methods: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/updateFontFamily`,
        params: {
            userId,
            bookId,
            fontFamily
        }
    })
}

/**
 * 更新当前阅读书籍的位置
 * @param userId
 * @param bookId
 * @param location
 * @returns {*}
 */
export function updateLocation (userId, bookId, location) {
    return axios({
        methods: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/updateLocation`,
        params: {
            userId,
            bookId,
            location
        }
    })
}

/**
 * 获取书签列表
 * @param userId
 * @param bookId
 * @returns {AxiosPromise}
 */
export function getBookmark (userId, bookId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/getBookmark`,
        params: {
            userId,
            bookId
        }
    })
}

/**
 * 添加书签
 * @param userId
 * @param bookId
 * @param cfi
 * @param text
 * @returns {AxiosPromise}
 */
export function addBookmark (userId, bookId, cfi, text) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/reader/addBookmark`,
        data: {
            userId,
            bookId,
            cfi,
            text
        }
    })
}

/**
 * 删除书签
 * @param bookmarkId
 * @returns {AxiosPromise}
 */
export function deleteBookmark (bookmarkId) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/reader/deleteBookmark`,
        params: {
            bookmarkId
        }
    })
}
