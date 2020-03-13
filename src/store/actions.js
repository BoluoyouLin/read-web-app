const actions = {
    setFileName: ({ commit }, newFileName) => {
        return commit('SET_FILE_NAME', newFileName)
    },
    setMenuVisible: ({ commit }, newMenuVisible) => {
        return commit('SET_MENU_VISIBLE', newMenuVisible)
    }
}

export default actions
