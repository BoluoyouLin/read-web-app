const book = {
    state: {
        fileName: ''
      },
      mutations: {
        SET_FILE_NAME: (state, newFileName) => {
          state.fileName = newFileName
        }
      },
      actions: {
        setFileName: ({ commit }, newFileName) => {
          return commit('SET_FILE_NAME', newFileName)
        }
      }
}
export default book
