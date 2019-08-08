<template>
  <div class="box_r">
    <div class="body">
      <div class="top">
        <el-input v-model="keyword" size="mini" type="text" class="ipt" suffix-icon="el-icon-search" />
        <div class="btn">
          <el-button type="primary" size="mini" round @click="dialogVisible=true,form={},title='新建科目'">创建科目</el-button>
          <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
        </div>
      </div>
      <upload v-if="luru" :upload-type="5" @quxiao="luru=!luru" />

      <div class="tab">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="180"
          />
          <el-table-column
            prop="professionId"
            align="center"
            label="所属专业"
          >
            <template slot-scope="scope">
              <span v-for="item in zhuanye" v-if="item.professionId==scope.row.professionId">{{ item.professionName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="subjectName"
            align="center"
            label="科目名称"
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
    </div>
    <el-dialog
      :title="title"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="560px"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="所属专业:" prop="studentProfessionId">
          <el-select v-model="form.professionId" size="mini" placeholder="请选择专业">
            <el-option v-for="item in zhuanye" :key="item.professionId" :label="item.professionName" :value="item.professionId" />
          </el-select>
        </el-form-item>
        <el-form-item label="科目名称:" prop="subjectName">
          <el-input v-model="form.subjectName" size="mini" />
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
import { subjectListByKeyword, subjectDelete, subjectSaveOrUpdate } from '@/api/Subject'
import { professionlist } from '@/api/system'
import upload from '@/components/Upload/upload'

export default {
  name: 'Index',
  components: { upload },

  data() {
    return {
      luru: false,
      zhuanye: [],
      title: '',
      form: {},
      tableData: [],
      dialogVisible: false,
      currentPage3: 1,
      keyword: '',
      currentPage: 1,
      pageSize: 10,
      count: 0,
      rules: {
        subjectName: [
          { required: true, message: '请输入科目名称', trigger: 'blur' }
        ],
        professionId: [
          { required: true, message: '请选择专业', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    keyword() {
      this.getList(this.currentPage, this.pageSize)
    }
  },
  created() {
    professionlist({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.zhuanye = data.data.list
    })
    this.getList(1, 10)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          subjectSaveOrUpdate(this.form).then(data => {
            if (data.data.code == 200) {
              this.getList(this.currentPage, this.pageSize)
              this.dialogVisible = false
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modify(val) {
      this.form = val
      this.title = '修改科目信息'
      this.dialogVisible = true
    },
    delete_(val) {
      this.$confirm('此操作将永久删除科目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subjectDelete({ subjectId: val.subjectId }).then(data => {
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageSize)
    },
    getList(currentPage, pageSize) {
      subjectListByKeyword({ currentPage: currentPage, pageSize: pageSize, keyword: this.keyword }).then(data => {
        this.tableData = data.data.list
        this.count = data.data.count
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
  .tab{
    padding-top: 30px;
  }
  .pag {
    padding-top: 30px;
    text-align: center;
  }
</style>
