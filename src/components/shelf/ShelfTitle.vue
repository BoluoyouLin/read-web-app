<template>
    <transition name="hide-title">
        <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow' : isHideShadow}">
            <div class="shelf-title-text-wrapper">
                <span class="shelf-title-text">{{$t('shelf.title')}}</span>
                <span class="shelf-title-sub-text" v-show="isEditMode">{{selectText}}</span>
            </div>
            <div class="shelf-title-button-wrapper button-left">
                <span class="button-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
            </div>
            <div class="shelf-title-button-wrapper button-right">
                <span class="button-text"  @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
            </div>
        </div>
    </transition>
</template>

<script>
    import { shelfMixin } from '../../utils/mixin'

    export default {
        mixins: [shelfMixin],
        computed: {
            selectText () {
                const shelfNumber = this.shelfSelected ? this.shelfSelected.length : 0
                if (shelfNumber <= 0) {
                    return this.$t('shelf.selectBook')
                } else if (shelfNumber === 1) {
                    return this.$t('shelf.haveSelectedBook').replace('$1', shelfNumber)
                } else {
                    return this.$t('shelf.haveSelectedBooks').replace('$1', shelfNumber)
                }
            }
        },
        data () {
            return {
                isHideShadow: true
            }
        },
        methods: {
            onEditClick () {
                this.setIsEditMode(!this.isEditMode)
            },
            clearCache () {
                console.log('clear cache')
            }
        },
        watch: {
            offsetY (value) {
                if (value > 0) {
                    this.isHideShadow = false
                } else {
                    this.isHideShadow = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .shelf-title {
        z-index: 120;
        position: relative;
        height: px2rem(42);
        width: 100%;
        background-color: #fff;
        box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
        &.hide-shadow {
            box-shadow: none;
        }
        .shelf-title-text-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            height: px2rem(42);
            width: 100%;
            @include columnCenter;
            text-align: center;
            .shelf-title-text {
                font-size: px2rem(16);
                line-height: px2rem(18);
                font-weight: bold;
                color: #333;
            }
            .shelf-title-sub-text {
                font-size: px2rem(12);
                line-height: px2rem(14);
                color: #999;
            }
        }
        .shelf-title-button-wrapper {
            position: absolute;
            top: 0;
            height: px2rem(42);
            @include center;
            .button-text {
                font-size: px2rem(16);
                line-height: px2rem(18);
                color: #999999;
            }
            &.button-left {
                left: 0;
                margin-left: px2rem(15);
            }
            &.button-right {
                right: 0;
                margin-right: px2rem(15);
            }
        }
    }
</style>
