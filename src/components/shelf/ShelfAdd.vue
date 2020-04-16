<template>
    <div class="shelf-add-wrapper">
        <span class="icon-add"></span>
    </div>
</template>

<script>
    export default {
        name: 'ShelfAdd'
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global.scss";

    .shelf-add-wrapper {
        width: 100%;
        height: 100%;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        @include center;
        font-size: px2rem(40);
        color: #ccc;
    }
</style>
