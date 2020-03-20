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
                       :placeholder="$t('book.searchHint')"
                />
            </div>
            <div class="book-slide-content-header-cancel"
                 v-if="cancelVisible"
                 @click="hideCancel"
            >{{$t('book.cancel')}}</div>
        </div>
        <div class="book-info">
            <div class="book-info-left">
                <img :src="this.cover"
                     class="book-info-image"
                />
            </div>
            <div class="book-info-center">
                <div class="book-info-title">{{this.metadata? this.metadata.title: ''}}</div>
                <div class="book-info-author">{{this.metadata ? this.metadata.creator : ''}}</div>
            </div>
            <div class="book-info-right">
                {{$t('book.haveRead2')}}
                {{this.progress}}%
            </div>
        </div>
        <Scroll class="navigation"></Scroll>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import Scroll from '../common/Scroll'
    export default {
        components: { Scroll },
        mixins: [bookMixin],
        component: {
            Scroll
        },
        data () {
            return {
                cancelVisible: false
            }
        },
        methods: {
            // 展示搜索界面
            showCancel () {
                this.cancelVisible = true
            },
            // 隐藏搜索界面
            hideCancel () {
                this.cancelVisible = false
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
                    @include ellipsis2(3);
                    width: px2rem(180.75);
                    font-size: px2rem(14);
                }
                .book-info-author {
                    margin-top: px2rem(5);
                    @include ellipsis2(2);
                    width: px2rem(180.75);
                    font-size: px2rem(12);
                }
            }
            .book-info-right {
                flex: 0 0 px2rem(60);
                font-size: px2rem(14);
                @include center;
            }
        }
    }
</style>
