<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本资料</span>
            </div>
            <div style="width:450px">
                <el-form ref="pwd_obj" :rules="rules" :label-position="labelPosition" label-width="100px"
                    :model="pwd_obj">
                    <el-form-item label="用户名：">
                        <el-input v-model="pwd_obj.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称：" prop="nickname">
                        <el-input v-model="pwd_obj.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户邮箱：" prop="email">
                        <el-input v-model="pwd_obj.email"></el-input>
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-button type="primary" @click="submit">提交修改</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-row>
            </div>

        </el-card>
    </div>
</template>

<script>
import { updataUserInfo } from '@/request/apis/home'
import { mapState } from 'vuex'
import { getUserInfo } from '@/request/apis/home'

export default {
    data() {
        return {
            labelPosition: 'right',
            pwd_obj: {
                id: Math.floor(this.$store.state.userinfo.id),
                username: this.$store.state.userinfo.username,
                nickname: '',
                email: ''
            },
            rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]

            }
        };
    },
    computed: {
        ...mapState(['userinfo'])
    },
    methods: {
        submit() {
            this.$refs.pwd_obj.validate(async valid => {
                if (valid) {
                    const { data: res } = await updataUserInfo(this.pwd_obj)
                    // console.log(res);
                    if (res.code === 0) {
                        this.$message.success(res.message)
                        this.pwd_obj.nickname = ''
                        this.pwd_obj.email = ''
                        getUserInfo().then(res => {
                            this.$store.dispatch('setUserInfo', res.data.data)
                        })

                    } else {
                        this.$message.error(res.message)
                        return
                    }
                }
            })
        },
        reset() {
            this.pwd_obj.nickname = ''
            this.pwd_obj.email = ''
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