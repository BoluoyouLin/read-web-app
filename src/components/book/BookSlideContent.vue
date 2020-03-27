<template>
    <div class="book-slide-content">
        <div class="book-slide-content-header">
            <div class="book-slide-content-header-search">
                <div class="content-search-icon-wrapper">
                    <span class="icon-search"></span>
                </div>
                <input class="content-search-input"
                       type="text"
                       @click="showCancel"
                       @keyup.enter.exact="search"
                       :placeholder="$t('book.searchHint')"
                       v-model="searchText"
                />
            </div>
            <div class="book-slide-content-header-cancel"
                 v-if="cancelVisible"
                 @click="hideCancel"
            >{{$t('book.cancel')}}</div>
        </div>
        <div class="book-info" v-show="!cancelVisible">
            <div class="book-info-left">
                <img :src="cover"
                     class="book-info-image"
                     alt="书籍封面"
                />
            </div>
            <div class="book-info-center">
                <div class="book-info-title">
                    <span class="book-info-title-text">{{this.metadata? this.metadata.title: ''}}</span>
                </div>
                <div class="book-info-author">
                    <span class="book-info-author-text">{{this.metadata ? this.metadata.creator : ''}}</span>
                </div>
            </div>
            <div class="book-info-right">
                {{$t('book.haveRead2')}}
                {{this.progress}}%
            </div>
        </div>
        <Scroll class="navigation"
                :top="140"
                :bottom="45"
                ref="scroll"
                v-show="!cancelVisible"
        >
            <div class="navigation-item" v-for="(item, index) in navigation" :key="index">
                <div class="navigation-item-label"
                     :style="textIndent(item)"
                     :class="{'selected' : index === section}"
                     @click="displayBook(item.href)"
                >{{item.label}}</div>
            </div>
        </Scroll>
        <Scroll class="search-list-wrapper"
                :top="50"
                :bottom="45"
                v-show="cancelVisible"
        >
            <div class="search-list-item" v-for="(item , index) in searchList"
                 :key="index"
                 v-html="item.excerpt"
                 @click="displayBook(item.cfi,true)"
            ></div>
        </Scroll>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import Scroll from '../common/Scroll'
    import { px2rem } from '../../utils/utils'
    export default {
        components: { Scroll },
        mixins: [bookMixin],
        component: {
            Scroll
        },
        data () {
            return {
                cancelVisible: false,
                searchList: null,
                searchText: ''
            }
        },
        methods: {
            // 点击目录后渲染对应章节
            displayBook (href, highlight = false) {
                this.display(href).then(() => {
                    this.hideNavigation()
                    this.updateProgress()
                    this.hideTitleAndMenu()
                    if (highlight) {
                        this.currentBook.rendition.annotations.highlight(href)
                    }
                })
            },
            // 展示搜索界面
            showCancel () {
                this.cancelVisible = true
            },
            // 隐藏搜索界面
            hideCancel () {
                this.cancelVisible = false
                this.searchText = ''
                this.searchList = null
            },
            // 计算目录缩进
            textIndent (item) {
                return {
                    marginLeft: `${px2rem(item.level * 10)}rem`
                }
            },
            // 搜索
            search () {
                if (this.searchText && this.searchText.length > 0) {
                    this.doSearch(this.searchText).then(list => {
                        this.searchList = list.map(item => {
                            item.excerpt = item.excerpt.replace(this.searchText,
                                `<span class="content-search-text">${this.searchText}</span>`)
                            return item
                        })
                    })
                }
            },
            // 官方给出的搜索算法
            doSearch (q) {
                return Promise.all(
                    this.currentBook.spine.spineItems
                        .map(item => item.load(this.currentBook.load.bind(this.currentBook))
                            .then(item.find.bind(item, q)).finally(item.unload.bind(item)))
                ).then(results => Promise.resolve([].concat.apply([], results)))
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global';
    .book-slide-content {
        width: 100%;
        .book-slide-content-header {
            display: flex;
            width: 100%;
            height: px2rem(50);
            padding: px2rem(10);
            box-sizing: border-box;
            @include center;
            .book-slide-content-header-search {
                display: flex;
                flex: 1;
                height: px2rem(30);
                box-shadow: px2rem(2) 0 px2rem(2) rgba(0, 0, 0, .1),
                0 px2rem(2) px2rem(2) rgba(0, 0, 0, .1);
                .content-search-icon-wrapper {
                    flex: 0 0 px2rem(28);
                    font-size: px2rem(14);
                    @include center;
                }
                .content-search-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    height: 100%;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .book-slide-content-header-cancel {
                flex: 0 0 px2rem(40);
                font-size: px2rem(12);
                @include center;
                font-weight: bold;
            }
        }
        .book-info {
            display: flex;
            padding: px2rem(10);
            box-sizing: border-box;
            width: 100%;
            height: px2rem(90);
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .1);
            .book-info-left {
                flex: 0 0 px2rem(58);
                @include left;
                .book-info-image {
                    width: px2rem(48);
                    height: px2rem(70);
                }
            }
            .book-info-center {
                flex: 1;
                .book-info-title {
                    font-size: px2rem(14);
                    line-height: px2rem(16);
                    @include left;
                    .book-info-title-text {
                        @include ellipsis2(3);
                    }
                }
                .book-info-author {
                    margin-top: px2rem(5);
                    font-size: px2rem(12);
                    line-height: px2rem(14);
                    @include left;
                    .book-info-author-text {
                        @include ellipsis2(1);
                    }
                }
            }
            .book-info-right {
                flex: 0 0 px2rem(60);
                font-size: px2rem(12);
                @include center;
            }
        }
        .navigation {
            .navigation-item {
                padding: px2rem(20) px2rem(10);
                font-size: px2rem(14);
                line-height: px2rem(16);
                display: flex;
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #bbbbbb;
                .navigation-item-label {
                    flex: 1;
                    @include ellipsis;
                }
            }
        }
        .search-list-wrapper {
            .search-list-item {
                font-size: px2rem(14);
                line-height: px2rem(16);
                padding: px2rem(20) px2rem(10);
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #bbbbbb;
            }
        }
    }
</style>
