<template>
    <div class="book-mall">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'index'
    }
</script>

<style lang="scss" scoped>
    .book-mall {
        width: 100%;
        height: 100%;
        background-color: white;
    }
</style>
