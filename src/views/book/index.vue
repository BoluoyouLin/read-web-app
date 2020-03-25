<template>
    <div class="book" ref="book">
        <book-reader></book-reader>
        <book-title></book-title>
        <book-menu></book-menu>
        <bookmark></bookmark>
        <book-header></book-header>
        <book-footer></book-footer>
    </div>
</template>

<script>
    import BookReader from '../../components/book/BookReader'
    import BookTitle from '../../components/book/BookTitle'
    import BookMenu from '../../components/book/BookMenu'
    import Bookmark from '../../components/book/BookBookmark'
    import BookHeader from '../../components/book/BookHeader'
    import BookFooter from '../../components/book/BookFooter'
    import { bookMixin } from '../../utils/mixin'

    export default {
        mixins: [bookMixin],
        components: {
            BookReader,
            BookTitle,
            BookMenu,
            Bookmark,
            BookHeader,
            BookFooter
        },
        watch: {
            offsetY (value) {
                if (this.bookAvailable && !this.menuVisible) {
                    if (value > 0) {
                        this.bookMove(value)
                    } else if (value === 0) {
                        this.reduction()
                    }
                }
            }
        },
        methods: {
            bookMove (value) {
                this.$refs.book.style.top = value + 'px'
            },
            reduction () {
                this.$refs.book.style.top = 0
                this.$refs.book.style.transition = 'all .2s linear'
                setTimeout(() => {
                    this.$refs.book.style.transition = ''
                }, 200)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .book {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
</style>
