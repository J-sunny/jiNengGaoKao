<template>
  <div class="wpr">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      row-key="pointId"
    >
      <el-table-column
        prop="pointName"
        label="知识点名称"
      />
      <el-table-column
        prop="subjectId"
        label="所属科目"
      >
        <template slot-scope="scope">
          <span v-for="item in listl" v-if="item.subjectId==scope.row.subjectId">{{ item.subjectName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180px"
      >
        <template slot-scope="scope">
          <el-button v-if="!scope.row.parentPointId" type="text" size="small" @click="add(scope.row)">添加子知识点</el-button>
          <el-button type="text" size="small" @click="delete_(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="添加子知识点"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <!--        <el-form-item label="所属科目">-->
        <!--          <el-input v-model="ruleForm.subjectName" disabled></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="所属知识点">
          <el-input v-model="ruleForm.pointName" disabled />
        </el-form-item>
        <el-form-item label="知识点名称" prop="childrenPointId">
          <el-input v-model="ruleForm.childrenPointId" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { knowledgePointListBySubjectId, childSave, knowledgePointDelete, knowledgePointChildDelete } from '@/api/Subject'
export default {
  name: 'Knowledge',
  props: ['subjectId', 'listl'],
  data() {
    return {
      ruleForm: {},
      dialogVisible: false,
      list: [],
      region: '',
      ipt: false,
      form: {},
      tableData: [],
      rules: {
        childrenPointId: [{ required: true, message: '请输入知识点名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    subjectId() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = {}
          obj.parentPointId = this.ruleForm.pointId
          obj.pointName = this.ruleForm.childrenPointId
          obj.subjectName = this.ruleForm.subjectName
          obj.subjectId = this.ruleForm.subjectId
          childSave(obj).then(data => {
            this.getList()

            this.dialogVisible = false
          })
          this.getList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    delete_(val) {
      this.$confirm('此操作将永久删除知识点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!val.parentPointId) {
          knowledgePointDelete({ pointId: val.pointId }).then(data => {
            if (data.data.code == 200) {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        } else {
          knowledgePointChildDelete({ secondaryPointId: val.pointId }).then(data => {
            if (data.data.code == 200) {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add(val) {
      this.ruleForm = val
      this.dialogVisible = true
    },
    getList() {
      knowledgePointListBySubjectId({ subjectId: this.subjectId }).then(data => {
        this.tableData = data.data
        this.$emit('tableDatalens', this.tableData.length)
      })
    }
  }
}
</script>

<style scoped>
  .wpr{
    background-color: #fff!important;
    padding: 0!important;
    border: none;
    margin-top: 10px!important;
  }
  .wpr .el-select{
    width: 400px;
  }
  .list>li{
    overflow: hidden;
    padding-bottom: 20px;
  }
  .list{
    padding-top: 10px;
    padding-left: 120px;
    width: 600px;
  }
  .f{
    overflow: hidden;
  }
  .ipt_{
    float: left;
  }
  .ipx{
    width: 300px;
    padding-right: 10px;
  }
  .z{
    padding-left: 20px;
  }
</style>
