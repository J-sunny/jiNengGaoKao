<template>
  <div>
    <div class="top">
      <el-input size="mini" type="text" class="ipt" suffix-icon="el-icon-search" />
      <div class="btn">
        <el-button type="primary" size="mini" round @click="dialogVisible=true,ruleForm={},title='添加专业'">添加专业</el-button>
        <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
      </div>
    </div>

    <upload v-if="luru" :upload-type="4" @quxiao="luru=!luru" />
    <div class="tab">
      <el-table
        :data="tableData"
        size="mini"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="professionId"
          label="ID"
          align="center"
          width="180"
        />
        <el-table-column
          prop="professionName"
          align="center"
          label="专业名称"
        />
        <el-table-column
          prop="address"
          width="180"
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="delete_(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <el-pagination
          background
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
    <el-dialog
      :title="title"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="460px"
    >
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="ID:">
          <el-input v-model="ruleForm.professionId" size="mini" disabled />
        </el-form-item>
        <el-form-item label="专业名称:" prop="professionName">
          <el-input v-model="ruleForm.professionName" size="mini" />
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
import { professionlist, professionSaveOrUpdate, professionDelete } from '@/api/system'
import upload from '@/components/Upload/upload'
export default {
  name: 'Major',
  components: { upload },
  data() {
    return {
      luru: false,
      title: '添加专业',
      tableData: [],
      currentPage3: 1,
      dialogVisible: false,
      pageSize: 10,
      currentPage: 1,
      count: 0,
      ruleForm: {
        ID: '',
        professionName: ''
      },
      rules: {
        professionName: [
          { required: true, message: '请输入专业名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList(1, 10)
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          professionSaveOrUpdate(this.ruleForm).then(data => {
            if (data.data.code == 200) {
              this.getList(this.currentPage, this.pageSize)
              this.dialogVisible = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modify(val) {
      this.title = '修改专业'
      this.ruleForm = val
      this.dialogVisible = true
    },
    delete_(val) {
      this.$confirm('此操作将永久删除专业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        professionDelete({ professionId: val.professionId }).then(data => {
          if (data.data.code == 200) {
            this.getList(this.currentPage, this.pageSize)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(data.data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageSize)
    },
    getList(currentPage, pageSize) {
      professionlist({ currentPage: currentPage, pageSize: pageSize }).then(data => {
        this.tableData = data.data.list,
        this.count = data.data.count
      })
    }
  }
}
</script>

<style scoped>
  .top {
    width: 100%;
    padding: 39px 44px 15px 44px;
    box-sizing: border-box;
  }

  .ipt {
    width: 360px;
  }

  .btn {
    float: right;
  }

  .tab {
    padding: 0 44px 44px 44px;
  }

</style>
