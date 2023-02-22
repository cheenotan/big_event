<template>
    <div class="container">
        <register/>
    </div>
</template>

<script>
import register from '@/components/register'
    export default {
        data() {
            return{
                input:'11'
            }
        },
        components:{
            register
        }
    }
</script>

<style lang="less" scoped>
.container {
    height: 100%;
}
</style>