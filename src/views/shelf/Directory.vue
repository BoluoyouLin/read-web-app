<template>
    <div class="shelf-directory">
        <shelf-title :title="shelfDirectory.title"
        ></shelf-title>
        <scroll class="shelf-scroll" :top="0" :bottom="scrollBottom" @onScroll="onScroll" ref="scroll" v-if="ifShowDirectoryList">
            <shelf-list :top="42" :data="shelfDirectory.itemList"></shelf-list>
        </scroll>
        <div v-else class="shelf-directory-none">
            {{$t('shelf.groupNone')}}
        </div>
        <shelf-footer></shelf-footer>
    </div>
</template>

<script>
    import ShelfTitle from '../../components/shelf/ShelfTitle'
    import { shelfMixin } from '../../utils/mixin'
    import Scroll from '../../components/common/Scroll'
    import ShelfList from '../../components/shelf/ShelfList'
    import ShelfFooter from '../../components/shelf/ShelfFooter'

    export default {
        name: 'directory',
        mixins: [shelfMixin],
        components: {
            ShelfFooter,
            ShelfList,
            Scroll,
            ShelfTitle
        },
        data () {
            return {
                scrollBottom: 0
            }
        },
        computed: {
            ifShowDirectoryList () {
                return this.shelfDirectory.itemList && this.shelfDirectory.itemList.length > 0
            }
        },
        watch: {
            isEditMode (value) {
                this.scrollBottom = value ? 48 : 0
                this.$nextTick(() => {
                    this.$refs.scroll.refresh()
                })
            }
        },
        methods: {
            onScroll (offsetY) {
                this.setOffsetY(offsetY)
            }
        },
        mounted () {
            this.getDirectoryList(this.$route.query.title)
            this.setCurrentType(2)
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-directory {
        position: relative;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .shelf-scroll {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 101;
            width: 100%;
        }
        .shelf-directory-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            font-size: px2rem(14);
            color: #666;
            @include center;
        }
    }
</style>
