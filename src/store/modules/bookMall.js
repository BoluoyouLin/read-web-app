const bookMall = {
    state: {
        hotSearchOffsetY: 0,
        flipCardVisible: false
    },
    mutations: {
        SET_HOT_SEARCH_OFFSET_Y: (state, newHotSearchOffsetY) => {
            state.hotSearchOffsetY = newHotSearchOffsetY
        },
        SET_FLIP_CARD_VISIBLE: (state, newFlipCardVisible) => {
            state.flipCardVisible = newFlipCardVisible
        }
    }
}

export default bookMall
