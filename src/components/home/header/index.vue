<template>
    <div class="home">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><a>你好：{{ username }}</a></el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="4"><a @click="handelToQuit">退出登录</a></el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import { getUserInfo } from '@/request/apis/home'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            activeIndex: 1,
            username: ''
        }
    },
    computed: {
        ...mapState(['userinfo'])
    },
    created() {
        getUserInfo().then(res => {
            // console.log(res);
            this.$store.dispatch('setUserInfo', res.data.data)
            this.username = this.userinfo.username
        })
    },
    methods: {
        handelToQuit() {
            this.$confirm('是否确认退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '已退出登录'
                });
                this.$store.dispatch('setToken', '')
                this.$store.dispatch('setUserInfo', {})
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSelect() {

        }
    }
}
</script>

<style lang="less" scoped>
.home {
    height: 100%;

    .el-menu {
        float: right;
        background-color: #B3C0D1;
        color: #fff;
    }
}
</style>