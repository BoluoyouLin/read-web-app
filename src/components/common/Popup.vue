<template>
    <div class="popup-wrapper" v-if="popupVisible">
        <transition name="fade">
            <div class="popup-bg" @click.stop.prevent="hide" v-if="popupVisible"></div>
        </transition>
        <transition name="slide-up">
            <div class="popup" v-if="visible">
                <div class="popup-title" v-show="title && title.length > 0">{{title && title.length > 0 ? title : ' '}}</div>
                <div class="popup-button"
                     :class="{'danger': item.type === 'danger'}"
                     v-for="(item, index) in buttons"
                     @click="item.click"
                     :key="index">{{item.text}}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        props: {
            title: String,
            buttons: Array
        },
        data () {
            return {
                popupVisible: false,
                visible: false
            }
        },
        methods: {
            show () {
                this.popupVisible = true
                setTimeout(() => {
                    this.visible = true
                })
            },
            hide () {
                setTimeout(() => {
                    this.popupVisible = false
                }, 200)
                this.visible = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/styles/global';
    .popup-wrapper {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0, 0, 0, .4);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2000;
        .popup-bg {
            width: 100%;
            height: 100%;
            z-index: 2000;
        }
        .popup {
            display: flex;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 2000;
            width: 100%;
            background-color: #fff;
            flex-direction: column;
            .popup-title {
                width: 100%;
                height: px2rem(40);
                font-size: px2rem(12);
                line-height: px2rem(16);
                color: #666;
                @include center;
            }
            .popup-button {
                width: 100%;
                height: px2rem(50);
                color: #666;
                border-top: px2rem(1) solid #eee;
                font-size: px2rem(14);
                line-height: px2rem(18);
                font-weight: bold;
                @include center;
                &.danger {
                    color: $color-pink;
                }
            }
        }
    }
</style>
