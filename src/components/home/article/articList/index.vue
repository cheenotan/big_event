<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>文章分类</span>
            </div>
            <div class="head">
                <el-form :inline="true" :model="queryForm" class="demo-form-inline">

                    <el-form-item label="文章名字">
                        <el-input v-model="queryForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="文章类目">
                        <el-select v-model="queryForm.cate_alias" placeholder="请选择">
                            <el-option v-for="item in cateInfo" :key="item.id" :label="item.cate_name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-button class="addBtn" type="primary" @click="dialogFormVisible = true">添加文章</el-button>
            </div>

            <div>
                <!-- 弹出框 -->
                <el-dialog width title="添加文章" :visible.sync="dialogFormVisible" @close="dialogClosed">
                    <el-form ref="forms" :model="addForm" class="demo-form-inline">
                        <el-form-item label="文章名字：" :label-width="formLabelWidth">
                        <el-input v-model="addForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="文章类目：" :label-width="formLabelWidth">
                        <el-select v-model="addForm.cate_id" placeholder="请选择">
                            <el-option v-for="item in cateInfo" :key="item.id" :label="item.cate_name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                        <!-- 富文本 -->
                        <el-form-item label="文章内容：" :label-width="formLabelWidth">
                            <quill-editor v-model="addForm.content" ref="myQuillEditor" :options="editorOption">
                            </quill-editor>
                        </el-form-item>
                        <!-- 上传封面 -->
                        <el-form-item label="文章封面：" :label-width="formLabelWidth">
                            <el-upload class="avatar-uploader" action="#"
                                :show-file-list="false" :on-change="fileChanged"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="coverImg" :src="coverImg" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="info" @click="formSubmit('草稿')">保存草稿</el-button>
                            <el-button type="primary" @click="formSubmit('已发布')">确定发布</el-button>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">

                    </div>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getCateList, addArticleList } from '@/request/apis/home'

export default {
    data() {
        return {
            dialogFormVisible: false,

            formLabelWidth: '120px',
            coverImg: '',
            queryForm:{
                title:'',
                cate_alias:''
            },
            addForm: {
                title: '',
                cate_id: '',
                content: '',
                cover_img: null,
                state: '草稿'
            },
            cateInfo: [],
            editorOption: {
                // some quill options
            }
        }
    },
    mounted() {
        this.getListInfo()
    },
    methods: {
        async getListInfo() {
            const { data: res } = await getCateList()
            // console.log(res);
            this.cateInfo = res.data
        },
        onEditorChange({ quill, html, text }) {
            // console.log('editor change!', quill, html, text)
            this.content = html
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        fileChanged(file, fileList) {
            this.addForm.cover_img = file.raw
            const result = URL.createObjectURL(file.raw);
            //    console.log(result);
            this.coverImg = result

        },
        formSubmit(type) {
            this.addForm.state = type
            console.log(this.addForm);
            const fd = new FormData()
            fd.append('title',this.addForm.title)
            fd.append('cate_id',this.addForm.cate_id)
            fd.append('content',this.addForm.content)
            fd.append('cover_img',this.addForm.cover_img)
            fd.append('state',this.addForm.state)
            addArticleList(fd).then(res => {
                if(res.data.code !== 0) return this.$message.error(res.data.message)
                this.$message.success(res.data.message)
                this.dialogFormVisible = false
                this.$refs.forms.resetFields()
            })
        },
        dialogClosed() {
            console.log(1);
            this.$refs.forms.resetFields()
        }
    }
}
</script>

<style lang="less" scoped>
.clearfix {
    float: left;
}

.head {
    .el-form {
        float: left;
    }

    span {
        float: left;
    }

    .addBtn {
        float: right;
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-select {
    float: left;
}

.el-upload el-upload--text {
    float: left;
}

.avatar-uploader {
    text-align: left;
}
</style>