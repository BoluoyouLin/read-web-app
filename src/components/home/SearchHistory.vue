<template>
    <div>
        <div class="hot-search-title">
            <span class="label">{{label}}</span>
            <span class="btn" @click="btnClick">{{btn}}</span>
        </div>
        <div class="hot-search-list" v-if="this.searchHistory.length > 0">
            <div class="hot-search-item" v-for="(item, index) in searchHistory" :key="index" @click="itemClick(item)">
                <div class="icon-wrapper">
                    <span class="icon-search icon"></span>
                </div>
                <div class="hot-search-text-wrapper">
                    <div class="text" ref="searchText">{{item.text}}</div>
                </div>
            </div>
        </div>
        <no-data :text="$t('home.noSearchHistory')" v-else></no-data>
    </div>
</template>

<script>
    import { realPx } from '../../utils/utils'
    import NoData from '../common/NoData'

    export default {
        components: {
            NoData
        },
        props: {
            label: String,
            btn: String,
            searchHistory: Array,
            callback: Function,
            itemClickCallback: Function
        },
        methods: {
            btnClick () {
                this.callback()
                this.$emit('update:searchHistory', [])
            },
            itemClick (item) {
                this.itemClickCallback(item)
            }
        },
        mounted () {
            if (this.searchHistory.length > 0) {
                this.$refs.searchText.forEach(item => {
                    item.style.width = window.innerWidth - realPx(20) - realPx(40) + 'px'
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/styles/global";
    .hot-search-title {
        display: flex;
        width: 100%;
        font-size: px2rem(13);
        padding: px2rem(10);
        box-sizing: border-box;
        .label {
            flex: 1;
            text-align: left;
            font-weight: bold;
            color: #666;
        }
        .btn {
            flex: 1;
            text-align: right;
            font-weight: bold;
            color: #409EFF;
        }
    }
    .hot-search-list {
        width: 100%;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .hot-search-item {
            padding: px2rem(10) 0;
            display: flex;
            .icon-wrapper {
                flex: 0 0 px2rem(40);
                @include center;
                .icon-book {
                    font-size: px2rem(16);
                }
                .icon-search {
                    font-size: px2rem(16);
                }
            }
            .hot-search-text-wrapper {
                flex: 1;
                height: px2rem(35);
                @include columnLeft;
                .text {
                    flex: 1;
                    height: 100%;
                    font-size: px2rem(14);
                    font-weight: bold;
                    color: #666;
                    @include ellipsis;
                    @include left;
                }
                .num {
                    font-size: px2rem(12);
                    color: #999;
                    margin-top: px2rem(5);
                }
            }
        }
    }
</style>
