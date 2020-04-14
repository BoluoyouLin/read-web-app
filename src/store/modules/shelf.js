const shelf = {
    state: {
        isEditMode: false, // 是否进入编辑模式
        shelfList: [], // 书架图书列表
        shelfSelected: [], // 书架选中图书列表
        shelfTitleVisible: true // 书架标题显示状态
    },
    mutations: {
        SET_IS_EDIT_MODE: (state, newIsEditMode) => {
            state.isEditMode = newIsEditMode
        },
        SET_SHELF_LIST: (state, newList) => {
            state.shelfList = newList
        },
        SET_SHELF_SELECTED: (state, newSelected) => {
            state.selected = newSelected
        },
        SET_SHELF_TITLE_VISIBLE: (state, newVisible) => {
            state.shelfTitleVisible = newVisible
        }
    }
}

export default shelf
