<template>
    <div>
        <div class="home-title"
             :class="{ 'hide-title' : !titleVisible, 'shadow' : shadowVisible}"
        >
            <transition name="hide-title">
                <div class="home-title-wrapper" v-show="titleVisible">
                    <div class="home-title-text-wrapper">
                        <span class="title">{{$t('home.title')}}</span>
                    </div>
                    <div class="home-title-icon-wrapper">
                        <span class="icon-shake icon"
                              @click="showFlipCard"
                        ></span>
                    </div>
                    <div class="home-title-icon-wrapper"
                         @click="goUserCenter"
                    >
                        <span class="icon-person icon"
                        ></span>
                    </div>
                </div>
            </transition>
            <div class="home-title-icon-back-wrapper"
                 :class="{ 'hide-title' : !titleVisible }"
                 @click="back"
            >
                <span class="icon-back icon"></span>
            </div>
            <div class="home-title-search-wrapper" :class="{ 'hide-title' : !titleVisible }">
                <div class="place-wrapper" :class="{ 'hide-title' : !titleVisible }"></div>
                <div class="home-title-input-wrapper">
                    <div class="search-icon-wrapper">
                        <span class="icon-search icon"></span>
                    </div>
                    <input type="text"
                           :placeholder="$t('home.hint')"
                           v-model="searchText"
                           class="search-input"
                           @click="showHotSearchListVisible"
                           @keyup.13.exact="search"
                    />
                </div>
            </div>
        </div>
        <search-list v-show="hotSearchListVisible" ref="searchList"></search-list>
    </div>
</template>

<script>
    import { bookMallHomeMixin } from '../../utils/mixin'
    import SearchList from './SearchList'
    import { getCurrentUser } from '../../utils/localStorage'
    import { addUserSearchHistory } from '../../api/user'

    export default {
        mixins: [bookMallHomeMixin],
        components: {
            SearchList
        },
        data () {
            return {
                searchText: '',
                titleVisible: true,
                shadowVisible: false,
                hotSearchListVisible: false
            }
        },
        watch: {
            offsetY (offsetY) {
                if (offsetY > 0) {
                    this.hideTitle()
                    this.showShadow()
                } else {
                    this.showTitle()
                    this.hideShadow()
                }
            },
            hotSearchOffsetY (hotSearchOffsetY) {
                if (hotSearchOffsetY > 0) {
                    this.showShadow()
                } else {
                    this.hideShadow()
                }
            }
        },
        methods: {
            goUserCenter () {
                this.$router.push('/user/userCenter')
            },
            hideTitle () {
                this.titleVisible = false
            },
            showTitle () {
                this.titleVisible = true
            },
            hideShadow () {
                this.shadowVisible = false
            },
            showShadow () {
                this.shadowVisible = true
            },
            hideHotSearchList () {
                this.hotSearchListVisible = false
                if (this.offsetY > 0) {
                    this.showShadow()
                    this.hideTitle()
                } else {
                    this.showTitle()
                    this.hideShadow()
                }
            },
            showHotSearchListVisible () {
                this.hideTitle()
                this.hideShadow()
                this.hotSearchListVisible = true
                this.$nextTick(() => {
                    this.$refs.searchList.reset()
                })
            },
            back () {
                if (this.titleVisible) {
                    this.$router.push('/shelf')
                } else {
                    this.showTitle()
                    this.hideHotSearchList()
                }
            },
            showFlipCard () {
                this.setFlipCardVisible(true)
            },
            addUserSearchHistory () {
                const currentUser = getCurrentUser()
                if (currentUser) {
                    addUserSearchHistory(currentUser.id, this.searchText)
                }
            },
            search () {
                this.addUserSearchHistory()
                this.$router.push({
                    path: '/bookMall/list',
                    query: {
                        keyword: this.searchText
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .home-title {
        width: 100%;
        height: px2rem(100);
        background-color: #fff;
        z-index: 150;
        &.shadow {
            box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, .1);
        }
        &.hide-title {
            height: px2rem(55);
        }
        .home-title-wrapper {
            height: px2rem(45);
            display: flex;
            padding: 0 px2rem(10) 0 px2rem(60);
            box-sizing: border-box;
            .home-title-icon-wrapper {
                flex: 0 0 px2rem(25);
                text-align: center;
            }
            .home-title-text-wrapper {
                flex: 1;
                @include center;
            }
        }
        .home-title-icon-back-wrapper {
            position: absolute;
            top: 0;
            left: px2rem(10);
            height: px2rem(45);
            @include center;
            z-index: 200;
            transition: height $transitionTime $transitionType;
            &.hide-title {
                height: px2rem(55);
            }
        }
        .home-title-search-wrapper {
            width: 100%;
            box-sizing: border-box;
            height: px2rem(55);
            padding: px2rem(10);
            position: absolute;
            top: px2rem(45);
            left: 0;
            display: flex;
            transition: top $transitionTime $transitionType;
            .place-wrapper {
                width: 0;
                height: 0;
                transition: all $transitionTime $transitionType;
                &.hide-title {
                    width: px2rem(26);
                    height: 100%;
                }
            }
            &.hide-title {
                top: 0;
            }
            .home-title-input-wrapper {
                display: flex;
                width: 100%;
                height: px2rem(35);
                background-color: #f4f4f4;
                border-radius: px2rem(20);
                padding: px2rem(5) px2rem(10);
                box-sizing: border-box;
                .search-icon-wrapper {
                    flex: 0 0 px2rem(20);
                    @include left;
                }
                .search-input {
                    margin-left: px2rem(5);
                    flex: 1;
                    background: transparent;
                    border: 0;
                    width: 100%;
                    &:focus {
                        outline: none;
                    }
                }
            }
         }
    }
</style>
