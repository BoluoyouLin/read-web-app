const bookMall = {
    state: {
        hotSearchOffsetY: 0
    },
    mutations: {
        SET_HOT_SEARCH_OFFSET_Y: (state, newHotSearchOffsetY) => {
            state.hotSearchOffsetY = newHotSearchOffsetY
        }
    }
}

export default bookMall
