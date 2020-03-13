import { mapGetters, mapActions } from 'vuex'

export const bookMixin = {
    computed: {
        ...mapGetters([
            'menuVisible',
            'fileName'
        ])
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible'
        ])
    }
}
