<template>
  <div>
    <div class="top">
      <el-form ref="form" label-width="80px">
        <!--        <el-form-item label="年级：">-->
        <!--          <el-select v-model="classGrade" size="mini"  placeholder="请选择年级">-->
        <!--            <el-option label="2012级" value="2012级"></el-option>-->
        <!--            <el-option label="2013级" value="2013级"></el-option>-->
        <!--            <el-option label="2014级" value="2014级"></el-option>-->
        <!--            <el-option label="2015级" value="2015级"></el-option>-->
        <!--            <el-option label="2016级" value="2016级"></el-option>-->
        <!--            <el-option label="2017级" value="2017级"></el-option>-->
        <!--            <el-option label="2018级" value="2018级"></el-option>-->
        <!--            <el-option label="2019级" value="2019级"></el-option>-->
        <!--            <el-option label="2020级" value="2010级"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item v-if="false" label="班级：">
          <el-select v-model="region" size="mini" placeholder="请选择班级">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-input v-model="keyword" size="mini" type="text" class="ipt" suffix-icon="el-icon-search" />
      </el-form>
      <div class="btn">
        <el-button type="primary" size="mini" round @click="dialogVisible=true,form={},title='添加班级'">添加班级</el-button>
        <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
      </div>
    </div>
    <upload v-if="luru" :upload-type="3" @quxiao="luru=!luru" />
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
          width="50"
        />
        <el-table-column
          prop="className"
          align="center"
          label="班级"
        />
        <el-table-column
          prop="classGrade"
          align="center"
          label="年级"
        />
        <el-table-column
          prop="professionName"
          align="center"
          label="专业"
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
      custom-class="nianji"
      width="460px"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="ID:">
          <el-input v-model="form.classId" size="mini" disabled />
        </el-form-item>
        <el-form-item label="班级:" prop="className">
          <el-input v-model="form.className" size="mini" />
        </el-form-item>
        <!--        <el-form-item label="年级:" prop="classGrade">-->
        <!--          <el-select v-model="form.classGrade" size="mini"  placeholder="请选择年级">-->
        <!--            <el-option label="2012级" value="2012级"></el-option>-->
        <!--            <el-option label="2013级" value="2013级"></el-option>-->
        <!--            <el-option label="2014级" value="2014级"></el-option>-->
        <!--            <el-option label="2015级" value="2015级"></el-option>-->
        <!--            <el-option label="2016级" value="2016级"></el-option>-->
        <!--            <el-option label="2017级" value="2017级"></el-option>-->
        <!--            <el-option label="2018级" value="2018级"></el-option>-->
        <!--            <el-option label="2019级" value="2019级"></el-option>-->
        <!--            <el-option label="2020级" value="2010级"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="专业:" prop="professionId">
          <el-select v-model="form.professionId" size="mini" placeholder="请选择专业">
            <el-option v-for="item in list" :key="item.professionName" :label="item.professionName" :value="item.professionId" />
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
import { professionlist, classListByKeyword, classSaveOrUpdate, classDelete } from '@/api/system'
import upload from '@/components/Upload/upload'
export default {
  name: 'Team',
  components: { upload },
  data() {
    return {
      luru: false,
      title: '',
      list: [],
      rules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        classGrade: [
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        professionId: [
          { required: true, message: '请选择专业', trigger: 'blur' }
        ]
      },
      classGrade: '',
      keyword: '',
      region: '',
      tableData: [],
      currentPage3: 1,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      form: {},
      count: 0
    }
  },
  watch: {
    classGrade() {
      this.getList()
    },
    keyword() {
      this.getList()
    }
  },
  created() {
    this.getList()
    professionlist({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.list = data.data.list
    })
  },
  methods: {
    delete_(val) {
      this.$confirm('此操作将永久删除班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        classDelete({ classId: val.classId }).then(data => {
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
    modify(val) {
      this.form = val
      this.title = '修改班级'
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classSaveOrUpdate(this.form).then(data => {
            if (data.data.code == 200) {
              this.dialogVisible = false
              this.getList(this.currentPage, this.pageSize)
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getList() {
      classListByKeyword({ classGrade: this.classGrade, className: this.className, keyword: this.keyword, professionId: this.professionId, currentPage: this.currentPage, pageSize: this.pageSize }).then(data => {
        this.tableData = data.data.list
        this.count = data.data.count
      })
    }
  }
}
</script>

<style scoped>
  .top {
    width: 100%;
    padding: 32px 44px 0 44px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .ipt {
    width: 360px;
    margin-left: 20px;
    margin-top: 3px;
  }

  .btn {
    float: right;
    margin-top: 6px;
  }

  .tab {
    padding: 0 44px 44px 44px;
  }

  .pag {
    padding-top: 30px;
    text-align: center;
  }
  .top .el-form-item,.top .el-input.ipt{
    float: left;
  }
  .nianji .el-select{
    width: 100%;
  }
</style>
