<template>
    <div class="login">
        <loginPage/>
    </div>
</template>

<script>
    import loginPage from '@/components/login'

    export default {
        data() {
            return {
                
            }
        },
        components :{
            loginPage
        }
    }
</script>

<style lang="less" scoped>
   .login {
    height: 100%;
   } 
</style>