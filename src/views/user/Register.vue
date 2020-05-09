<template>
    <div class="register">
        <div class="register-title-bar">
            <span class="icon-back" @click="back"></span>
            <span class="register-title">{{$t('user.register')}}</span>
        </div>
        <div class="register-body">
            <div class="register-input-wrapper">
                <span class="register-input-tip">{{$t('user.userName')}}</span>
                <input class="register-input-item"
                       :placeholder="$t('user.userNameTip')"
                       type="text"
                       v-model="userName"
                >
            </div>
            <div class="register-input-wrapper">
                <span class="register-input-tip">{{$t('user.password')}}</span>
                <input class="register-input-item"
                       :placeholder="$t('user.passwordTip')"
                       type="password"
                       v-model="password"
                >
            </div>
            <div class="register-input-wrapper">
                <span class="register-input-tip">{{$t('user.checkPassword')}}</span>
                <input class="register-input-item"
                       :placeholder="$t('user.checkPasswordTip')"
                       type="password"
                       v-model="checkPassword"
                >
            </div>
        </div>
        <div class="register-button-wrapper">
            <div class="register-button" @click="register">{{$t('user.register')}}</div>
        </div>
    </div>
</template>

<script>
    import { register } from '../../api/user'

    export default {
        name: 'Register',
        data () {
            return {
                userName: '',
                password: '',
                checkPassword: ''
            }
        },
        methods: {
            register () {
                if (this.userName.length === 0 || this.userName === null) {
                    const toast = this.toast({
                        text: '用户名不能为空'
                    })
                    toast.updateCurrentText('用户名不能为空')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else if (this.userName.length > 15) {
                    const toast = this.toast({
                        text: '用户名的长度应小于15个字符'
                    })
                    toast.updateCurrentText('用户名的长度应小于15个字符')
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
                } else if (this.password.length < 6 || this.password.length > 15) {
                    const toast = this.toast({
                        text: '密码的长度应在6-15个字符之间'
                    })
                    toast.updateCurrentText('密码的长度应在6-15之间')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else if (this.checkPassword.length === 0 || this.checkPassword === null) {
                    const toast = this.toast({
                        text: '校验密码不能为空'
                    })
                    toast.updateCurrentText('校验密码不能为空')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else if (this.checkPassword !== this.password) {
                    const toast = this.toast({
                        text: '两次密码输入不一致'
                    })
                    toast.updateCurrentText('两次密码输入不一致')
                    this.$nextTick(() => {
                        toast.show()
                    })
                } else {
                    register(this.userName, this.password).then(res => {
                        const data = res.data
                        if (data.error_code === 0) {
                            const toast = this.toast({
                                text: data.msg
                            })
                            toast.updateCurrentText(data.msg)
                            this.$nextTick(() => {
                                toast.show()
                                setTimeout(() => {
                                    this.$router.push('/user/login')
                                }, 200)
                            })
                        }
                    })
                }
            },
            back () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/styles/global";
    .register {
        width: 100%;
        height: 100%;
        background: #fff;
        .register-title-bar {
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
            .register-title {
                font-size: px2rem(16);
                line-height: px2rem(18);
                color: #333;
                font-weight: bold;
            }
        }
        .register-body {
            width: 100%;
            padding: px2rem(20) px2rem(10);
            box-sizing: border-box;
            .register-input-wrapper {
                width: 100%;
                height: px2rem(45);
                display: flex;
                align-items: center;
                border-bottom: px2rem(1) solid #f4f4f4;
                .register-input-tip {
                    font-size: px2rem(14);
                    line-height: px2rem(18);
                    color: #999999;
                    flex: 0 0 px2rem(70);
                }
                .register-input-item {
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
        .register-button-wrapper {
            width: 100%;
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
            .register-button {
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
