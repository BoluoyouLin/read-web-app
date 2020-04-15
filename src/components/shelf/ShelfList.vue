<template>
    <div class="shelf-list-wrapper">
        <div class="shelf-list-item" v-for="item in shelfList" :key="item.id">
            <shelf-item :data="item" :style="{height : itemHeight}"></shelf-item>
            <div class="shelf-list-item-title">
                <span class="title-small">{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ShelfItem from './ShelfItem'
    import { shelfMixin } from '../../utils/mixin'
    import { realPx } from '../../utils/utils'

    export default {
        components: { ShelfItem },
        mixins: [shelfMixin],
        computed: {
            itemHeight () {
                return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-list-wrapper {
        position: absolute;
        top: px2rem(94);
        left: 0;
        z-index: 100;
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
        }
        .shelf-list-item-title {
            margin-top: px2rem(10);
        }
    }
</style>
