<template>
    <div class="login">
        <div class="login-title-bar">
            <span class="icon-back" @click="back"></span>
            <span class="login-title">{{$t('user.login')}}</span>
        </div>
        <div class="login-body">
            <div class="login-input-wrapper">
                <span class="login-input-tip">{{$t('user.userName')}}</span>
                <input class="login-input-item"
                       :placeholder="$t('user.userNameTip')"
                       type="text"
                       v-model="userName"
                >
            </div>
            <div class="login-input-wrapper">
                <span class="login-input-tip">{{$t('user.password')}}</span>
                <input class="login-input-item"
                       :placeholder="$t('user.passwordTip')"
                       type="password"
                       v-model="password"
                >
            </div>
        </div>
        <div class="login-button-wrapper" @click="login">
            <div class="login-button">{{$t('user.login')}}</div>
        </div>
        <div class="register-enter" @click="goRegister">{{$t('user.register')}}</div>
    </div>
</template>

<script>
    import { login } from '../../api/user'
    import { userMixin } from '../../utils/mixin'
    import { setCurrentUser } from '../../utils/localStorage'

    export default {
        name: 'Login',
        data () {
            return {
                userName: '',
                password: ''
            }
        },
        mixins: [userMixin],
        methods: {
            login () {
                if (this.userName.length === 0 || this.userName === null) {
                    const toast = this.toast({
                        text: '用户名不能为空'
                    })
                    toast.updateCurrentText('用户名不能为空')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else if (this.password.length === 0 || this.password === null) {
                    const toast = this.toast({
                        text: '密码不能为空'
                    })
                    toast.updateCurrentText('密码不能为空')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else {
                    login(this.userName, this.password).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            const toast = this.toast({
                                text: data.msg
                            })
                            toast.updateCurrentText(data.msg)
                            this.$nextTick(() => {
                                toast.show()
                                const user = data.data
                                user.userImg = `${process.env.VUE_APP_RESOURCE_URL}${user.userImg}`
                                this.setUserInfo(user)
                                setCurrentUser(user)
                                this.setIsLogin(true)
                                setTimeout(() => {
                                    this.$router.push('/user/userCenter')
                                }, 400)
                            })
                        } else {
                            const toast = this.toast({
                                text: data.msg
                            })
                            toast.updateCurrentText(data.msg)
                            this.$nextTick(() => {
                                toast.show()
                            })
                        }
                    })
                }
            },
            goRegister () {
                this.$router.push('/user/register')
            },
            back () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .login {
        width: 100%;
        height: 100%;
        background: #fff;
        .login-title-bar {
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
            .login-title {
                font-size: px2rem(16);
                line-height: px2rem(18);
                color: #333;
                font-weight: bold;
            }
        }
        .login-body {
            width: 100%;
            padding: px2rem(20) px2rem(10);
            box-sizing: border-box;
            .login-input-wrapper {
                width: 100%;
                height: px2rem(45);
                display: flex;
                align-items: center;
                border-bottom: px2rem(1) solid #f4f4f4;
                .login-input-tip {
                    font-size: px2rem(14);
                    line-height: px2rem(18);
                    color: #999999;
                    flex: 0 0 px2rem(50);
                }
                .login-input-item {
                    margin-left: px2rem(5);
                    flex: 1;
                    background: transparent;
                    border: 0;
                    width: 100%;
                    &:focus {
                        outline: none;
                    }
                }
            }
        }
        .login-button-wrapper {
            width: 100%;
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
            .login-button {
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
        .register-enter {
            margin-top: px2rem(10);
            color: #409EFF;
            font-size: px2rem(12);
            line-height: px2rem(14);
            text-align: center;
        }
    }
</style>
