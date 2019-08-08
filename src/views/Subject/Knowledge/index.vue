<template>
  <div class="box_r">
    <div class="body">
      <div class="top">
        所属科目：
        <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
          <el-option
            v-for="item in list"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectId"
          />
        </el-select>
        <span />
        <el-tag>已查出:{{ total }}个知识点</el-tag>
        <div class="btn">
          <el-button type="primary" size="mini" round @click="dialogVisible=true">创建知识点</el-button>
        </div>
      </div>
      <Knowledge v-if="falg" ref="mychild" :listl="list" :subject-id="subjectId" @tableDatalens="tableDatalens" />
    </div>
    <el-dialog
      title="创建知识点"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="380px"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="所属科目:" prop="subjectId">
          <el-select v-model="ruleForm.subjectId" size="mini" placeholder="请选择科目">
            <el-option
              v-for="item in list"
              :key="item.subjectId"
              :label="item.subjectName"
              :value="item.subjectId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="知识点名称:" prop="pointName">
          <el-input v-model="ruleForm.pointName" size="mini" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { subjectListByKeyword, knowledgePointSave } from '@/api/Subject'

import Knowledge from './Knowledge'

export default {
  name: 'Index',
  components: { Knowledge },
  data() {
    return {
      total: 0,
      falg: false,
      ruleForm: {},
      subjectId: null,
      list: [],
      dialogVisible: false,
      ipt: false,
      form: {},
      region: '',
      rules: {
        subjectId: [
          { required: true, message: '请选择所属科目', trigger: 'blur' }
        ],
        pointName: [
          { required: true, message: '请输入知识点名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    subjectId() {
      this.ruleForm.subjectId = this.subjectId
    }
  },
  created() {
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.list = data.data.list
      this.falg = true
      this.subjectId = this.list[0].subjectId
    })
  },
  methods: {
    tableDatalens(val) {
      this.total = val
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          knowledgePointSave(this.ruleForm).then(data => {
            if (data.data.code == 200) {
              console.log(data)

              this.subjectId = this.ruleForm.subjectId
              this.$refs.mychild.getList()
              this.dialogVisible = false
            }
          })

          this.subjectId = this.ruleForm.subjectId
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .body {
    background-color: #fff;
    padding: 32px;
  }

  .ipt {
    width: 360px;
  }

  .btn {
    float: right;
  }

  .wpr {
    margin-top: 30px;
    padding: 18px;
    background-color: #FAFAFA;
    border: 1px rgba(230, 230, 230, 1) solid;
    overflow: hidden;
  }

</style>
