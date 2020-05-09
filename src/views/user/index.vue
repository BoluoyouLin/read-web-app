<template>
    <div class="user-center">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'index'
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .user-center {
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
    }
</style>
