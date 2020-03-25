<template>
    <div>
        <transition name="slide-up">
            <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}"
                 v-show="menuVisible">
                <div class="icon-wrapper">
                    <span class="icon-menu" @click="showSetting(3)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-progress" @click="showSetting(2)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-bright" @click="showSetting(1)"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-A" @click="showSetting(0)"></span>
                </div>
            </div>
        </transition>
        <book-set-font></book-set-font>
        <book-set-font-family></book-set-font-family>
        <book-set-theme></book-set-theme>
        <book-set-progress></book-set-progress>
        <book-slide></book-slide>
    </div>
</template>
<script>
    import { bookMixin } from '../../utils/mixin'
    import BookSetFont from './BookSetFont'
    import BookSetFontFamily from './BookSetFontFamily'
    import BookSetTheme from './BookSetTheme'
    import BookSetProgress from './BookSetProgress'
    import BookSlide from './BookSlide'

    export default {
        mixins: [bookMixin],
        components: {
            BookSetFont,
            BookSetFontFamily,
            BookSetTheme,
            BookSetProgress,
            BookSlide
        },
        methods: {
            showSetting (key) {
                this.setSettingVisible(key)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global.scss";
    .menu-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 200;
        display: flex;
        width: 100%;
        height: px2rem(48);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        font-size: px2rem(20);
        &.hide-box-shadow {
            box-shadow: none;
        }
        .icon-wrapper {
            flex: 1;
            @include center;
            .icon-progress {
                font-size: px2rem(24);
            }
            .icon-bright {
                font-size: px2rem(22);
            }
        }
    }
</style>
