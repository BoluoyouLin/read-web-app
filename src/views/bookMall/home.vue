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
        <random-recommend :data="random"></random-recommend>
    </div>
</template>

<script>
    import HomeTitle from '../../components/home/HomeTitle'
    import Scroll from '../../components/common/Scroll'
    import RandomRecommend from '../../components/home/RandomRecommend'
    import { bookMallHomeMixin } from '../../utils/mixin'
    import { home } from '../../api/store'
    export default {
        mixins: [bookMallHomeMixin],
        components: {
            HomeTitle,
            Scroll,
            RandomRecommend
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
                top: 100,
                random: null
            }
        },
        mounted () {
            home().then(res => {
                if (res && res.status === 200) {
                    const random = res.data.random
                    const index = Math.floor(Math.random() * random.length)
                    this.random = random[index]
                }
            })
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
