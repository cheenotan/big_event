<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>文章分类</span>
                <el-button type="primary" @click="addArtic">添加分类</el-button>
            </div>
            <div>
                <el-dialog :title="this.isChanging ? '修改分类' : '添加分类'" :visible.sync="dialogFormVisible"
                    close="beforeClose">
                    <el-form ref="forms" :model="form" :rules="rules">
                        <el-form-item label="文章名称：" :label-width="formLabelWidth" prop="cate_name">
                            <el-input v-model="form.cate_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="文章别名：" :label-width="formLabelWidth" prop="cate_alias">
                            <el-input v-model="form.cate_alias" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handelToAdd">确 定</el-button>
                    </div>
                </el-dialog>
                <span v-if="!listArr.length">文章列表为空~</span>
                <el-table fit v-else :data="listArr" border style="width: 100%">
                    <el-table-column resizable type="index" label="序号" width="150">
                    </el-table-column>
                    <el-table-column resizable prop="cate_name" label="文章类名" width="120">
                    </el-table-column>
                    <el-table-column resizable prop="cate_alias" label="文章别名" width="120">
                    </el-table-column>
                    <el-table-column resizable label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="deleteFn(scope.row.id)" type="danger" icon="el-icon-delete"
                                circle></el-button>
                            <el-button @click="changeInfo(scope.row)" type="primary" icon="el-icon-edit"
                                circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-card>
    </div>
</template>

<script>
import { addArticle, getCateList, updateList, deleteCate } from '@/request/apis/home'

export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                cate_name: '',
                cate_alias: ''
            },
            formLabelWidth: '120px',
            rules: {
                cate_name: [
                    { required: true, message: '请输入分类名字', trigger: 'blur' },
                    { min: 1, max: 18, message: '1到18位', trigger: 'blur' }
                ],
                cate_alias: [
                    { required: true, message: '请输入分类别名', trigger: 'blur' },
                    {
                        pattern: /(?=.*[a-z_])(?=.*\d)[\S]{1,15}/, message: '1到18位', trigger: 'blur'
                    }
                ]
            },
            listArr: [],
            isChanging: false,
            changingId: ''
        };
    },
    created() {
        this.getcatlist()
    },
    methods: {
        handelToAdd() {
            this.$refs.forms.validate(valid => {
                if (!valid) return this.$message.warning('请填写必填项')
                else if (!this.isChanging) {
                    addArticle(this.form).then(res => {
                        if (res.data.code !== 0) return this.$message.error(res.data.message)
                        this.$message.success(res.data.message)
                        this.$refs.forms.resetFields()
                        this.dialogFormVisible = false
                        this.getcatlist()
                    })
                } else {
                    updateList({ id: this.changingId, ...this.form }).then(res => {
                        if (res.data.code !== 0) return this.$message.error(res.data.message)
                        this.$message.success(res.data.message)
                        this.$refs.forms.resetFields()
                        this.dialogFormVisible = false
                        this.getcatlist()
                    })
                }

            })
        },
        // 获取文章列表
        async getcatlist() {
            const { data: res } = await getCateList()
            // console.log(res);
            if (res.code !== 0) {
                this.$message.error('获取文章列表失败')
            } else {
                this.listArr = res.data
            }


        },
        deleteFn(id) {
            // console.log(id);
            deleteCate(id).then(res => {
                // console.log(res);
                if (res.data.code !== 0) return this.$message.error(res.data.message)
                this.$message.success(res.data.message)
                this.getcatlist()
            })
        },
        beforeClose() {

        },
        addArtic() {
            this.dialogFormVisible = true
            this.isChanging = false
            this.form.cate_name = ''
            this.form.cate_alias = ''
        },
        changeInfo(obj) {
            // console.log(obj);
            this.dialogFormVisible = true
            this.isChanging = true
            this.form.cate_name = obj.cate_name
            this.form.cate_alias = obj.cate_alias
            this.changingId = obj.id

        }
    }
}
</script>

<style lang="less" scoped>
.clearfix {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    align-items: center;
}
</style>