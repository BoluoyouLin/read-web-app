<template>
    <transition name="fade-slide-right">
        <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
            <div class="content" v-if="bookAvailable">
                <div class="content-body">
                    <component :is="currentTable === 1 ? content : bookmark"></component>
                </div>
                <div class="content-table">
                    <div class="content-table-item"
                        :class="{'selected' : currentTable === 1}"
                        @click="changeTable(1)"
                    >{{$t('book.navigation')}}</div>
                    <div class="content-table-item"
                         :class="{'selected' : currentTable === 2}"
                         @click="changeTable(2)"
                    >{{$t('book.bookmark')}}</div>
                </div>
            </div>
            <div class="slide-loading-wrapper" v-else>
                <book-loading></book-loading>
            </div>
            <div class="content-background" @click="hideNavigation()"></div>
        </div>
    </transition>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import BookSlideContent from './BookSlideContent'
    import BookLoading from './BookLoading'

    export default {
        mixins: [bookMixin],
        components: {
            BookLoading
        },
        data () {
            return {
                currentTable: 1,
                content: BookSlideContent, // 目录内容组件
                bookmark: null // 书签组件
            }
        },
        methods: {
            // 改变当前table值
            changeTable (value) {
                this.currentTable = value
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global.scss";
    .slide-content-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 301;
        display: flex;
        .content {
            flex: 0 0 85%;
            height: 100%;
            width: 85%;
            display: flex;
            flex-direction: column;
            .content-body {
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-table {
                flex: 0 0 px2rem(45);
                width: 100%;
                display: flex;
                box-shadow: 0 px2rem(-4) px2rem(4) rgba(0, 0, 0, .1);
                .content-table-item {
                    flex: 1;
                    font-size: px2rem(14);
                    @include center;
                }
            }
        }
        .content-background {
            flex: 0 0 15%;
            height: 100%;
            width: 15%;
        }
        .slide-loading-wrapper {
            flex: 0 0 85%;
            height: 100%;
            width: 85%;
            @include center;
        }
    }
</style>
