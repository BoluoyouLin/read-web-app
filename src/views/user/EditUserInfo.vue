<template>
    <div class="edit-user-info">
        <div class="edit-user-info-title-bar">
            <span class="icon-back" @click="back"></span>
            <span class="edit-user-info-title">{{$t('user.editUserInfo')}}</span>
        </div>
        <div class="edit-user-info-body">
            <div class="edit-user-info-input-wrapper user-img-item">
                <span class="edit-user-info-input-tip">{{$t('user.userImg')}}</span>
                <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
                       class="header-upload-btn">
                <img :src="userImg"
                     class="user-img"
                >
            </div>
            <div class="edit-user-info-input-wrapper">
                <span class="edit-user-info-input-tip">{{$t('user.userName')}}</span>
                <input class="edit-user-info-input-item"
                       :placeholder="$t('user.userNameTip')"
                       type="text"
                       v-model="userName"
                >
            </div>
            <div class="edit-user-info-input-wrapper">
                <span class="edit-user-info-input-tip">{{$t('user.introduce')}}</span>
                <input class="edit-user-info-input-item"
                       :placeholder="$t('user.introduceTip')"
                       type="text"
                       v-model="introduce"
                >
            </div>
        </div>
        <div class="edit-user-info-button-wrapper">
            <div class="edit-user-info-button" @click="editUserInfo">{{$t('user.confirm')}}</div>
        </div>
    </div>
</template>

<script>
    import { userMixin } from '../../utils/mixin'
    import { saveUserImg, editUserInfo } from '../../api/user'

    export default {
        name: 'EditUserInfo',
        mixins: [userMixin],
        data () {
            return {
                userName: '',
                userImg: '',
                baseUserImg: '',
                introduce: ''
            }
        },
        methods: {
            // 编辑用户信息
            editUserInfo () {
                if (this.userName.length === 0 || this.userName === null) {
                    const toast = this.toast({
                        text: '用户名不能为空'
                    })
                    toast.updateCurrentText('用户名不能为空')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else {
                    const userInfo = {
                        id: this.userInfo.id,
                        userName: this.userName,
                        userImg: this.baseUserImg,
                        introduce: this.introduce
                    }
                    editUserInfo(userInfo).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            this.setUserInfo(userInfo)
                        }
                        const toast = this.toast({
                            text: data.msg
                        })
                        toast.updateCurrentText(data.msg)
                        this.$nextTick(() => {
                            toast.show()
                        })
                    })
                }
            },
            back () {
                this.$router.go(-1)
            },
            onchangeImgFun (e) {
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                const _this = this
                reader.onload = function () {
                    saveUserImg(reader.result).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            _this.userImg = `${process.env.VUE_APP_RESOURCE_URL}${data.data}`
                            _this.baseUserImg = `${data.data}`
                        }
                        const toast = _this.toast({
                            text: data.msg
                        })
                        toast.updateCurrentText(data.msg)
                        _this.$nextTick(() => {
                            toast.show()
                        })
                    })
                }
            }
        },
        mounted () {
            this.userName = this.userInfo.userName
            this.userImg = this.userInfo.userImg === '' ? this.noUserImg : this.userInfo.userImg
            this.introduce = this.userInfo.introduce
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .edit-user-info {
        width: 100%;
        height: 100%;
        background: #fff;
        .edit-user-info-title-bar {
            width: 100%;
            height: px2rem(40);
            background-color: #fff;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(16);
            line-height: px2rem(18);
            @include center
            .icon-back {
                position: absolute;
                left: px2rem(10);
            }
            .edit-user-info-title {
                font-size: px2rem(16);
                line-height: px2rem(18);
                color: #333;
                font-weight: bold;
            }
        }
        .edit-user-info-body {
            width: 100%;
            padding: px2rem(20) px2rem(10);
            box-sizing: border-box;
            .edit-user-info-input-wrapper {
                width: 100%;
                height: px2rem(45);
                display: flex;
                align-items: center;
                border-bottom: px2rem(1) solid #f4f4f4;
                position: relative;
                &.user-img-item {
                    height: px2rem(65);
                }
                .header-upload-btn {
                    position: absolute;
                    top: px2rem(20);
                    left: px2rem(30);
                    opacity: 0;
                }
                .edit-user-info-input-tip {
                    font-size: px2rem(14);
                    line-height: px2rem(18);
                    color: #999999;
                    flex: 0 0 px2rem(70);
                }
                .edit-user-info-input-item {
                    margin-left: px2rem(5);
                    flex: 1;
                    background: transparent;
                    border: 0;
                    width: 100%;
                    &:focus {
                        outline: none;
                    }
                }
                .user-img {
                    width: px2rem(55);
                    height: px2rem(55);
                    border-radius: 50%;
                }
            }
        }
        .edit-user-info-button-wrapper {
            width: 100%;
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
            .edit-user-info-button {
                font-size: px2rem(12);
                line-height: px2rem(14);
                color: #fff;
                @include center;
                background: #409EFF;
                height: px2rem(40);
                width: 100%;
                border-radius: px2rem(10);
            }
        }
    }
</style>
