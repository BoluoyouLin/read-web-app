<template>
    <div class="book-reader">
        <div id="book"></div>
        <div class="book-mask"
             @click="maskClick"
             @touchmove="maskMove"
             @touchend="maskMoveEnd"
             @mousedown.left="mouseEnter"
             @mousemove.left="mouseMove"
             @mouseup.left="mouseEnd"
        ></div>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import Epub from 'epubjs'
    import {
        getFontSize,
        getCurrentUser
    } from '../../utils/localStorage'
    import { flatten } from '../../utils/book'
    import { getLocalForage } from '../../utils/localForage'
    import { addTheme, addUserBookInfo, getUserBookInfo, getUserTheme } from '../../api/reader'
    global.ePub = Epub
    export default {
        mixins: [bookMixin],
        methods: {
            // 鼠标点击进入 1
            mouseEnter (e) {
                this.mouseState = 1
                this.mouseStartTime = e.timeStamp
                e.preventDefault()
                e.stopPropagation()
            },
            // 鼠标点击进入后移动 2
            mouseMove (e) {
                if (this.mouseState === 1) {
                    this.mouseState = 2
                } else if (this.mouseState === 2) {
                    let offsetY = 0
                    if (this.firstOffsetY) {
                        offsetY = e.clientY - this.firstOffsetY
                        this.setOffsetY(offsetY)
                    } else {
                        this.firstOffsetY = e.clientY
                    }
                }
                e.preventDefault()
                e.stopPropagation()
            },
            /**
             * 鼠标移动中松开 3
             * 鼠标状态复原 4
             */
            mouseEnd (e) {
                if (this.mouseState === 2) {
                    this.setOffsetY(0)
                    this.firstOffsetY = null
                    this.mouseState = 3
                } else {
                    this.mouseState = 4
                }
                const time = e.timeStamp - this.mouseStartTime
                if (time < 100) {
                    this.mouseState = 4
                }
                e.preventDefault()
                e.stopPropagation()
            },
            // 蒙版点击
            maskClick (e) {
                if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
                    return
                }
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
            initFontSize (fontSize) {
                if (fontSize) {
                    this.setDefaultFontSize(fontSize)
                    this.currentBook.rendition.themes.fontSize(fontSize + 'px')
                }
            },
            // 从数据库获取用户主题
            getUserThemeInDatabase (userId) {
                getUserTheme(userId).then(res => {
                    if (res.data && res.data.error_code === 0) {
                        return res.data.data
                    } else {
                        return null
                    }
                })
            },
            // 初始化主题
            async initTheme () {
                this.themeList.forEach(item => {
                    this.currentBook.rendition.themes.register(item.name, item.style)
                })
                let theme
                const currentUser = getCurrentUser()
                if (currentUser) {
                    getUserTheme(currentUser.id).then(res => {
                        if (res.data && res.data.error_code === 0) {
                            theme = res.data.data
                            if (!theme) {
                                theme = this.themeList[0].name
                                addTheme(currentUser.id, theme)
                            }
                            this.setDefaultTheme(theme)
                            this.changeTheme(theme)
                            this.currentBook.rendition.themes.select(theme)
                        }
                    })
                } else {
                    theme = this.themeList[0].name
                    this.setDefaultTheme(theme)
                    this.changeTheme(theme)
                    this.currentBook.rendition.themes.select(theme)
                }
            },
            // 初始化字体类型
            initFontFamily (fontFamily) {
                if (fontFamily) {
                    this.setDefaultFontFamily(fontFamily)
                    this.currentBook.rendition.themes.font(fontFamily)
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
            // 默认渲染
            defaultDisplay () {
                this.display(undefined).then(() => {
                    this.initTheme()
                    this.initFontSize(16)
                    this.initFontFamily('Default')
                    this.updateProgress()
                    this.getInfo()
                })
            },
            // 根据url获取并解析epub电子书
            initEpub (url) {
                this.book = new Epub(url)
                this.setCurrentBook(this.book)
                this.bookRender = this.book.renderTo('book', {
                    width: innerWidth,
                    height: innerHeight,
                    methods: 'default'
                })
                const currentUser = getCurrentUser()
                if (currentUser) {
                    getUserBookInfo(currentUser.id, this.bookId).then(res => {
                        if (res.data && res.data.error_code === 0 && res.data.data) {
                            const bookInfo = res.data.data
                            const locationCFI = bookInfo.location
                            const fontSize = bookInfo.fontSize
                            const fontFamily = bookInfo.fontFamily
                            this.display(locationCFI).then(() => {
                                this.initTheme()
                                this.initFontSize(fontSize)
                                this.initFontFamily(fontFamily)
                                this.updateProgress()
                                this.getInfo()
                            })
                        } else {
                            addUserBookInfo(currentUser.id, this.bookId, 16,
                                'Default', undefined)
                            this.defaultDisplay()
                        }
                    })
                } else {
                    this.defaultDisplay()
                }
                this.bookRender.hooks.content.register(contents => {
                    Promise.all([
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/cabin.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/daysOne.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/montserrat.css`),
                        contents.addStylesheet(`${process.env.VUE_APP_RESOURCE_URL}/fonts/tangerine.css`)
                    ]).then(() => {
                        // console.log(('字体加载完成'))
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
            const items = this.$route.params.fileName.split('|')
            const fileName = items[1]
            this.setBookId(parseInt(items[2]))
            items.pop()
            getLocalForage(fileName, (err, blob) => {
                if (!err && blob) {
                    // 找到离线缓存的电子书
                    this.setFileName(items.join('/')).then(() => {
                        this.initEpub(blob)
                    })
                } else {
                    // 在线获取电子书
                    this.setFileName(items.join('/'))
                        .then(() => {
                            const url = `${process.env.VUE_APP_RESOURCE_URL}/epub/${this.fileName}.epub`
                            this.initEpub(url)
                        })
                }
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
