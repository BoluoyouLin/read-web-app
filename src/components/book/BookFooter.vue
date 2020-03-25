<template>
    <div class="book-footer">
        <div class="book-footer-text">{{bookAvailable ? progress + '%' : '加载中...'}}</div>
    </div>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'

    export default {
        mixins: [bookMixin]
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/styles/global';
    .book-footer {
        position: absolute;
        z-index: 100;
        box-sizing: border-box;
        padding: px2rem(10) px2rem(20);
        bottom: 0;
        width: 100%;
        height: px2rem(40);
        @include right;
        .book-footer-text {
            font-size: px2rem(12);
            line-height: px2rem(14);
        }
    }
</style>
