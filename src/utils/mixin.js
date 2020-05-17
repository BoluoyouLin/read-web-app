import { mapGetters, mapActions } from 'vuex'
import { addCSS, removeAllCSS, themeList } from './book'
import { getCurrentUser } from './localStorage'
import { moveOutBookInDirectory, shelf } from '../api/shelf'
import { addToShelf, removeToShelf } from './shelf'
import { getBookmark, updateLocation } from '../api/reader'

export const bookMixin = {
    computed: {
        ...mapGetters([
            'bookId',
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pageList',
            'offsetY',
            'isBookmark'
        ]),
        themeList () {
            return themeList(this)
        },
        getSectionName () {
            return this.section && this.navigation && this.navigation[this.section]
                ? this.navigation[this.section].label : ''
        }
    },
    methods: {
        ...mapActions([
            'setBookId',
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPageList',
            'setOffsetY',
            'setIsBookmark'
        ]),
        // 更换主题
        changeTheme (theme) {
            removeAllCSS()
            addCSS(`${process.env.VUE_APP_RESOURCE_URL}/theme/${theme}.css`)
        },
        // 更新进度条
        updateProgress () {
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
                const currentUser = getCurrentUser()
                if (currentUser) {
                    updateLocation(currentUser.id, this.bookId, currentLocation.start.cfi)
                }
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                if (currentUser) {
                    getBookmark(currentUser.id, this.bookId).then(res => {
                        if (res.data && res.data.error_code === 0 && res.data.data) {
                            const bookmark = res.data.data
                            if (bookmark) {
                                if (bookmark.some(item => item.cfi === currentLocation.start.cfi)) {
                                    this.setIsBookmark(true)
                                } else {
                                    this.setIsBookmark(false)
                                }
                            } else {
                                this.setIsBookmark(false)
                            }
                        }
                    })
                }
            }
        },
        // 隐藏目录
        hideNavigation () {
            this.setSettingVisible(-1)
        },
        // 根据cfi渲染电子书
        display (cfi) {
            if (cfi) {
                return this.currentBook.rendition.display(cfi)
            } else {
                return this.currentBook.rendition.display()
            }
        },
        // 隐藏标题栏和菜单栏
        hideTitleAndMenu () {
            this.setSettingVisible(-1)
            this.setMenuVisible(false)
            this.setFontFamilyVisible(false)
        }
    }
}

export const bookMallHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flipCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlipCardVisible'
        ]),
        showBookDetail (book) {
            this.$router.push({
                path: '/bookMall/detail',
                query: {
                    fileName: book.fileName,
                    categoryText: book.categoryText
                }
            })
        }
    }
}

export const shelfMixin = {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'offsetY',
            'shelfDirectory',
            'currentType'
        ])
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'setShelfDirectory',
            'setCurrentType'
        ]),
        // 展示图书详情
        showBookDetail (book) {
            this.$router.push({
                path: '/bookMall/detail',
                query: {
                    fileName: book.fileName,
                    categoryText: book.categoryText
                }
            })
        },
        clearShelfSelected () {
            this.setShelfSelected([])
            if (this.shelfList) {
                this.shelfList.forEach(item => {
                    item.selected = false
                    if (item.itemList) {
                        item.itemList.forEach(item => {
                            item.selected = false
                        })
                    }
                })
            }
        },
        // 获取文件夹图书列表
        getDirectoryList (title) {
            const directoryList = this.shelfList.filter(item => item.type === 2 && item.title === title)[0]
            this.setShelfDirectory(directoryList)
        },
        // 获取书架图书数据
        getShelfList () {
            const currentUser = getCurrentUser()
            if (currentUser) {
                shelf(currentUser.id).then(res => {
                    if (res.status === 200 && res.data && res.data.bookList) {
                        const data = addToShelf(res.data.bookList)
                        return this.setShelfList(data)
                    }
                })
            } else {
                const toast = this.toast({
                    text: '登录后即可查看书架图书'
                })
                toast.updateCurrentText('登录后即可查看书架图书')
                this.$nextTick(() => {
                    toast.show()
                })
                const data = addToShelf([])
                return this.setShelfList(data)
            }
        },
        // 将图书移出分组
        moveOutGroup (callback) {
            this.setShelfList(this.shelfList.map(book => {
                if (book.type === 2 && book.itemList) {
                    book.itemList = book.itemList.filter(item => !item.selected)
                }
                return book
            })).then(() => {
                this.shelfSelected.forEach(item => {
                    moveOutBookInDirectory(item.shelfId)
                })
                let list = removeToShelf(this.shelfList)
                list = [].concat(list, ...this.shelfSelected)
                list = addToShelf(list)
                this.setShelfList(list).then(() => {
                    this.toast({
                        text: this.$t('shelf.moveBookOutSuccess')
                    }).show()
                    if (callback) callback()
                })
            })
        }
    }
}

export const userMixin = {
    computed: {
        ...mapGetters([
            'userInfo',
            'isLogin',
            'noUserImg',
            'recentBooks'
        ])
    },
    methods: {
        ...mapActions([
            'setUserInfo',
            'setIsLogin',
            'setRecentBooks'
        ])
    }
}
