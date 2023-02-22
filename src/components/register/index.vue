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
                <el-form-item label="确认密码：" prop="repassword">
                    <el-input show-password placeholder="必填项" type="password" v-model="form.repassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sendPost">立即注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-link type="info" :underline="false" @click="$router.push('/login')"
                        >已有账号？去登录</el-link>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
import { postRegister } from '@/request/apis/login'

export default {
    data() {

        const checkRepasswordFn = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback('两次密码不一致')
            } else {
                callback()
            }

        }
        return {

            form: {
                username: '',
                password: '',
                repassword:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '3到10位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '3到10位', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '再次确认密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '3到10位', trigger: 'blur' },
                    { validator: checkRepasswordFn, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
         sendPost() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.$message.success('校验成功')
                    const result = await postRegister('api/reg',this.form)
                    console.log(result);
                    if(result.data.code !== 0) {
                        this.$message.error(`code:${result.data.code}   错误信息: ${result.data.message}`)
                    } else {
                        this.$message.success(result.data.message)
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