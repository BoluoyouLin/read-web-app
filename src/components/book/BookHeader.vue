<template>
    <div class="book-header">
        <div class="book-header-text">{{getSectionName}}</div>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'

    export default {
        mixins: [bookMixin]
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .book-header {
        position: absolute;
        top: 0;
        height: px2rem(40);
        box-sizing: border-box;
        padding: px2rem(10) px2rem(20);
        z-index: 100;
        @include left;
        width: 100%;
        .book-header-text {
            font-size: px2rem(12);
            line-height: px2rem(14);
            @include ellipsis;
        }
    }
</style>
