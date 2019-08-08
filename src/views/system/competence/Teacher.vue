<template>
  <div>
    <div class="top">
      <el-input v-model="keyword" size="mini" type="text" class="ipt" suffix-icon="el-icon-search" />
      <div class="btn">
        <el-button type="primary" size="mini" round @click="dialogVisible=true,form={},title='添加教师'">添加教师</el-button>
        <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
      </div>
    </div>
    <upload v-if="luru" :upload-type="1" @quxiao="luru=!luru" />

    <div class="tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="userRealName"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="userAccount"
          align="center"
          label="工号"
        />
        <el-table-column
          prop="userPwd"
          align="center"
          label="密码"
        />
        <el-table-column
          prop="teacherRole"
          align="center"
          label="角色"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.teacherRole==0">教师</span>
            <span v-if="scope.row.teacherRole==1">管理员</span>
          </template>

        </el-table-column>
        <el-table-column
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
      custom-class="nianji"
      :visible.sync="dialogVisible"
      width="460px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名:" prop="userRealName">
          <el-input v-model="form.userRealName" size="mini" />
        </el-form-item>
        <el-form-item label="工号:">
          <el-input v-model="form.userAccount" size="mini" />
        </el-form-item>
        <el-form-item label="账号:" prop="userAccount">
          <el-input v-model="form.userAccount" size="mini" />
        </el-form-item>
        <el-form-item label="密码:" prop="userPwd">
          <el-input v-model="form.userPwd" size="mini" />
        </el-form-item>
        <el-form-item label="角色:" prop="teacherRole">
          <el-select v-model="form.teacherRole" size="mini" placeholder="请选择角色">
            <el-option label="教师" value="0" />
            <el-option label="管理员" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { teacherList, teacherSaveOrUpdate, teacherDelete } from '@/api/system'
import upload from '@/components/Upload/upload'

export default {

  name: 'Teacher',
  components: { upload },
  data() {
    return {
      luru: false,
      keyword: '',
      title: '',
      count: 0,
      region: '',
      tableData: [],
      currentPage3: 1,
      dialogVisible: false,
      form: {
      },
      currentPage: 1,
      pageSize: 10,
      rules: {
        userRealName: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' }
        ],
        userAccount: [
          { required: true, message: '请输入教师账号', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        teacherRole: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    keyword() {
      this.currentPage3 = 1
      this.getList(1, 10)
    }
  },
  created() {
    this.getList(this.currentPage, this.pageSize)
  },
  methods: {
    modify(val) {
      this.form = val
      this.title = '修改教师信息'
      this.dialogVisible = true
    },
    delete_(val) {
      this.$confirm('此操作将永久删除教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacherDelete({ userId: val.userId }).then(data => {
          if (data.data.code == 200) {
            this.getList(this.currentPage, this.pageSize)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          teacherSaveOrUpdate(this.form).then(data => {
            if (data.data.code == 200) {
              console.log(this.currentPage, this.pageSize)
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

    getList(currentPage, pageSize) {
      teacherList({ currentPage: currentPage, pageSize: pageSize, keyword: this.keyword }).then(data => {
        this.tableData = data.data.list
        this.count = data.data.count
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageSize)
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

  .pag {
    padding-top: 30px;
    text-align: center;
  }
  .nianji .el-select{
    width: 100%;
  }
</style>
