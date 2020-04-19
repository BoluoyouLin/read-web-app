<template>
    <transition name="hide-title">
        <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow' : isHideShadow}">
            <div class="shelf-title-text-wrapper">
                <span class="shelf-title-text">{{title}}</span>
                <span class="shelf-title-sub-text" v-show="isEditMode">{{selectText}}</span>
            </div>
            <div class="shelf-title-button-wrapper button-left" v-show="showClear">
                <span class="button-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
            </div>
            <div class="shelf-title-button-wrapper button-right" v-show="showEdit">
                <span class="button-text"  @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
            </div>
            <div class="shelf-title-button-wrapper button-left back" v-if="showBack">
                <span class="icon-back" @click="back"></span>
            </div>
            <div class="shelf-title-button-wrapper" :class="{'button-left' : changeGroupLeft,
            'button-right' : changeGroupRight }" @click="changeGroup" v-if="showChangeGroup"
            >
                <span class="button-text">{{$t('shelf.editGroup')}}</span>
            </div>
        </div>
    </transition>
</template>

<script>
    import { shelfMixin } from '../../utils/mixin'
    import { clearLocalForage } from '../../utils/localForage'
    import { clearLocalStorage, setBookShelf } from '../../utils/localStorage'

    export default {
        mixins: [shelfMixin],
        props: {
            title: String
        },
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
            },
            showBack () {
                return this.currentType === 2 && !this.isEditMode
            },
            showChangeGroup () {
                return this.currentType === 2 && (this.isEditMode || this.isEmpty)
            },
            showClear () {
                return this.currentType === 1
            },
            showEdit () {
                return this.currentType === 1 || !this.isEmpty
            },
            isEmpty () {
                return !this.shelfDirectory || !this.shelfDirectory.itemList || this.shelfDirectory.itemList.length === 0
            },
            changeGroupLeft () {
                return !this.isEmpty
            },
            changeGroupRight () {
                return this.isEmpty
            },
            popupCancelButton () {
                return this.createPopupButton(this.$t('shelf.cancel'), () => {
                    this.hidePopup()
                })
            }
        },
        data () {
            return {
                isHideShadow: true
            }
        },
        methods: {
            hidePopup () {
                this.popupMenu.hide()
            },
            createPopupButton (text, click, type = 'normal') {
                return {
                    text,
                    type,
                    click
                }
            },
            changeGroup () {
                this.popupMenu = this.popup({
                    buttons: [
                        this.createPopupButton(this.$t('shelf.editGroupName'), () => {
                            this.changeGroupName()
                        }),
                        this.createPopupButton(this.$t('shelf.deleteGroup'), () => {
                            this.showDeleteGroup()
                        }, 'danger'),
                        this.popupCancelButton
                    ]
                })
                this.popupMenu.show()
            },
            changeGroupName () {
                this.hidePopup()
                this.dialog({
                    showNewGroup: true,
                    groupName: this.shelfDirectory.title
                }).show()
            },
            showDeleteGroup () {
                this.hidePopup()
                setTimeout(() => {
                    this.popupMenu = this.popup({
                        title: this.$t('shelf.deleteGroupTitle'),
                        buttons: [
                            this.createPopupButton(this.$t('shelf.confirm'), () => {
                                this.deleteGroup()
                            }, 'danger'),
                            this.popupCancelButton
                        ]
                    }).show()
                }, 200)
            },
            deleteGroup () {
                if (!this.isEmpty) {
                    this.setShelfSelected(this.shelfDirectory.itemList)
                    this.moveOutGroup(this.onComplete)
                } else {
                    this.onComplete()
                }
            },
            onComplete () {
                this.hidePopup()
                this.setShelfList(this.shelfList.filter(item => item.id !== this.shelfDirectory.id))
                .then(() => {
                    setBookShelf(this.shelfList)
                    this.$router.go(-1)
                    this.setIsEditMode(false)
                })
            },
            back () {
                this.$router.go(-1)
                this.setIsEditMode(false)
            },
            onEditClick () {
                this.setIsEditMode(!this.isEditMode)
                if (!this.isEditMode) {
                    this.clearShelfSelected()
                }
            },
            // 清除缓存
            clearCache () {
                clearLocalForage()
                clearLocalStorage()
                this.setShelfList([])
                this.setShelfSelected([])
                this.getShelfList()
                this.toast({
                    text: this.$t('shelf.clearCacheSuccess')
                }).show()
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
            &.back {
                font-size: px2rem(20);
                color: #ccc;
            }
        }
    }
</style>
