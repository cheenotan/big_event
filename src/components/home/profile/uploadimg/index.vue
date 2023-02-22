<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div style="width:450px">
        <el-upload class="avatar-uploader" action="#" 
          :on-change="change"
           :before-upload="beforeAvatarUpload"
           >
           <i v-if="avatar" class="el-icon-close avatarImg" @click.stop="handleRemove"></i>
          <img v-if="avatar" :src="avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-row>
          <el-button type="primary" @click="submit">提交修改</el-button>
          <el-button @click="reset">重置</el-button>
        </el-row>
      </div>

    </el-card>
  </div>
</template>

<script>

import {uploadAvatar} from '@/request/apis/home'

export default {
  data() {
    return {
      avatar: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
    },
    change(file, fileList) {
      this.getBase64(file.raw).then(res => {
        // console.log(res);
        this.avatar = res
      })
    },

    getBase64(file) {          //要上传的图片转Base64
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    handleRemove(file, fileList) {
     this.imageUrl = ''
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
    async submit() {
      const {data: res} =await uploadAvatar(this.avatar)
      if(res.code !== 0) return this.$message.error(res.message)
      this.$store.dispatch('getUserInfos')
      this.$message.success(res.message)
      this.avatar =''
    },
    reset() {

    }
  }
}
</script>

<style lang="less" scoped>
.clearfix {
  text-align: left;
  line-height: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fff;
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
  // position: relative;
}

// .avatarImg {
//   position: absolute;
//   right: -1px;
//   top: 1px;
// }
</style>