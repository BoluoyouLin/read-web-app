<template>
    <div class="shelf-item-wrapper">
        <component :is="item" :data="data"></component>
    </div>
</template>

<script>
    import ShelfBook from './ShelfBook'
    import ShelfDirectory from './ShelfDirectory'
    import ShelfAdd from './ShelfAdd'

    export default {
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-item-wrapper {
        width: 100%;
        height: 100%;
        box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
    }
</style>
