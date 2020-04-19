const actions = {
    // book
    setFontFamilyVisible: ({ commit }, newVisible) => {
        return commit('SET_FONT_FAMILY_VISIBLE', newVisible)
    },
    setDefaultFontFamily: ({ commit }, newFontFamily) => {
        return commit('SET_DEFAULT_FONT_FAMILY', newFontFamily)
    },
    setDefaultFontSize: ({ commit }, newFontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE', newFontSize)
    },
    setSettingVisible: ({ commit }, newSettingVisible) => {
        return commit('SET_SETTING_VISIBLE', newSettingVisible)
    },
    setMenuVisible: ({ commit }, newMenuVisible) => {
        return commit('SET_MENU_VISIBLE', newMenuVisible)
    },
    setFileName: ({ commit }, newFileName) => {
        return commit('SET_FILE_NAME', newFileName)
    },
    setDefaultTheme: ({ commit }, newTheme) => {
        return commit('SET_DEFAULT_THEME', newTheme)
    },
    setBookAvailable: ({ commit }, newBookAvailable) => {
        return commit('SET_BOOK_AVAILABLE', newBookAvailable)
    },
    setProgress: ({ commit }, newProgress) => {
        return commit('SET_PROGRESS', newProgress)
    },
    setSection: ({ commit }, newSection) => {
        return commit('SET_SECTION', newSection)
    },
    setIsPaginating: ({ commit }, newIsPaginating) => {
        return commit('SET_IS_PAGINATING', newIsPaginating)
    },
    setCurrentBook: ({ commit }, newCurrentBook) => {
        return commit('SET_CURRENT_BOOK', newCurrentBook)
    },
    setNavigation: ({ commit }, newNavigation) => {
        return commit('SET_NAVIGATION', newNavigation)
    },
    setCover: ({ commit }, newCover) => {
        return commit('SET_COVER', newCover)
    },
    setMetadata: ({ commit }, newMetadata) => {
        return commit('SET_METADATA', newMetadata)
    },
    setIsBookmark: ({ commit }, newIsBookmark) => {
        return commit('SET_IS_BOOKMARK', newIsBookmark)
    },
    setOffsetY: ({ commit }, newOffsetY) => {
        return commit('SET_OFFSET_Y', newOffsetY)
    },
    // bookMall
    setHotSearchOffsetY: ({ commit }, newHotSearchOffsetY) => {
        return commit('SET_HOT_SEARCH_OFFSET_Y', newHotSearchOffsetY)
    },
    setFlipCardVisible: ({ commit }, newFlipCardVisible) => {
        return commit('SET_FLIP_CARD_VISIBLE', newFlipCardVisible)
    },
    // shelf
    setIsEditMode: ({ commit }, newIsEditMode) => {
        return commit('SET_IS_EDIT_MODE', newIsEditMode)
    },
    setShelfList: ({ commit }, newList) => {
        return commit('SET_SHELF_LIST', newList)
    },
    setShelfSelected: ({ commit }, newSelected) => {
        return commit('SET_SHELF_SELECTED', newSelected)
    },
    setShelfTitleVisible: ({ commit }, newVisible) => {
        return commit('SET_SHELF_TITLE_VISIBLE', newVisible)
    },
    setShelfDirectory: ({ commit }, directory) => {
        return commit('SET_SHELF_DIRECTORY', directory)
    },
    setCurrentType: ({ commit }, type) => {
        return commit('SET_CURRENT_TYPE', type)
    }
}

export default actions
