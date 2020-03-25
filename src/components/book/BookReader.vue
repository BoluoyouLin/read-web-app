<template>
    <div class="book-reader">
        <div id="book"></div>
        <div class="book-mask"
             @click="maskClick"
             @touchmove="maskMove"
             @touchend="maskMoveEnd"
        ></div>
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
        setFontSize, getBookLocation
    } from '../../utils/localStorage'
    import { flatten } from '../../utils/book'
    global.ePub = Epub
    export default {
        mixins: [bookMixin],
        methods: {
            // 蒙版点击
            maskClick (e) {
                const offsetX = e.offsetX
                const width = window.innerWidth
                if (offsetX < width * 0.3) {
                    this.lastPage()
                } else if (offsetX > width * 0.7) {
                    this.nextPage()
                } else {
                    this.toggleTitleAndMenu()
                }
                e.preventDefault()
                e.stopPropagation()
            },
            // 蒙版下拉
            maskMove (e) {
                let offsetY = 0
                if (this.firstOffsetY) {
                    offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                    this.setOffsetY(offsetY)
                } else {
                    this.firstOffsetY = e.changedTouches[0].clientY
                }
                e.preventDefault()
                e.stopPropagation()
            },
            // 蒙版下拉结束
            maskMoveEnd (e) {
                this.setOffsetY(0)
                this.firstOffsetY = null
            },
            // 下一页
            nextPage () {
                if (this.bookRender) {
                    this.bookRender.next().then(() => {
                        this.updateProgress()
                    })
                    this.hideTitleAndMenu()
                }
            },
            // 上一页
            lastPage () {
                if (this.bookRender) {
                    this.bookRender.prev().then(() => {
                        this.updateProgress()
                    })
                    this.hideTitleAndMenu()
                }
            },
            // 菜单栏和标题栏状态切换（隐藏和显示）
            toggleTitleAndMenu () {
                if (this.menuVisible) {
                    this.setSettingVisible(-1)
                    this.setFontFamilyVisible(false)
                }
                this.setMenuVisible(!this.menuVisible)
            },
            // 初始化字体大小
            initFontSize () {
                const fontSize = getFontSize(this.fileName)
                if (fontSize) {
                    this.setDefaultFontSize(fontSize)
                    this.currentBook.rendition.themes.fontSize(fontSize + 'px')
                } else {
                    setFontSize(this.fileName, this.defaultFontSize)
                }
            },
            // 初始化主题
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
            // 初始化字体类型
            initFontFamily () {
                const fontFamily = getFontFamily(this.fileName)
                if (fontFamily) {
                    this.setDefaultFontFamily(fontFamily)
                    this.currentBook.rendition.themes.font(fontFamily)
                } else {
                    setFontFamily(this.fileName, this.defaultFontFamily)
                }
            },
            // 获取图书信息（封面、书名、作者、目录）
            getInfo () {
                this.book.loaded.cover.then(cover => {
                    this.book.archive.createUrl(cover).then(coverUrl => {
                        this.setCover(coverUrl)
                    })
                })
                this.book.loaded.metadata.then(metadata => {
                    this.setMetadata(metadata)
                })
                this.book.loaded.navigation.then(nav => {
                    const navList = flatten(nav.toc)
                    function setLevel (item, level = 0) {
                        if (item.parent) {
                            return setLevel(navList.filter(i => i.id === item.parent)[0], ++level)
                        }
                        return level
                    }
                    navList.forEach(item => {
                        item.level = setLevel(item)
                    })
                    this.setNavigation(navList)
                })
            },
            // 根据url获取并解析epub电子书
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
                const locationCFI = getBookLocation(this.fileName)
                this.display(locationCFI).then(() => {
                    this.initTheme()
                    this.initFontSize()
                    this.initFontFamily()
                    this.updateProgress()
                    this.getInfo()
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
                this.book.ready.then(() => {
                    return this.book.locations.generate(750 * (window.innerWidth / 375) *
                        (getFontSize() / 16)).then(() => {
                            this.setBookAvailable(true)
                            this.updateProgress()
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

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .book-mask {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 120;
    }
</style>
