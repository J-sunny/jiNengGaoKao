<template>
  <div class="wpe">
    <div class="cdn">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="LOGIN轮播图">
          <el-upload
            class="upload-demo"
            action="http://221.234.36.70:18081/jx-project-exam/dbinfo/JXZcontroller/uploadFileYW"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div v-for="(item,index) in imgUrl" class="imgs">
            <i class="el-icon-error errors" @click="rems(index)" />
            <img width="100%" height="100%" :src="item" alt="" @click="unpsr(item,'查看大图')">
          </div>
        </el-form-item>
        <el-form-item label="网站标题">
          <el-input v-model="title" class="ipt" />
        </el-form-item>
        <el-form-item label="TOP颜色">
          <div>
            <el-input v-model="color" class="ipt"><el-color-picker slot="append" v-model="color" /></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="postList">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { cacheText, getText } from '@/api/user'

export default {
  name: 'Index',
  data() {
    return {
      color: '',
      form: {},
      Text: {},
      title: '',
      imgUrl: []

    }
  },
  watch: {
  },
  created() {
    this.getList()
  },
  methods: {
    unpsr(url, title) {
      window.open(url, title, 'location=no,status=no,scrollvars=no')
    },
    quxiao() {
      this.getList()
    },
    rems(val) {
      this.imgUrl.splice(val, 1)
    },
    getList() {
      getText().then(data => {
        this.Text = JSON.parse(data.data.text)
        this.imgUrl = this.Text.imgUrl
        this.title = this.Text.title
        this.color = this.Text.color
      })
    },
    postList() {
      this.Text.imgUrl = this.imgUrl
      this.Text.color = this.color
      this.Text.title = this.title
      cacheText({ text: JSON.stringify(this.Text) }).then(data => {
        this.$message.success('保存成功')
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(val) {
      if (!this.Text.imgUrl) {
        this.Text.imgUrl = []
      }
      this.Text.imgUrl.push(val.data.msg)
      this.imgUrl = this.Text.imgUrl
      console.log(this.Text)
    }
  }
}
</script>

<style scoped>
.wpe{
  padding: 32px;
}
  .cdn{
    padding: 20px;
    background-color: #fff;
  }
  .ipt{
    width: 220px;
  }
  .imgs{
    width: 192px;
    height: 108px;
    float: left;
    margin-left: 15px;
    position: relative;
    cursor:pointer;
  }
  .btn{
    text-align: center;
  }
  .errors{
    color: red;
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 22px;
    display: none;
    cursor:pointer
  }
  .imgs:hover .errors{
    display: block;
  }
</style>
