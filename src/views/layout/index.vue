<template>
    <div class="home">
        <el-container>
            <el-header>
                <container/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <side/>
                </el-aside>
                <el-container>
                    <el-main>
                        <RouterView/>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import container from '@/components/home/header'
import side from '@/components/home/side'
import { RouterView } from 'vue-router';

export default {
    components :{
    container,
    side,
    RouterView
}
}

</script>

<style lang="less" scoped>
.home {
    height: 100%;
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-container {
        height: 100%;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        // line-height: 160px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
}
</style>