const book = {
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1, // -1:不显示，0：显示字号，1：显示主题， 2：显示进度， 3：显示目录
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        fontFamilyVisible: false,
        defaultTheme: 'default',
        bookAvailable: false,
        progress: 0,
        section: 0,
        isPaginating: true,
        currentBook: null,
        navigation: null,
        cover: null, // 图书封面
        metadata: null, // 图书基本信息
        paginate: '',
        pageList: null,
        offsetY: 0,
        isBookmark: null
      },
      mutations: {
        SET_FILE_NAME: (state, newFileName) => {
          state.fileName = newFileName
        },
        SET_MENU_VISIBLE: (state, newMenuVisible) => {
          state.menuVisible = newMenuVisible
        },
        SET_SETTING_VISIBLE: (state, newSettingVisible) => {
            state.settingVisible = newSettingVisible
        },
        SET_DEFAULT_FONT_SIZE: (state, newDefaultFontSize) => {
            state.defaultFontSize = newDefaultFontSize
        },
        SET_DEFAULT_FONT_FAMILY: (state, newFontFamily) => {
            state.defaultFontFamily = newFontFamily
        },
        SET_FONT_FAMILY_VISIBLE: (state, newFontFamilyVisible) => {
            state.fontFamilyVisible = newFontFamilyVisible
        },
        SET_DEFAULT_THEME: (state, newTheme) => {
            state.defaultTheme = newTheme
        },
        SET_BOOK_AVAILABLE: (state, newBookAvailable) => {
            state.bookAvailable = newBookAvailable
        },
        SET_PROGRESS: (state, newProgress) => {
            state.progress = newProgress
        },
        SET_SECTION: (state, newSection) => {
            state.section = newSection
        },
        SET_IS_PAGINATING: (state, newIsPaginating) => {
            state.isPaginating = newIsPaginating
        },
        SET_CURRENT_BOOK: (state, newCurrentBook) => {
            state.currentBook = newCurrentBook
        },
        SET_NAVIGATION: (state, newNavigation) => {
            state.navigation = newNavigation
        },
        SET_COVER: (state, newCover) => {
            state.cover = newCover
        },
        SET_METADATA: (state, newMetadata) => {
            state.metadata = newMetadata
        },
        SET_PAGINATE: (state, newPaginate) => {
            state.paginate = newPaginate
        },
        SET_PAGE_LIST: (state, newPageList) => {
            state.pageList = newPageList
        },
        SET_OFFSET_Y: (state, newOffsetY) => {
            state.offsetY = newOffsetY
        },
        SET_IS_BOOKMARK: (state, newIsBookmark) => {
            state.isBookmark = newIsBookmark
        }
      }
}
export default book
