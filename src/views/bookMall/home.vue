<template>
    <div class="book-mall-home">
        <home-title></home-title>
        <Scroll :top="top"
                @onScroll="onScroll"
                ref="scroll"
        >
            <div class="banner">
                <img :src="banner"
                     class="banner-img"
                />
            </div>
            <featured :data="featured"
                      :title-text="$t('home.featured')"
                      :btn-text="$t('home.seeAll')"
            ></featured>
            <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
                <category-book :data="item"></category-book>
            </div>
            <category :data="categories"></category>
        </Scroll>
        <random-recommend></random-recommend>
    </div>
</template>

<script>
    import HomeTitle from '../../components/home/HomeTitle'
    import Scroll from '../../components/common/Scroll'
    import RandomRecommend from '../../components/home/RandomRecommend'
    import { bookMallHomeMixin } from '../../utils/mixin'
    import { home } from '../../api/store'
    import Featured from '../../components/home/Featured'
    import CategoryBook from '../../components/home/CategoryBook'
    import Category from '../../components/home/Category'
    export default {
        mixins: [bookMallHomeMixin],
        components: {
            Category,
            CategoryBook,
            Featured,
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
                banner: '',
                featured: null,
                categoryList: null,
                categories: null
            }
        },
        mounted () {
            home().then(res => {
                if (res && res.status === 200) {
                    // console.log(res.data)
                    this.banner = res.data.banner
                    this.featured = res.data.featured
                    this.categoryList = res.data.categoryList
                    this.categories = res.data.categories
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
        .banner {
            width: 100%;
            height: px2rem(150);
            padding: px2rem(10);
            box-sizing: border-box;
            .banner-img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
