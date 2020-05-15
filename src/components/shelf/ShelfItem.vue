<template>
    <div class="shelf-item-wrapper"
         :class="{ 'shadow': data.type === 1 || data.type === 2 }"
         @click="clickItem"
    >
        <component :is="item"
                   :data="data"
                   class="item-component"
                   :class="{ 'is-edit' : data.type === 2 && isEditMode}"
        ></component>
        <div class="icon-selected"
             v-show="data.type === 1 && isEditMode"
             :class="{ 'selected' : this.data.selected}"
        ></div>
    </div>
</template>

<script>
    import ShelfBook from './ShelfBook'
    import ShelfDirectory from './ShelfDirectory'
    import ShelfAdd from './ShelfAdd'
    import { goBookMall } from '../../utils/shelf'
    import { shelfMixin } from '../../utils/mixin'

    export default {
        mixins: [shelfMixin],
        props: {
            data: Object
        },
        computed: {
            item () {
                return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.directory : this.add)
            }
        },
        data () {
            return {
                book: ShelfBook,
                directory: ShelfDirectory,
                add: ShelfAdd
            }
        },
        methods: {
            // 点击书架项目
            clickItem () {
                if (this.isEditMode && this.data.type === 1) {
                    this.data.selected = !this.data.selected
                    if (this.data.selected) {
                        this.shelfSelected.pushNoRepeat(this.data)
                    } else {
                        this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
                    }
                } else {
                    if (this.data.type === 1 && !this.isEditMode) {
                        this.showBookDetail(this.data)
                    } else if (this.data.type === 2 && !this.isEditMode) {
                        this.$router.push({
                            path: '/directory',
                            query: {
                                title: this.data.title
                            }
                        })
                    } else if (this.data.type === 3) {
                        goBookMall(this)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-item-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        &.shadow {
            box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
        }
        .item-component {
            opacity: 1;
            &.is-edit {
                opacity: .5;
            }
        }
        .icon-selected {
            position: absolute;
            bottom: px2rem(2);
            right: px2rem(2);
            font-size: px2rem(16);
            color: rgba(0, 0, 0, .3);
            &.selected {
                color: $color-blue;
            }
        }
    }
</style>
