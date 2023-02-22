<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <div style="width:450px">
                <el-form ref="form" :rules="rules" label-position="right" label-width="100px" :model="pwd_obj">
                    <el-form-item label="旧密码：" prop="old_pwd">
                        <el-input v-model="pwd_obj.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="new_pwd">
                        <el-input type="password" v-model="pwd_obj.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码：" prop="re_pwd">
                        <el-input type="password" v-model="pwd_obj.re_pwd"></el-input>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-button type="primary" @click="submit">提交修改</el-button>
                </el-row>
            </div>

        </el-card>
    </div>
</template>

<script>
import { updatePwd } from '@/request/apis/home'

export default {


    data() {
        const checkRepasswordFn = (rule, value, callback) =>{
            if (value !== this.pwd_obj.new_pwd) {
                callback('两次密码不一致')
            } else {
                callback()
            }
        }

        const checkNewpasswordFn = (rule,value,callback) =>{
            if (value === this.pwd_obj.old_pwd) {
                callback('新旧密码不能一样')
            } else {
                callback()
            }
        }

        return {
            pwd_obj: {
                old_pwdL: '',
                new_pwd: '',
                re_pwd: ''
            },
            rules: {
                old_pwd: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '3到10位', trigger: 'blur' }
                ],
                new_pwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '3到10位', trigger: 'blur' },
                    {validator: checkNewpasswordFn , trigger:'blur'}
                ],
                re_pwd: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '3到10位', trigger: 'blur' },
                    { validator: checkRepasswordFn, trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        submit() {
            console.log('1');
            this.$refs.form.validate(async valid => {
                if (!valid) return this.$message.error('res.message')
                const { data: res } = await updatePwd(this.pwd_obj)
                this.$message.success(res.message)
            })
        }
    }

}
</script>

<style lang="less" scoped>
.clearfix {
    text-align: left;
    line-height: 20px;
}
</style>