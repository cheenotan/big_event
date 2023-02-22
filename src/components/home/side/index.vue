<template>
    <div class="side">
        <el-menu :default-active="$route.path" unique-opened class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            active-text-color="#ffd04b">
            <template v-for="item in sideinfo">
                <el-menu-item :index="item.indexPath" v-if="!item.children" @click="$router.push(item.indexPath)"><i :class="item.icon"></i>{{ item.title
                }}</el-menu-item>

                <el-submenu :index="item.indexPath"  v-else>
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key="subItem.title" @click="$router.push(subItem.indexPath)">
                      
                        {{ subItem.title}}
                    </el-menu-item>
                </el-submenu>
            </template>


        </el-menu>
    </div>
</template>

<script>

import { getSideInfo } from '@/request/apis/home'
import { mapState } from 'vuex'


export default {


    data() {
        return {
            activeIndex: '1'
        }
    },
    computed: {
        ...mapState(['sideinfo'])
    },
    mounted() {
        getSideInfo().then(res => {
            // console.log(res);
            this.$store.dispatch('setSideInfo', res.data.data)
        })
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
    .el-menu {
        text-align: left;
    }

</style>