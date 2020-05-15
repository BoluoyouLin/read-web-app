<template>
    <transition name="hot-search-move">
        <scroll class="hot-search-wrapper"
                :top="52"
                @onScroll="onScroll"
                ref="scroll">
            <search-history
                    :label="$t('home.historySearch')"
                    :btn="$t('home.clear')"
                    :searchHistory.sync="searchHistory"
                    :callback="clearUserHistory"
                    :itemClickCallback="clickSearchHistory"
            ></search-history>
        </scroll>
    </transition>
</template>

<script>
    import Scroll from '../common/Scroll'
    import SearchHistory from './SearchHistory'
    import { bookMallHomeMixin } from '../../utils/mixin'
    import { getCurrentUser } from '../../utils/localStorage'
    import { clearUserSearchHistory, getUserSearchHistory } from '../../api/user'

    export default {
        mixins: [bookMallHomeMixin],
        components: {
            Scroll,
            SearchHistory
        },
        data () {
            return {
                searchHistory: []
            }
        },
        methods: {
            onScroll (offsetY) {
                this.setHotSearchOffsetY(offsetY)
            },
            reset () {
                this.$refs.scroll.scrollTo(0, 0)
            },
            getUserSearchHistory () {
                const currentUser = getCurrentUser()
                if (currentUser) {
                    getUserSearchHistory(currentUser.id).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            this.searchHistory = data.data
                        }
                    })
                }
            },
            clearUserHistory () {
                const currentUser = getCurrentUser()
                if (currentUser) {
                    clearUserSearchHistory(currentUser.id).then(res => {
                        if (res.data && res.data.error_code === 0) {
                            this.getUserSearchHistory()
                        }
                    })
                }
            },
            // 点击搜索历史进行搜索
            clickSearchHistory (item) {
                this.$router.push({
                    path: '/bookMall/list',
                    query: {
                        keyword: item.text
                    }
                })
            }
        },
        created () {
            this.getUserSearchHistory()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/styles/global";

    .hot-search-wrapper {
        width: 100%;
        height: 100%;
        background: white;
    }
</style>
