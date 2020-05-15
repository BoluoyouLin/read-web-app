const user = {
    state: {
        userInfo: {},
        isLogin: false,
        noUserImg: `${process.env.VUE_APP_RESOURCE_URL}/noUserImg.png`,
        recentBooks: []
    },
    mutations: {
        SET_USER_INFO: (state, newUserInfo) => {
            state.userInfo = newUserInfo
        },
        SET_IS_LOGIN: (state, newIsLogin) => {
            state.isLogin = newIsLogin
        },
        SET_RECENT_BOOKS: (state, newRecentBooks) => {
            state.recentBooks = newRecentBooks
        }
    }
}

export default user
