<template>
    <transition name="wrapper-slide-up">
        <div class="font-family-list" v-show="fontFamilyVisible">
            <div class="font-family-title">
                <div class="font-family-title-icon" @click="hideWrapper">
                    <span class="icon-down2"></span>
                </div>
                <span class="font-family-title-text">选择字体</span>
            </div>
            <div class="font-family-list-wrapper ">
                <div class="font-family-list-item" v-for="(item,  index) in fontList" :key="index"
                     @click="selectFontFamily(item)">
                    <div class="font-family-list-item-text" :class="{'selected': isSelected(item)}">
                        {{item.font}}</div>
                    <div class="font-family-list-item-icon" v-if="isSelected(item)">
                        <span class="icon-check"></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'
    import { FONT_FAMILY } from '../../utils/book'

    export default {
        mixins: [bookMixin],
        data () {
            return {
                fontList: FONT_FAMILY
            }
        },
        methods: {
            hideWrapper () {
                this.setFontFamilyVisible(false)
            },
            isSelected (item) {
                return this.defaultFontFamily === item.font
            },
            selectFontFamily (item) {
                this.setDefaultFontFamily(item.font)
                if (item.font === 'Default') {
                    this.currentBook.rendition.themes.font('Times New Roman')
                } else {
                    this.currentBook.rendition.themes.font(item.font)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global.scss";
    .font-family-list {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 300;
        width: 100%;
        background-color: white;
        box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
        .font-family-title {
            padding: px2rem(15);
            box-sizing: border-box;
            border-bottom: px2rem(1) solid #bbb;
            @include center;
            position: relative;
            .font-family-title-icon {
                position: absolute;
                left: px2rem(15);
                top: 0;
                height: 100%;
                @include center;
                font-size: px2rem(16);
                font-weight: bold;
            }
            .font-family-title-text{
                font-size: px2rem(14);
                font-weight: bold;
            }
        }
        .font-family-list-wrapper {
            .font-family-list-item{
                display: flex;
                padding: px2rem(15);
                .font-family-list-item-text{
                    flex: 1;
                    text-align: left;
                    font-size: px2rem(14);
                    &.selected {
                        color: lightskyblue;
                        font-weight: bold;
                    }
                }
                .font-family-list-item-icon{
                    flex: 1;
                    text-align: right;
                    font-size: px2rem(14);
                    font-weight: bold;
                    color: lightskyblue;
                }
            }
        }
    }
</style>
