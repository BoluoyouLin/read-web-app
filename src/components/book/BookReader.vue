<template>
    <div class="book-reader">
        <div id="book"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
    computed: {
        ...mapGetters(['fileName'])
    },
    methods: {
        initEpub () {
            const url = 'http://192.168.0.101:8081/epub/' +
            this.fileName + '.epub'
            this.book = new Epub(url)
            this.bookRender = this.book.renderTo('book', {
                width: innerWidth,
                height: innerHeight,
                methods: 'default'
            })
            this.bookRender.display()
        }
    },
    mounted () {
        this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/'))
        .then(() => {
            this.initEpub()
        })
    }
}
</script>

<style scoped>

</style>
