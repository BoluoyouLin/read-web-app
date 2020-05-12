const shelf = {
    state: {
        isEditMode: false, // 是否进入编辑模式
        shelfList: [], // 书架图书列表
        shelfSelected: [], // 书架选中图书列表
        shelfTitleVisible: true, // 书架标题显示状态
        shelfDirectory: [],
        currentType: 1 // 1是主界面， 2是在文件夹里
    },
    mutations: {
        SET_IS_EDIT_MODE: (state, newIsEditMode) => {
            state.isEditMode = newIsEditMode
        },
        SET_SHELF_LIST: (state, newList) => {
            state.shelfList = newList
        },
        SET_SHELF_SELECTED: (state, newSelected) => {
            state.shelfSelected = newSelected
        },
        SET_SHELF_TITLE_VISIBLE: (state, newVisible) => {
            state.shelfTitleVisible = newVisible
        },
        SET_SHELF_DIRECTORY: (state, directory) => {
            state.shelfDirectory = directory
        },
        SET_CURRENT_TYPE: (state, type) => {
            state.currentType = type
        }
    }
}

export default shelf
