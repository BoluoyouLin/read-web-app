<template>
    <div class="user-center">
        <div class="user-center-title-bar">
            <span class="icon-back" @click="back"></span>
            <span class="user-center-title">{{$t('user.userCenter')}}</span>
        </div>
        <div class="user-center-user-info">
            <img :src="userInfo.userImg === '' ? noUserImg : userInfo.userImg"
                 class="user-img"
            />
            <div class="user-name">{{userInfo.userName}}</div>
            <div class="user-info-button">
                <span v-if="isLogin" class="edit-user-info-btn" @click="goEditUserInfo">{{$t('user.editUserInfo')}}</span>
                <span v-else  @click="goLogin">{{$t('user.clickLogin')}}</span>
            </div>
        </div>
        <div class="recent-read">
            <div class="recent-read-title">{{$t('user.recentRead')}}</div>
            <div class="recent-read-books" v-if="this.recentBooks.length > 0">
                <div class="recent-read-book" v-for="book in recentBooks" :key="book.id" @click="goBookDetail(book)">
                    <img :src="book.cover"
                         class="book-cover"
                    />
                    <div class="book-title">{{book.title}}</div>
                </div>
            </div>
            <no-data v-else :text="$t('user.noRecentBooks')"></no-data>
            <div class="recent-read-see-shelf" @click="goShelf">{{$t('user.viewShelf')}}</div>
            <div class="logout-button-wrapper" v-show="isLogin">
                <div class="logout-button" @click="logout">{{$t('user.logout')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { userMixin } from '../../utils/mixin'
    import { deleteCurrentUser, getCurrentUser } from '../../utils/localStorage'
    import { getUserReadRecords } from '../../api/user'
    import NoData from '../../components/common/NoData'

    export default {
        name: 'UserCenter',
        mixins: [userMixin],
        components: {
            NoData
        },
        methods: {
            // 查看图书详情
            goBookDetail (book) {
                this.$router.push({
                    path: '/bookMall/detail',
                    query: {
                        fileName: book.fileName,
                        categoryText: book.categoryText
                    }
                })
            },
            back () {
                this.$router.push('/bookMall')
            },
            // 获取用户最近阅读记录
            getRecentBook () {
                const currentUser = getCurrentUser()
                if (currentUser) {
                    const userId = currentUser.id
                    getUserReadRecords(userId).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            this.setRecentBooks(data.data)
                        }
                    })
                }
            },
            goShelf () {
                this.$router.push('/shelf')
            },
            goLogin () {
                this.$router.push('/user/login')
            },
            goEditUserInfo () {
                this.$router.push('/user/editUserInfo')
            },
            logout () {
                deleteCurrentUser()
                this.setIsLogin(false)
                this.setUserInfo({ userImg: this.noUserImg })
            }
        },
        created () {
            const currentUser = getCurrentUser()
            if (currentUser) {
                this.setUserInfo(currentUser)
                this.setIsLogin(true)
            } else {
                this.userImg = this.noUserImg
                this.setIsLogin(false)
                this.setUserInfo({ userImg: this.noUserImg })
            }
            this.getRecentBook()
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .user-center {
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        .user-center-title-bar {
            background-color: #fff;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(16);
            line-height: px2rem(18);
            @include center;
            .user-center-title {
                font-size: px2rem(16);
                line-height: px2rem(18);
                color: #333;
                font-weight: bold;
            }
            .icon-back {
                position: absolute;
                left: px2rem(10);
            }
        }
        .user-center-user-info {
            width: 100%;
            background-color: #fff;
            @include columnCenter;
            padding: px2rem(35) px2rem(25);
            box-sizing: border-box;
            .user-img {
                width: px2rem(60);
                height: px2rem(60);
                border-radius: 50%;
                border: px2rem(1) solid #eeeeee;
                margin-bottom: px2rem(15);
            }
            .user-name {
                font-size: px2rem(18);
                color: #333;
                font-weight: bold;
                margin-bottom: px2rem(15);
            }
            .user-info-button {
                font-size: px2rem(14);
                color: #999999;
                .edit-user-info-btn {
                    color: #409EFF;
                }
            }
        }
        .recent-read {
            background: #fff;
            margin-top: px2rem(10);
            width: 100%;
            .recent-read-title {
                font-size: px2rem(12);
                line-height: px2rem(14);
                color: #999999;
                font-weight: bold;
                border-bottom: px2rem(1) solid #f4f4f4;
                width: 100%;
                height: px2rem(40);
                @include left;
                padding: 0 px2rem(15);
            }
            .recent-read-books {
                width: 100%;
                padding: px2rem(10);
                box-sizing: border-box;
                border-bottom: px2rem(1) solid #f4f4f4;
                display: flex;
                padding: px2rem(10) px2rem(5);
                .recent-read-book {
                    width: 25%;
                    flex: 0 0 25%;
                    padding: 0 px2rem(5);
                    box-sizing: border-box;
                    .book-cover {
                        width: 100%;
                    }
                    .book-title {
                        font-size: px2rem(12);
                        @include ellipsis2(2);
                        color: #333;
                    }
                }
            }
            .recent-read-see-shelf {
                font-size: px2rem(12);
                color: #409EFF;
                @include center;
                width: 100%;
                height: px2rem(40);
                border-bottom: px2rem(1) solid #f4f4f4;
            }
        }
        .logout-button-wrapper {
            margin-top: px2rem(10);
            width: 100%;
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
            .logout-button {
                width: 100%;
                height: px2rem(40);
                @include center;
                background: orangered;
                color: #fff;
                font-size: px2rem(14);
                border-radius: px2rem(10);
            }
        }
    }
</style>
