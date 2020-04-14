<template>
    <div class="shelf">
        <shelf-title></shelf-title>
        <scroll class="shelf-scroll" :top="0">
            <shelf-search></shelf-search>
        </scroll>
    </div>
</template>

<script>
    import ShelfTitle from '../../components/shelf/ShelfTitle'
    import { shelfMixin } from '../../utils/mixin'
    import Scroll from '../../components/common/Scroll'
    import ShelfSearch from '../../components/shelf/ShelfSearch'

    export default {
        mixins: [shelfMixin],
        components: {
            Scroll,
            ShelfTitle,
            ShelfSearch
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
