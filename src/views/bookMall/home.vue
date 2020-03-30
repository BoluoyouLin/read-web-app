<template>
    <div class="book-mall-home">
        <home-title></home-title>
        <Scroll :top="top"
                @onScroll="onScroll"
                ref="scroll"
        >
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
            <div>1111111111111111111111</div>
        </Scroll>
    </div>
</template>

<script>
    import HomeTitle from '../../components/home/HomeTitle'
    import Scroll from '../../components/common/Scroll'
    import { bookMallHomeMixin } from '../../utils/mixin'
    export default {
        mixins: [bookMallHomeMixin],
        components: {
            HomeTitle,
            Scroll
        },
        methods: {
            onScroll (offsetY) {
                this.setOffsetY(offsetY)
                if (offsetY > 0) {
                    this.top = 55
                }
                this.$refs.scroll.refresh()
            }
        },
        data () {
            return {
                top: 100
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global.scss";
    .book-mall-home {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
</style>
