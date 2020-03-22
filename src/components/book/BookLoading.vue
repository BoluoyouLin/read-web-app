<template>
    <div class="book-loading-wrapper">
        <div class="book-loading-box"  v-for="(item, index) in lines" :key="index">
            <div class="book-loading-item"  v-for="(subItem, subIndex) in item" :key="subIndex">
                <div class="book-loading-line" ref="line"></div>
            </div>
        </div>
        <div class="book-loading-center"></div>
    </div>
</template>

<script>
    import { px2rem } from '../../utils/utils'

    export default {
        data () {
            return {
                lines: [
                    [{}, {}, {}],
                    [{}, {}, {}]
                ],
                lineWidth: [
                    { width: 18 },
                    { width: 18 },
                    { width: 18 },
                    { width: 18 },
                    { width: 18 },
                    { width: 18 }
                ],
                toggle: true
            }
        },
        mounted () {
            this.task = setInterval(() => {
                this.$refs.line.forEach((item, index) => {
                    const line = this.$refs.line[index]
                    const lineWidth = this.lineWidth[index]
                    if (index === 0) {
                        if (this.toggle && lineWidth.width > -1) {
                            lineWidth.width--
                        } else if (lineWidth.width < 19) {
                            lineWidth.width++
                        }
                    } else {
                        const preLine = this.lineWidth[index - 1]
                        if (this.toggle && preLine.width <= 9 && lineWidth.width > -1) {
                            lineWidth.width--
                        }
                        if (!this.toggle && preLine.width >= 9 && lineWidth.width < 19) {
                            lineWidth.width++
                        }
                    }
                    line.style.width = `${px2rem(lineWidth.width)}rem`
                    line.style.flex = `0 0 ${px2rem(lineWidth.width)}rem`
                    if (index === this.lineWidth.length - 1) {
                        if (lineWidth.width === 0) {
                            this.toggle = false
                        }
                        if (lineWidth.width === 18) {
                            this.toggle = true
                        }
                    }
                })
            }, 10)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
    .book-loading-wrapper {
        position: relative;
        z-index: 400;
        width: px2rem(62);
        height: px2rem(40);
        background: transparent;
        display: flex;
        border-radius: px2rem(4);
        border: px2rem(2) solid #d7d7d7;
        .book-loading-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: px2rem(5);
            box-sizing: border-box;
            .book-loading-item {
                padding: px2rem(4) 0;
                box-sizing: border-box;
                @include left;
                flex: 1;
                .book-loading-line {
                    flex: 0 0 px2rem(18);
                    width: px2rem(18);
                    border: px2rem(1) solid #d7d7d7;
                }
            }
        }
        .book-loading-center {
            position: absolute;
            height: 100%;
            border: px2rem(1) solid #d7d7d7;
            left: 50%;
            top: 0;
            margin-left: px2rem(-1);
        }
    }
</style>
