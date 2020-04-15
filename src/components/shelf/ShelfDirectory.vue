<template>
    <div class="shelf-directory-wrapper">
        <div class="shelf-directory-list">
            <div class="shelf-directory-list-item" v-for="item in data.itemList" :key="item.id">
                <img class="shelf-directory-list-item-img"
                     :src="item.cover"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: Object
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-directory-wrapper {
        width: 100%;
        height: 100%;
        .shelf-directory-list {
            width: 100%;
            height: 100%;
            padding: 0 px2rem(2.5);
            box-sizing: border-box;
            display: flex;
            flex-flow: row wrap;
            overflow: hidden;
            .shelf-directory-list-item {
                flex:0 0 33.33%;
                width: 33.33%;
                height: 33.33%;
                padding: px2rem(2.5);
                box-sizing: border-box;
                .shelf-directory-list-item-img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
