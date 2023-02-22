<template>
    <div class='container'>
        <div class="form-area">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-position="left">
                <el-form-item label="用户名：" prop="username">
                    <el-input maxlength="6" minlength="1" clearable placeholder="必填项" v-model="form.username">

                    </el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input show-password placeholder="必填项" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sendPost">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-link type="info" :underline="false" @click="$router.push('/register')" 
                        >没有账号？去注册</el-link>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
import { postLogin } from '@/request/apis/login'

export default {
    data() {
        return {

            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '3到10位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '3到10位', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
         sendPost() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    const {data:res} = await postLogin('api/login',this.form)
                    console.log(res);
                    if(res.code !== 0) {
                        this.$message.error(`code:${res.code}   错误信息: ${res.message}`)
                        return
                    } else {
                        this.$message.success(res.message)
                        this.$store.dispatch('setToken',res.token)
                        this.$router.push('/home')
                    }
                } else{
                    this.$message.warning('校验失败')
                    return
                }
            })
        
            // async postRegister('api/reg',this.form)
            // const reslut = await res
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    // width: 100%;
    background-image: url(../../assets/img/350\ \(1\).jfif);
    background-size: 100% 100%;
    background-size: cover;
    // background-color: pink;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-area {
        width: 400px;
        // height: 600px;
        // min-height: 400px;
        background-color: rgb(243, 239, 239);
        padding: 50px;
        border-radius: 20px;

    }
}
</style>