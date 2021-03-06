<template>
    <transition name="slide-up">
        <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
            <div class="setting-progress">
                <div class="progress-wrapper">
                    <div class="icon-wrapper">
                        <span class="icon-back" @click="lastSection"></span>
                    </div>
                    <input class="progress" type="range"
                           max="100"
                           min="0"
                           step="1"
                           @change="onProgressChange($event.target.value)"
                           @input="onProgressInput($event.target.value)"
                           :value="progress"
                           :disabled="!bookAvailable"
                           ref="progress"/>
                    <div class="icon-wrapper">
                        <span class="icon-forward" @click="nextSection"></span>
                    </div>
                </div>
                <div class="text-wrapper">
                    <span class="section-name">{{getSectionName}}</span>
                    <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { bookMixin } from '../../utils/mixin'

    export default {
        mixins: [bookMixin],
        methods: {
            onProgressChange (value) {
                this.setProgress(value).then(() => {
                    this.changePage()
                })
            },
            onProgressInput (value) {
                this.setProgress(value).then(() => {
                    this.changeProgressColor()
                })
            },
            changePage () {
                const epubCFI = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
                this.display(epubCFI).then(() => {
                    this.updateProgress()
                })
            },
            changeProgressColor () {
                this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
            },
            lastSection () {
                if (this.section > 0 && this.bookAvailable) {
                    this.setSection(this.section - 1).then(() => {
                        this.updatePage()
                    })
                }
            },
            nextSection () {
                if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
                    this.setSection(this.section + 1).then(() => {
                        this.updatePage()
                    })
                }
            },
            updatePage () {
                const sectionObj = this.currentBook.section(this.section)
                if (sectionObj && sectionObj.href) {
                    this.display(sectionObj.href).then(() => {
                        this.updateProgress()
                    })
                }
            }
        },
        updated () {
            this.changeProgressColor()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/global.scss';
    .setting-wrapper {
        height: px2rem(90);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        position: absolute;
        bottom: px2rem(48);
        left: 0;
        z-index: 160;
        width: 100%;
        .setting-progress {
            position: relative;
            width: 100%;
            height: 100%;
            .progress-wrapper {
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(30);
                box-sizing: border-box;
                .progress {
                    margin: 0 px2rem(15);
                    width: 100%;
                    -webkit-appearance: none;
                    height: px2rem(2);
                    &:focus {
                        outline: none;
                    }
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: px2rem(20);
                        width: px2rem(20);
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                        border: px2rem(1) solid #ddd;
                    }
                }
                .icon-wrapper {
                    font-size: px2rem(16)
                }
            }
            .text-wrapper {
                position: absolute;
                left: 0;
                width: 100%;
                color: #333;
                font-size: px2rem(12);
                bottom: px2rem(10);
                padding: 0 px2rem(20);
                box-sizing: border-box;
                @include center;
                .section-name {
                    @include ellipsis
                }
            }
        }
    }
</style>
