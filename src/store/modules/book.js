const book = {
    state: {
        fileName: '',
        menuVisible: false
      },
      mutations: {
        SET_FILE_NAME: (state, newFileName) => {
          state.fileName = newFileName
        },
        SET_MENU_VISIBLE: (state, newMenuVisible) => {
          state.menuVisible = newMenuVisible
        }
      }
}
export default book
