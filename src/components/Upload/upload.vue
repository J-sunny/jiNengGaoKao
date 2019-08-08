<template>
  <div>
    <el-dialog
      title="批量录入数据"
      width="550px"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :on-success="oNsuccess"
      :visible.sync="shoues"
    >
      <div class="shangchua">
        <el-upload
          class="upload-demo"
          :headers="token"
          drag
          :before-upload="beforeAvatarUpload"
          :data="canshuy"
          :action="BASE_API+'/dbinfo/JXZcontroller/uploadExcelData'"
        >

          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过50Mb <a style="color: #2a93fe" href="../Template.rar" download="Template.rar">下载模板</a></div>

        </el-upload>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="quxiao">取 消</el-button>
        <el-button size="mini" type="primary" @click="quxiao">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'Upload',
  props: ['uploadType'],
  data() {
    return {
      shoues: true,
      token: {
        'X-Token': ''
      },
      canshuy: {
        uploadType: this.uploadType,
        userId: this.$store.getters.introduction
      },
      BASE_API: ''
    }
  },
  created() {
    this.token['X-Token'] = getToken('lanshan-Token')
    this.BASE_API = process.env.VUE_APP_BASE_API
  },
  methods: {
    oNsuccess(val, fill, doc) {
      this.$message.success('上传成功，请刷新页面查看结果!')

      this.$emit('quxiao')
    },
    quxiao() {
      this.$emit('quxiao')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'application/vnd.ms-excel'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!isJPG) {
        this.$message.error('上传文件只能是 EXECL 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 50MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .shangchua{
    text-align: center;
  }
</style>
