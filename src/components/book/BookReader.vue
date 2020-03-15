<template>
    <div class="book-reader">
        <div id="book"></div>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import Epub from 'epubjs'
    import {
        getTheme,
        getFontFamily,
        getFontSize,
        setTheme,
        setFontFamily,
        setFontSize
    } from '../../utils/localStorage'
    global.ePub = Epub
    export default {
        mixins: [bookMixin],
        methods: {
            nextPage () {
                if (this.bookRender) {
                    this.bookRender.next()
                    this.hideTitleAndMenu()
                }
            },
            lastPage () {
                if (this.bookRender) {
                    this.bookRender.prev()
                    this.hideTitleAndMenu()
                }
            },
            toggleTitleAndMenu () {
                if (this.menuVisible) {
                    this.setSettingVisible(-1)
                    this.setFontFamilyVisible(false)
                }
                this.setMenuVisible(!this.menuVisible)
            },
            hideTitleAndMenu () {
                this.setSettingVisible(-1)
                this.setMenuVisible(false)
                this.setFontFamilyVisible(false)
            },
            initFontSize () {
                const fontSize = getFontSize(this.fileName)
                if (fontSize) {
                    this.setDefaultFontSize(fontSize)
                    this.currentBook.rendition.themes.fontSize(fontSize + 'px')
                } else {
                    setFontSize(this.fileName, this.defaultFontSize)
                }
            },
            initTheme () {
                let theme = getTheme()
                if (!theme) {
                    theme = this.themeList[0].name
                    setTheme(theme)
                }
                this.themeList.forEach(item => {
                    this.currentBook.rendition.themes.register(item.name, item.style)
                })
                this.setDefaultTheme(theme)
                this.changeTheme(theme)
                this.currentBook.rendition.themes.select(theme)
            },
            initFontFamily () {
                const fontFamily = getFontFamily(this.fileName)
                if (fontFamily) {
                    this.setDefaultFontFamily(fontFamily)
                    this.currentBook.rendition.themes.font(fontFamily)
                } else {
                    setFontFamily(this.fileName, this.defaultFontFamily)
                }
            },
            initEpub () {
                const url = `${process.env.VUE_APP_RESOURCE_URL}/epub/` +
                this.fileName + '.epub'
                this.book = new Epub(url)
                this.setCurrentBook(this.book)
                this.bookRender = this.book.renderTo('book', {
                    width: innerWidth,
                    height: innerHeight,
                    methods: 'default'
                })
                this.bookRender.display().then(() => {
                    this.initTheme()
                    this.initFontSize()
                    this.initFontFamily()
                })
                this.bookRender.on('touchstart', event => {
                    this.startX = event.changedTouches[0].clientX
                    this.startTime = event.timeStamp
                })
                this.bookRender.on('touchend', event => {
                    const offsetX = event.changedTouches[0].clientX - this.startX
                    const offsetTime = event.timeStamp - this.startTime
                    if (offsetTime < 500 && offsetX > 40) {
                        this.lastPage()
                    } else if (offsetTime < 500 && offsetX < -40) {
                        this.nextPage()
                    } else {
                        this.toggleTitleAndMenu()
                    }
                    event.preventDefault()
                    event.stopPropagation()
                })
                this.bookRender.hooks.content.register(contents => {
                    Promise.all([
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/cabin.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/daysOne.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/montserrat.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/tangerine.css`)
                    ]).then(() => {
                        console.log(('字体加载完成'))
                    })
                })
            }
        },
        mounted () {
            this.setFileName(this.$route.params.fileName.split('|').join('/'))
            .then(() => {
                this.initEpub()
            })
        }
    }
</script>

<style scoped>

</style>
