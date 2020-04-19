<template>
    <div class="shelf-list-wrapper" :style="{top : shelfListTop}">
        <transition-group name="list"
                          tag="div"
                          id="shelf-list"
        >
            <div class="shelf-list-item" v-for="item in data" :key="item.id">
                <shelf-item :data="item" :style="{height : itemHeight}"></shelf-item>
                <div class="shelf-list-item-title">
                    <span class="title-small">{{item.title}}</span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import ShelfItem from './ShelfItem'
    import { shelfMixin } from '../../utils/mixin'
    import { px2rem, realPx } from '../../utils/utils'

    export default {
        components: { ShelfItem },
        mixins: [shelfMixin],
        props: {
            top: {
                type: Number,
                default: 94
            },
            data: Array
        },
        computed: {
            itemHeight () {
                return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
            },
            shelfListTop () {
                return px2rem(this.top) + 'rem'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-list-wrapper {
        position: absolute;
        left: 0;
        z-index: 100;
        width: 100%;
        #shelf-list {
            display: flex;
            flex-flow: row wrap;
            width: 100%;
            padding: 0 px2rem(15);
            box-sizing: border-box;
            .shelf-list-item {
                width: 33.33%;
                flex:0 0 33.33%;
                padding: px2rem(15);
                box-sizing: border-box;
                &.list-leave-active {
                    display: none;
                }
                &.list-move {
                    transition: transform .5s;
                }
            }
            .shelf-list-item-title {
                margin-top: px2rem(10);
            }
        }
    }
</style>
