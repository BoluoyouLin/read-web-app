<template>
    <div class="flip-card-background" v-show="flipCardVisible">
        <div class="flip-card" :class="{'animation' : flipCardAnimation}">
            <div class="flip-card-wrapper"
                 v-for="(item, index) in flipCardList"
                 :key="index"
            >
                <div class="flip-card-circle" :style="{ zIndex : item.zIndex }">
                    <div class="circle circle-left"
                         :style="circleStyle(item, 'left')"
                         ref="leftCircle"
                    ></div>
                    <div class="circle circle-right"
                         :style="circleStyle(item, 'right')"
                         ref="rightCircle"
                    ></div>
                </div>
            </div>
            <div class="small-ball-wrapper">
                <div class="small-ball"
                     v-for="item in smallBallList"
                     :key="item"
                     :class="{'animation' : runSmallBallAnimation}"
                ></div>
            </div>
        </div>
        <div class="book-card"></div>
        <div class="close-icon-wrapper">
            <span class="icon-close"
                  @click="hideFlipCard"
            ></span>
        </div>
    </div>
</template>

<script>
    import { bookMallHomeMixin } from '../../utils/mixin'
    import { flipCardList } from '../../utils/bookMall'

    export default {
        mixins: [bookMallHomeMixin],
        props: {
            data: Object
        },
        data () {
            return {
                flipCardList,
                frontIndex: 0,
                backIndex: 1,
                flipCardAnimation: false,
                smallBallList: null,
                smallBallListLength: 18,
                runSmallBallAnimation: false
            }
        },
        watch: {
            flipCardVisible (value) {
                if (value) {
                    this.flipCardAnimation = true
                    setTimeout(() => {
                        this.createFlipCardAnimation()
                        this.startSmallBallAnimation()
                    }, 300)
                }
            }
        },
        methods: {
            // 隐藏翻转卡片
            hideFlipCard () {
                this.setFlipCardVisible(false)
                this.stopFlipCardAnimation()
            },
            // 绑定半圆样式
            circleStyle (item, simple) {
                return {
                    backgroundImage: simple === 'left' ? item.imgLeft : item.imgRight,
                    backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
                    backgroundSize: item.backgroundSize
                }
            },
            // 转动半圆
            rotateCircle (index, type) {
                const item = this.flipCardList[index]
                let dom
                if (type === 'front') {
                    dom = this.$refs.rightCircle[index]
                } else {
                    dom = this.$refs.leftCircle[index]
                }
                dom.style.transform = `rotateY(${item.rotateDegree}deg)`
                dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
            },
            // 卡片翻转
            flipCardRotate () {
                const front = this.flipCardList[this.frontIndex]
                const back = this.flipCardList[this.backIndex]
                front.rotateDegree += 10
                front._g -= 5
                back.rotateDegree -= 10
                back._g += 5
                if (front.rotateDegree === 90 && back.rotateDegree === 90) {
                    back.zIndex += 2
                }
                this.rotateCircle(this.frontIndex, 'front')
                this.rotateCircle(this.backIndex, 'back')
                if (front.rotateDegree === 180 && back.rotateDegree === 0) {
                    this.nextFlipCardAnimation()
                }
            },
            // 背面卡片动画状态初始化
            backPrepare () {
                const back = this.flipCardList[this.backIndex]
                back.rotateDegree = 180
                back._g = back.g - 5 * 18
                this.rotateCircle(this.backIndex, 'back')
            },
            // 创建卡片翻转动画
            createFlipCardAnimation () {
                this.backPrepare()
                this.task = setInterval(() => {
                    this.flipCardRotate()
                }, 30)
                setTimeout(() => {
                    this.stopFlipCardAnimation()
                }, 2500)
            },
            // 下一次动画
            nextFlipCardAnimation () {
                const front = this.flipCardList[this.frontIndex]
                const back = this.flipCardList[this.backIndex]
                front._g = front.g
                back._g = back.g
                front.rotateDegree = 0
                back.rotateDegree = 0
                this.rotateCircle(this.frontIndex, 'front')
                this.rotateCircle(this.backIndex, 'back')
                this.frontIndex++
                this.backIndex++
                const length = this.flipCardList.length
                if (this.frontIndex >= length) {
                    this.frontIndex = 0
                }
                if (this.backIndex >= length) {
                    this.backIndex = 0
                }
                // 改变zIndex
                // 100 -> 96
                // 99 -> 100
                // 98 -> 97
                // 97 -> 96
                // 96 -> 97
                this.flipCardList.forEach((item, index) => {
                    item.zIndex = 100 - ((index - this.frontIndex + length) % length)
                })
                this.backPrepare()
            },
            // 停止翻转动画
            stopFlipCardAnimation () {
                this.flipCardAnimation = false
                if (this.task) {
                    clearInterval(this.task)
                }
                this.resetFlipCard()
            },
            // 重置翻转卡片
            resetFlipCard () {
                this.flipCardList.forEach((item, index) => {
                    item._g = item.g
                    item.rotateDegree = 0
                    this.rotateCircle(index, 'front')
                    this.rotateCircle(index, 'back')
                    item.zIndex = 100 - index
                })
            },
            startSmallBallAnimation () {
                this.runSmallBallAnimation = true
                setTimeout(() => {
                    this.runSmallBallAnimation = false
                }, 750)
            }
        },
        created () {
            this.smallBallList = []
            for (let i = 0; i < this.smallBallListLength; i++) {
                this.smallBallList.push(`smallBall${i}`)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "src/assets/styles/global.scss";
    @import "src/assets/styles/smallBall.scss";
    .flip-card-background {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 900;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        .flip-card {
            @include absoluteCenter;
            background-color: #fff;
            width: px2rem(60);
            height: px2rem(60);
            border-radius: px2rem(10);
            transform: scale(0);
            opacity: 0;
            &.animation {
                animation: flip-card-in .3s ease-in both;
            }
            @keyframes flip-card-in {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                25% {
                    transform: scale(1.3);
                    opacity: 1;
                }
                50% {
                    transform: scale(.8);
                    opacity: 1;
                }
                75% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .flip-card-wrapper {
                .flip-card-circle {
                    height: px2rem(40);
                    width: px2rem(40);
                    @include absoluteCenter;
                    display: flex;
                    .circle {
                        height: 100%;
                        width: 50%;
                        background-repeat: no-repeat;
                        backface-visibility: hidden;
                    }
                    .circle-left {
                        border-radius: px2rem(20) 0 0 px2rem(20);
                        background-position: center right;
                        transform-origin: right;
                    }
                    .circle-right {
                        border-radius: 0 px2rem(20) px2rem(20) 0;
                        background-position: center left;
                        transform-origin: left;
                    }
                }
            }
            .small-ball-wrapper {
                @include absoluteCenter;
                z-index: 1200;
                .small-ball {
                    border-radius: 50%;
                    @include absoluteCenter;
                    &.animation {
                        @for $i from 1 to length($moves) {
                            &:nth-child(#{$i}) {
                                @include move($i)
                            }
                        }
                    }
                }
            }
        }
        .close-icon-wrapper {
            position: absolute;
            left: 50%;
            bottom: 10%;
            margin-left: px2rem(-25);
            width: px2rem(50);
            height: px2rem(50);
            border-radius: 50%;
            background-color: rgba(0, 0, 0, .6);
            color: #fff;
            font-size: px2rem(24);
            z-index: 1000;
            @include center;
            cursor: pointer;
        }
    }
</style>
