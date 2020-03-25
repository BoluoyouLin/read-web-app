<template>
    <div class="book-bookmark" ref="bookBookmark">
        <div class="book-bookmark-wrapper">
            <div class="book-bookmark-icon-wrapper" ref="iconDown">
                <span class="icon-down"></span>
            </div>
            <div class="book-bookmark-text">{{tipText}}</div>
        </div>
        <div class="bookmark-wrapper" :style="isFixed ? fixedStyle : {}">
            <bookmark :color="color"
                      :height="40"
                      :width="15"
            ></bookmark>
        </div>
    </div>
</template>

<script>
    import Bookmark from '../common/Bookmark'
    import { px2rem, realPx } from '../../utils/utils'
    import { bookMixin } from '../../utils/mixin'
    import { getBookmark, setBookmark } from '../../utils/localStorage'
    const BLUE = '#1E90FF'
    const WHITE = '#FFF'
    export default {
        mixins: [bookMixin],
        components: {
            Bookmark
        },
        computed: {
            height () {
                return realPx(40)
            },
            critical () {
                return realPx(60)
            },
            fixedStyle () {
                return {
                    position: 'fixed',
                    top: 0,
                    right: `${(window.innerWidth - this.$refs.bookBookmark.clientWidth) / 2}px`
                }
            }
        },
        watch: {
            offsetY (value) {
                if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
                    return
                }
                if (value >= this.height && value <= this.critical) {
                    this.beforeCritical(value)
                } else if (value > this.critical) {
                    this.afterCritical(value)
                } else if (value > 0 && value < this.height) {
                    this.beforeHeight(value)
                } else if (value === 0) {
                    this.reduction()
                }
            },
            isBookmark (value) {
                this.isFixed = value
                if (value) {
                    this.color = BLUE
                } else {
                    this.color = WHITE
                }
            }
        },
        data () {
            return {
                tipText: '',
                color: WHITE,
                isFixed: false
            }
        },
        methods: {
            // 到达临界值前
            beforeCritical (value) {
                this.$refs.bookBookmark.style.top = `${-value}px`
                this.beforeHeight(value)
                const iconDown = this.$refs.iconDown
                if (iconDown.style.transform === 'rotate(180deg)') {
                    iconDown.style.transform = 'rotate(0deg)'
                }
            },
            // 到达临界值后
            afterCritical (value) {
                this.$refs.bookBookmark.style.top = `${-value}px`
                if (this.isBookmark) {
                    this.color = WHITE
                    this.tipText = this.$t('book.releaseDeleteMark')
                    this.isFixed = false
                } else {
                    this.color = BLUE
                    this.tipText = this.$t('book.releaseAddMark')
                    this.isFixed = true
                }
                const iconDown = this.$refs.iconDown
                if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
                    iconDown.style.transform = 'rotate(180deg)'
                }
            },
            // 到达相对位移前
            beforeHeight (value) {
                if (this.isBookmark) {
                    this.color = BLUE
                    this.tipText = this.$t('book.pulldownDeleteMark')
                    this.isFixed = true
                } else {
                    this.color = WHITE
                    this.tipText = this.$t('book.pulldownAddMark')
                    this.isFixed = false
                }
            },
            // 归位
            reduction () {
                setTimeout(() => {
                    this.$refs.bookBookmark.style.top = `${-px2rem(40)}rem`
                    this.$refs.iconDown.style.transform = 'rotate(0deg)'
                }, 200)
                if (this.isFixed) {
                    this.setIsBookmark(true)
                    this.addBookmark()
                } else {
                    this.setIsBookmark(false)
                    this.deleteBookmark()
                }
            },
            // 添加书签
            addBookmark () {
                this.bookmark = getBookmark(this.fileName)
                if (!this.bookmark) {
                    this.bookmark = []
                }
                const currentLocation = this.currentBook.rendition.currentLocation()
                const baseCFI = currentLocation.start.cfi.replace(/!.*/, '')
                const startCFI = currentLocation.start.cfi.replace(/.*!/, '')
                    .replace(/\)/, '')
                const endCFI = currentLocation.end.cfi.replace(/.*!/, '')
                    .replace(/\)/, '')
                const rangeCFI = `${baseCFI}!,${startCFI},${endCFI})`
                this.currentBook.getRange(rangeCFI).then(range => {
                    const text = range.toString().replace(/\s\s/, '')
                    this.bookmark.push({
                        cfi: currentLocation.start.cfi,
                        text
                    })
                    setBookmark(this.fileName, this.bookmark)
                })
            },
            // 删除书签
            deleteBookmark () {
                this.bookmark = getBookmark(this.fileName)
                if (!this.bookmark) {
                    this.bookmark = []
                }
                const currentLocation = this.currentBook.rendition.currentLocation()
                const startCFI = currentLocation.start.cfi
                setBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== startCFI))
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .book-bookmark {
        background-color: #bbbbbb;
        position: absolute;
        height: px2rem(40);
        width: 100%;
        top: px2rem(-40);
        left: 0;
        display: flex;
        .book-bookmark-wrapper {
            flex: 1;
            display: flex;
            font-size: px2rem(14);
            position: absolute;
            right: px2rem(50);
            bottom: 0;
            color: #fff;
            .book-bookmark-icon-wrapper {
                transition: all .2s linear;
            }
            .book-bookmark-text {
            }
        }
        .bookmark-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 0 px2rem(10);
        }
    }
</style>
