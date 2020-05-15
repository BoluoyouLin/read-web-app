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
