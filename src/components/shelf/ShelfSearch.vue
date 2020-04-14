<template>
    <div class="shelf-search">
        <div class="shelf-search-box" :class="{'search-top' : inputClick}">
            <div class="shelf-search-wrapper">
                <div class="icon-search-wrapper">
                    <span class="icon-search icon"></span>
                </div>
                <div class="search-input-wrapper">
                    <input class="search-input"
                           type="text"
                           :placeholder="$t('shelf.search')"
                           @click="clickInput"
                           v-model="searchText"
                    />
                </div>
                <div class="icon-close-wrapper">
                    <span class="icon-close-circle-fill icon"
                          v-show="searchText.length > 0"
                          @click="clearSearchText"
                    ></span>
                </div>
            </div>
            <div class="cancel-text-wrapper" v-if="inputClick">
                <span class="cancel-text" @click="clickCancel">{{$t('shelf.cancel')}}</span>
            </div>
            <div class="icon-lang-wrapper" v-else>
                <span class="icon-cn icon" v-if="lang === 'zh'" @click="switchLocale"></span>
                <span class="icon-en icon" v-else @click="switchLocale"></span>
            </div>
        </div>
        <transition name="hot-search-move">
            <div class="shelf-sub-item-wrapper" v-show="inputClick">
                <div class="shelf-sub-item" v-for="item in subItems"
                     :key="item.id"
                     @click="changeSubItem(item.id)"
                     :class="{'selected' : currentSubItem === item.id}"
                >
                    <span>{{item.text}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { setLocale } from '../../utils/localStorage'
    import { shelfMixin } from '../../utils/mixin'

    export default {
        mixins: [shelfMixin],
        data () {
            return {
                inputClick: false,
                searchText: '',
                currentSubItem: 1
            }
        },
        computed: {
            lang () {
                return this.$i18n.locale
            },
            subItems () {
                return [
                    {
                        id: 1,
                        text: this.$t('shelf.default')
                    },
                    {
                        id: 2,
                        text: this.$t('shelf.progress')
                    },
                    {
                        id: 3,
                        text: this.$t('shelf.purchase')
                    }
                ]
            }
        },
        methods: {
            clickInput () {
                this.inputClick = true
                this.setShelfTitleVisible(false)
            },
            clickCancel () {
                this.inputClick = false
                this.clearSearchText()
                this.setShelfTitleVisible(true)
            },
            switchLocale () {
                if (this.lang === 'zh') {
                    this.$i18n.locale = 'en'
                } else {
                    this.$i18n.locale = 'zh'
                }
                setLocale(this.$i18n.locale)
            },
            clearSearchText () {
                this.searchText = ''
            },
            changeSubItem (id) {
                this.currentSubItem = id
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-search {
        position: relative;
        z-index: 105;
        width: 100%;
        height: px2rem(94);
        background-color: #ffffff;
        display: flex;
        .shelf-search-box {
            position: absolute;
            z-index: 105;
            left: 0;
            top: px2rem(42);
            height: px2rem(52);
            display: flex;
            width: 100%;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            transition: top .2s linear;
            &.search-top {
                top: 0;
            }
            @include center;
            .shelf-search-wrapper {
                height: px2rem(35);
                flex: 1;
                border: px2rem(1) solid #bbbbbb;
                border-radius: px2rem(2);
                display: flex;
                .icon-search-wrapper {
                    font-size: px2rem(16);
                    color: #666;
                    @include center;
                    flex: 0 0 px2rem(30);
                }
                .search-input-wrapper {
                    padding: 0 px2rem(10);
                    flex: 1;
                    @include center;
                    .search-input {
                        width: 100%;
                        font-size: px2rem(14);
                        color: #666666;
                        border: 0;
                        &:focus {
                            outline: none;
                        }
                        &::-webkit-input-placeholder {
                            color: #ccc;
                            font-size: px2rem(14);
                        }
                    }
                }
                .icon-close-wrapper {
                    font-size: px2rem(16);
                    color: #ccc;
                    flex: 0 0 px2rem(30);
                    @include center;
                }
            }
            .cancel-text-wrapper {
                flex: 0 0 px2rem(45);
                height: px2rem(35);
                @include center;
                .cancel-text {
                    font-size: px2rem(14);
                    line-height: px2rem(18);
                    color: $color-blue;
                }
            }
            .icon-lang-wrapper {
                flex: 0 0 px2rem(45);
                height: px2rem(35);
                @include center;
                .icon-cn, .icon-en {
                    font-size: px2rem(18);
                    color: #666;
                }
            }
        }
        .shelf-sub-item-wrapper {
            position: absolute;
            left: 0;
            top: px2rem(52);
            width: 100%;
            height: px2rem(42);
            display: flex;
            z-index: 105;
            .shelf-sub-item {
                font-size: px2rem(14);
                color: #666;
                @include center;
                flex: 1;
                &.selected {
                    color: $color-blue;
                }
            }
        }
    }
</style>
