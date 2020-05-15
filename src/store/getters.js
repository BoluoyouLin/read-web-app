const book = {
    // book
    fileName: state => state.book.fileName,
    menuVisible: state => state.book.menuVisible,
    settingVisible: state => state.book.settingVisible,
    defaultFontSize: state => state.book.defaultFontSize,
    defaultFontFamily: state => state.book.defaultFontFamily,
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    defaultTheme: state => state.book.defaultTheme,
    bookAvailable: state => state.book.bookAvailable,
    progress: state => state.book.progress,
    section: state => state.book.section,
    isPaginating: state => state.book.isPaginating,
    currentBook: state => state.book.currentBook,
    navigation: state => state.book.navigation,
    cover: state => state.book.cover,
    metadata: state => state.book.metadata,
    offsetY: state => state.book.offsetY,
    isBookmark: state => state.book.isBookmark,
    // bookMall
    hotSearchOffsetY: state => state.bookMall.hotSearchOffsetY,
    flipCardVisible: state => state.bookMall.flipCardVisible,
    // shelf
    isEditMode: state => state.shelf.isEditMode,
    shelfList: state => state.shelf.shelfList,
    shelfSelected: state => state.shelf.shelfSelected,
    shelfTitleVisible: state => state.shelf.shelfTitleVisible,
    shelfDirectory: state => state.shelf.shelfDirectory,
    currentType: state => state.shelf.currentType,
    // user
    userInfo: state => state.user.userInfo,
    isLogin: state => state.user.isLogin,
    noUserImg: state => state.user.noUserImg,
    recentBooks: state => state.user.recentBooks
}

export default book
