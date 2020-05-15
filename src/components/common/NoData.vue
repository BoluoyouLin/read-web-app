<template>
    <div class="no-data">
        <span>{{text}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .no-data {
        width: 100%;
        height: 100%;
        font-size: px2rem(16);
        color: #999999;
        @include center
    }
</style>
