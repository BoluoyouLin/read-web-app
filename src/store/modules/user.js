const user = {
    state: {
        userInfo: {},
        isLogin: false,
        noUserImg: `${process.env.VUE_APP_RESOURCE_URL}/noUserImg.png`
    },
    mutations: {
        SET_USER_INFO: (state, newUserInfo) => {
            state.userInfo = newUserInfo
        },
        SET_IS_LOGIN: (state, newIsLogin) => {
            state.isLogin = newIsLogin
        }
    }
}

export default user
