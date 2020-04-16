<template>
    <div class="shelf">
        <shelf-title></shelf-title>
        <scroll class="shelf-scroll" :top="0" :bottom="scrollBottom" @onScroll="onScroll" ref="scroll">
            <shelf-search></shelf-search>
            <shelf-list></shelf-list>
        </scroll>
        <shelf-footer></shelf-footer>
    </div>
</template>

<script>
    import ShelfTitle from '../../components/shelf/ShelfTitle'
    import { shelfMixin } from '../../utils/mixin'
    import Scroll from '../../components/common/Scroll'
    import ShelfSearch from '../../components/shelf/ShelfSearch'
    import { shelf } from '../../api/store'
    import ShelfList from '../../components/shelf/ShelfList'
    import { addToShelf } from '../../utils/shelf'
    import ShelfFooter from '../../components/shelf/ShelfFooter'

    export default {
        mixins: [shelfMixin],
        components: {
            ShelfFooter,
            ShelfList,
            Scroll,
            ShelfTitle,
            ShelfSearch
        },
        data () {
            return {
                scrollBottom: 0
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
            getShelfList () {
                shelf().then(res => {
                    if (res.status === 200 && res.data && res.data.bookList) {
                        this.setShelfList(addToShelf(res.data.bookList))
                    }
                })
            },
            onScroll (offsetY) {
                this.setOffsetY(offsetY)
            }
        },
        mounted () {
            this.getShelfList()
        }
    }
</script>

<style lang="scss" scoped>
    .shelf {
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
    }
</style>
