<template>
    <div class="shelf-book-wrapper">
        <img class="shelf-book-cover" :src="data.cover"/>
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
    .shelf-book-wrapper {
        width: 100%;
        height: 100%;
        .shelf-book-cover {
            width: 100%;
            height: 100%;
        }
    }
</style>
