<template>
    <div class="shelf-footer-wrapper" v-show="isEditMode">
        <div class="shelf-footer-tab-wrapper">
            <div class="shelf-footer-tab-item"
                 v-for="item in tab"
                 :key="item.id"
                 :class="{ 'selected' : isSelected }"
                 @click="clickTab(item)"
            >
                <div class="shelf-footer-tab-icon">
                    <span class="icon-private" v-if="item.id === 1 && !isPrivate"></span>
                    <span class="icon-private-see" v-if="item.id === 1 && isPrivate"></span>
                    <span class="icon-download" v-if="item.id === 2 && !isDownload"></span>
                    <span class="icon-download-remove" v-if="item.id === 2 && isDownload"></span>
                    <span class="icon-move" v-if="item.id === 3"></span>
                    <span class="icon-shelf" v-if="item.id === 4"></span>
                </div>
                <div class="shelf-footer-tab-text" :class="{ 'remove-shelf' : item.id === 4}">{{label(item)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { shelfMixin } from '../../utils/mixin'
    import { setBookShelf, deleteLocalStorage } from '../../utils/localStorage'
    import { download } from '../../api/store'
    import { removeLocalForage } from '../../utils/localForage'

    export default {
        mixins: [shelfMixin],
        computed: {
            isSelected () {
                return this.shelfSelected && this.shelfSelected.length > 0
            },
            isPrivate () {
                if (!this.shelfSelected) {
                    return false
                } else {
                    return this.shelfSelected.every(item => item.private)
                }
            },
            isDownload () {
                if (!this.shelfSelected) {
                    return false
                } else {
                    return this.shelfSelected.every(item => item.cache)
                }
            }
        },
        data () {
            return {
                popupMenu: null,
                tab: [
                    {
                        id: 1,
                        label: this.$t('shelf.private'),
                        label2: this.$t('shelf.noPrivate')
                    },
                    {
                        id: 2,
                        label: this.$t('shelf.download'),
                        label2: this.$t('shelf.delete')
                    },
                    {
                        id: 3,
                        label: this.$t('shelf.move')
                    },
                    {
                        id: 4,
                        label: this.$t('shelf.remove')
                    }
                ]
            }
        },
        methods: {
            // 设置私密阅读
            setPrivate () {
                let isPrivate
                if (this.isPrivate) {
                    isPrivate = false
                } else {
                    isPrivate = true
                }
                this.shelfSelected.forEach(item => {
                    item.private = isPrivate
                })
                this.hidePopup()
                this.setIsEditMode(false)
                this.clearShelfSelected()
                setBookShelf(this.shelfList)
                const toast = this.toast()
                if (isPrivate) {
                    toast.show()
                    toast.updateCurrentText(this.$t('shelf.setPrivateSuccess'))
                } else {
                    toast.show()
                    toast.updateCurrentText(this.$t('shelf.closePrivateSuccess'))
                }
            },
            // 展示私密阅读菜单
            showPrivateRead () {
                this.popueMenu = this.popup({
                    title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
                    buttons: [
                        {
                            type: '',
                            text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
                            click: () => {
                                this.setPrivate()
                            }
                        },
                        {
                            type: '',
                            text: this.$t('shelf.cancel'),
                            click: () => {
                                this.hidePopup()
                            }
                        }
                    ]
                }).show()
            },
            // 隐藏弹窗
            hidePopup () {
                this.popueMenu.hide()
            },
            // 展示缓存菜单
            showDownload () {
                this.popueMenu = this.popup({
                    title: this.isDownload ? this.$t('shelf.removeDownloadTitle') : this.$t('shelf.setDownloadTitle'),
                    buttons: [
                        {
                            type: '',
                            text: this.isDownload ? this.$t('shelf.delete') : this.$t('shelf.open'),
                            click: () => {
                                this.setDownload()
                            }
                        },
                        {
                            type: '',
                            text: this.$t('shelf.cancel'),
                            click: () => {
                                this.hidePopup()
                            }
                        }
                    ]
                }).show()
            },
            // 删除选中图书缓存
            removerSelectedBook () {
                Promise.all(this.shelfSelected.map(book => this.removeBook(book))).then(books => {
                    books.map(book => {
                        book.cache = false
                    })
                    setBookShelf(this.shelfList)
                    const toast = this.toast({
                        text: this.$t('shelf.removeDownloadSuccess')
                    })
                    toast.show()
                    toast.updateCurrentText(this.$t('shelf.removeDownloadSuccess'))
                })
            },
            // 删除图书缓存
            removeBook (book) {
                return new Promise((resolve, reject) => {
                    removeLocalForage(`${book.fileName}`)
                    deleteLocalStorage(`${book.categoryText}/${book.fileName}-info`)
                    resolve(book)
                })
            },
            // 缓存选中图书
            async setDownload () {
                if (this.isDownload) {
                    this.removerSelectedBook()
                } else {
                    await this.downloadSelectBook() // 下载图书
                    this.toast({
                        text: this.$t('shelf.setDownloadSuccess')
                    }).show()
                }
                this.hidePopup()
                this.setIsEditMode(false)
                this.clearShelfSelected()
                setBookShelf(this.shelfList)
            },
            // 下载选中的图书
            async downloadSelectBook () {
                for (let i = 0; i < this.shelfSelected.length; i++) {
                    await this.downloadBook(this.shelfSelected[i]).then(book => {
                        book.cache = true
                    })
                }
            },
            // 下载图书
            downloadBook (book) {
                let text = ''
                const toast = this.toast({
                    text
                })
                toast.continueShow()
                return new Promise((resolve, reject) => {
                    download(book, book => {
                        // console.log('下载成功')
                        toast.remove()
                        resolve(book)
                    }, reject, res => {
                        const progress = Math.floor(res.loaded / res.total * 100) + '%'
                        text = this.$t('shelf.progressDownload').replace('$1', `${book.fileName}.epub(${progress})`)
                        toast.updateCurrentText(text)
                    })
                })
            },
            // 展示移出书架菜单
            showRemoveShelf () {
                let title
                if (this.shelfSelected.length === 1) {
                    title = this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
                } else {
                    title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
                }
                this.popueMenu = this.popup({
                    title,
                    buttons: [
                        {
                            type: 'danger',
                            text: this.$t('shelf.removeBook'),
                            click: () => {
                                this.removeShelfBook()
                            }
                        },
                        {
                            type: '',
                            text: this.$t('shelf.cancel'),
                            click: () => {
                                this.hidePopup()
                            }
                        }
                    ]
                }).show()
            },
            // 移出书架
            removeShelfBook () {
                this.shelfSelected.forEach(item => {
                    this.setShelfList(this.shelfList.filter(book => book !== item))
                })
                this.hidePopup()
                this.setIsEditMode(false)
                this.clearShelfSelected()
                setBookShelf(this.shelfList)
            },
            // 点击底部栏
            clickTab (item) {
                if (!this.isSelected) {
                    return
                }
                switch (item.id) {
                    case 1:
                        this.showPrivateRead()
                        break
                    case 2:
                        this.showDownload()
                        break
                    case 3:
                        this.dialog().show()
                        break
                    case 4:
                        this.showRemoveShelf()
                        break
                    default:
                        break
                }
            },
            label (item) {
                switch (item.id) {
                    case 1:
                        return this.isPrivate ? item.label2 : item.label
                    case 2:
                        return this.isDownload ? item.label2 : item.label
                    default:
                        return item.label
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/styles/global';
    .shelf-footer-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: px2rem(48);
        z-index: 130;
        background-color: #fff;
        box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
        .shelf-footer-tab-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            .shelf-footer-tab-item {
                flex: 1;
                width: 25%;
                height: 100%;
                @include columnCenter;
                text-align: center;
                opacity: .5;
                &.selected {
                    opacity: 1;
                }
                .shelf-footer-tab-icon {
                    font-size: px2rem(20);
                    color: #666;
                }
                .shelf-footer-tab-text {
                    font-size: px2rem(12);
                    line-height: px2rem(14);
                    color: #666;
                    &.remove-shelf {
                        color: $color-pink;
                    }
                }
                .icon-shelf {
                    color: $color-pink;
                }
            }
        }
    }
</style>
