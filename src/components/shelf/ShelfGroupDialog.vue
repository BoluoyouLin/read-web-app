<template>
    <book-dialog :title="title" ref="dialog">
        <div class="dialog-list-wrapper" v-if="!ifNewGroup">
            <div class="dialog-list-item"
                 :class="{'is-add': item.edit  ? item.edit === 1 : false}"
                 v-for="(item, index) in categoryList"
                 :key="index"
                 @click="onGroupClick(item)"
            >
                <div class="dialog-list-item-text">{{item.title}}</div>
                <div class="dialog-list-icon-wrapper" v-if="shelfDirectory.id === item.id && isInGroup">
                    <span class="icon-check"></span>
                </div>
            </div>
        </div>
        <div class="dialog-new-group-wrapper" v-else>
            <div class="dialog-input-title-wrapper">
                <span class="dialog-input-title">{{$t('shelf.groupName')}}</span>
            </div>
            <div class="dialog-input-wrapper">
                <div class="dialog-input-inner-wrapper">
                    <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput">
                    <div class="dialog-input-clear-wrapper" @click="clear" v-show="newGroupName && newGroupName.length > 0">
                        <span class="icon-close-circle-fill"></span>
                    </div>
                </div>
            </div>
        </div>
        <div slot="btn" class="group-dialog-btn-wrapper">
            <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
            <div class="dialog-btn" @click="createNewGroup" :class="{'is-empty': newGroupName && newGroupName.length === 0}"
                 v-if="ifNewGroup">{{$t('shelf.confirm')}}
            </div>
        </div>
    </book-dialog>
</template>

