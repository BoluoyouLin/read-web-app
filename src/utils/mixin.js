import { mapGetters, mapActions } from 'vuex'
import { addCSS, removeAllCSS, themeList } from './book'

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
        changeTheme (theme) {
            removeAllCSS()
            addCSS(`${process.env.VUE_APP_RESOURCE_URL}/theme/${theme}.css`)
        }
    }
}
