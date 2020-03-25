<template>
    <div class="book-slide-bookmark">
        <div class="book-slide-bookmark-title">
            <div class="book-slide-bookmark-title-text">书签·{{bookmark ? bookmark.length : 0}}</div>
        </div>
        <div class="book-slide-bookmark-scroll">
            <Scroll class="bookmark-scroll-wrapper"
                    :top="49"
                    :bottom="45"
            >
                <div class="bookmark-item"
                     v-for="(item, index) in bookmark"
                     :key="index"
                     @click="displayBookmark(item.cfi)"
                >
                    <div class="bookmark-item-icon-wrapper">
                        <span class="icon-bookmark"></span>
                    </div>
                    <div class="bookmark-item-text">{{item.text}}</div>
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
    import { getBookmark } from '../../utils/localStorage'
    import { bookMixin } from '../../utils/mixin'
    import Scroll from '../common/Scroll'

    export default {
        components: { Scroll },
        mixins: [bookMixin],
        data () {
            return {
                bookmark: []
            }
        },
        methods: {
            displayBookmark (cfi) {
                this.display(cfi).then(() => {
                    this.hideNavigation()
                    this.updateProgress()
                    this.hideTitleAndMenu()
                })
            }
        },
        mounted () {
            this.bookmark = getBookmark(this.fileName)
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/styles/global';

    .book-slide-bookmark {
        .book-slide-bookmark-title {
            font-size: px2rem(14);
            font-weight: bold;
            display: flex;
            @include left;
            height: px2rem(48);
            box-sizing: border-box;
            padding: px2rem(10) px2rem(20);
            border-bottom: px2rem(1) solid #bbbbbb;
        }
        .book-slide-bookmark-scroll {
            .bookmark-scroll-wrapper {
                padding: 0 px2rem(10);
                box-sizing: border-box;
                .bookmark-item {
                    display: flex;
                    font-size: px2rem(14);
                    box-sizing: border-box;
                    padding: px2rem(15) 0;
                    border-bottom: px2rem(1) solid #bbbbbb;
                    .bookmark-item-icon-wrapper {
                        flex: 0 0 px2rem(48);
                        @include center;
                    }
                    .bookmark-item-text {
                        flex: 1;
                        line-height: px2rem(16);
                        @include ellipsis2(3)
                    }
                }
            }
        }
    }
</style>
