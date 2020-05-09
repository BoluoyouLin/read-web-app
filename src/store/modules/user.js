const user = {
    state: {
        userInfo: {
            id: 1,
            userName: '游客',
            userImg: 'http://192.168.0.100:8081/home_banner.jpg',
            introduce: '12436788890'
        },
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
