<template>
    <div class="book-reader">
        <div id="book"></div>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import Epub from 'epubjs'
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
            initEpub () {
                const url = 'http://192.168.0.101:8081/epub/' +
                this.fileName + '.epub'
                this.book = new Epub(url)
                this.setCurrentBook(this.book)
                this.bookRender = this.book.renderTo('book', {
                    width: innerWidth,
                    height: innerHeight,
                    methods: 'default'
                })
                this.bookRender.display()
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