<script>
    import BookDialog from '../common/Dialog'
    import { shelfMixin } from '../../utils/mixin'
    import { getCurrentUser } from '../../utils/localStorage'
    import { addNewDirectory, changeDirectoryTitle, moveBookToDirectory } from '../../api/shelf'

    export default {
        name: 'shelf-group-dialog',
        mixins: [shelfMixin],
        props: {
            showNewGroup: {
                type: Boolean,
                default: false
            },
            groupName: String
        },
        components: {
            BookDialog
        },
        computed: {
            isInGroup () {
                return this.currentType === 2
            },
            defaultCategory () {
                return [
                    {
                        title: this.$t('shelf.newGroup'),
                        edit: 1
                    },
                    {
                        title: this.$t('shelf.groupOut'),
                        edit: 2
                    }
                ]
            },
            category () {
                if (this.shelfList) {
                    return this.shelfList.filter(item => item.type === 2)
                }
                return []
            },
            categoryList () {
                const list = [...this.defaultCategory, ...this.category]
                return list.filter(item => (item.edit === 2 && this.isInGroup) || item.edit !== 2 || !item.edit)
            },
            title () {
                return !this.ifNewGroup ? this.$t('shelf.moveBook') : this.$t('shelf.newGroup')
            }
        },
        data () {
            return {
                ifNewGroup: false,
                newGroupName: ''
            }
        },
        methods: {
            show () {
                this.ifNewGroup = this.showNewGroup
                this.newGroupName = this.groupName
                this.$refs.dialog.show()
            },
            hide () {
                this.$refs.dialog.hide()
                setTimeout(() => {
                    this.ifNewGroup = false
                }, 200)
            },
            onGroupClick (item) {
                if (item.edit && item.edit === 1) {
                    this.ifNewGroup = true
                } else if (item.edit && item.edit === 2) {
                    this.moveOutFromGroup(item)
                } else {
                    this.moveToGroup(item.id, item.title)
                }
            },
            clear () {
                this.newGroupName = ''
            },
            // 将图书移入指定文件夹
            moveToGroup (directoryId, title) {
                const promiseList = []
                this.shelfSelected.forEach(book => {
                    promiseList.push(moveBookToDirectory(directoryId, book.shelfId))
                })
                Promise.all(promiseList).then(() => {
                    this.setShelfList(this.getShelfList())
                    this.toast({
                        text: this.$t('shelf.moveBookInSuccess').replace('$1', title)
                    }).show()
                    this.onComplete()
                })
                // this.setShelfList(this.shelfList
                //     .filter(book => {
                //         if (book.itemList) {
                //             book.itemList = book.itemList.filter(item => this.shelfSelected.indexOf(item) < 0)
                //         }
                //         return this.shelfSelected.indexOf(book) < 0
                //     }))
                //     .then(() => {
                //         if (group && group.itemList) {
                //             group.itemList = [...group.itemList, ...this.shelfSelected]
                //         }
                //         group.itemList.forEach((item, index) => {
                //             item.id = index + 1
                //         })
                //         this.toast({
                //             text: this.$t('shelf.moveBookInSuccess').replace('$1', group.title)
                //         }).show()
                //         this.onComplete()
                //     })
            },
            // 将图书移出文件夹
            moveOutFromGroup () {
                this.moveOutGroup(this.onComplete)
            },
            // 新建文件夹
            createNewGroup () {
                if (!this.newGroupName || this.newGroupName.length === 0) {
                    return
                }
                if (this.showNewGroup) {
                    // 修改文件夹名
                    this.shelfDirectory.title = this.newGroupName
                    changeDirectoryTitle(this.newGroupName, this.shelfDirectory.id)
                    this.onComplete()
                } else {
                    // 新建文件夹
                    const userId = getCurrentUser().id
                    addNewDirectory(this.newGroupName, userId).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            this.moveToGroup(data.data.insertId, this.newGroupName)
                        }
                    })
                    // const group = {
                    //   id: this.shelfList[this.shelfList.length - 2].id + 1,
                    //   itemList: [],
                    //   selected: false,
                    //   title: this.newGroupName,
                    //   type: 2
                    // }
                    // let list = removeToShelf(this.shelfList)
                    // list.push(group)
                    // list = addToShelf(list)
                    // this.setShelfList(list).then(() => {
                    //   this.moveToGroup(group)
                    // })
                }
            },
            onComplete () {
                this.hide()
                this.clearShelfSelected()
                this.setIsEditMode(false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";

    .dialog-list-wrapper {
        width: 100%;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        font-size: px2rem(14);
        @include scroll;
        .dialog-list-item {
            display: flex;
            padding: px2rem(15) 0;
            box-sizing: border-box;
            color: #666;
            &.is-add {
                color: $color-blue;
                &:active {
                    color: $color-blue-transparent;
                }
            }
            &:active {
                color: rgba(102, 102, 102, .5)
            }
            .dialog-list-item-text {
                flex: 1;
            }
            .dialog-list-icon-wrapper {
                flex: 0 0 px2rem(30);
                color: $color-blue;
                @include right;
            }
        }
    }

    .dialog-new-group-wrapper {
        width: 100%;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        .dialog-input-title-wrapper {
            font-size: px2rem(10);
            margin-top: px2rem(20);
        }
        .dialog-input-wrapper {
            width: 100%;
            padding: 0 0 px2rem(30) 0;
            box-sizing: border-box;
            .dialog-input-inner-wrapper {
                display: flex;
                width: 100%;
                padding: px2rem(10) 0;
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #eee;
                font-size: px2rem(14);
                color: #666;
                .dialog-input {
                    flex: 1;
                    border: none;
                    &:focus {
                        outline: none;
                    }
                }
                .dialog-input-clear-wrapper {
                    flex: 0 0 px2rem(30);
                    color: #ccc;
                    @include center;
                    &:active {
                        color: #999;
                    }
                }
            }
        }
    }

    .group-dialog-btn-wrapper {
        width: 100%;
        @include center;
    }
    .dialog-btn {
        flex: 1;
        &.is-empty {
            color: rgba(255, 255, 255, .5);
        }
        &:active {
            color: rgba(255, 255, 255, .5)
        }
    }
</style>
