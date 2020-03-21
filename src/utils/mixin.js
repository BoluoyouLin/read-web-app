import { mapGetters, mapActions } from 'vuex'
import { addCSS, removeAllCSS, themeList } from './book'
import { setBookLocation } from './localStorage'

export const bookMixin = {
    computed: {
        ...mapGetters([
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
        }
    },
    methods: {
        ...mapActions([
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
                setBookLocation(this.fileName, currentLocation.start.cfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
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
        }
    }
}
