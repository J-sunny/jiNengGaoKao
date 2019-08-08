<template>
  <div class="box_r">
    <div class="wpr">
      <div class="top">
        <el-form ref="form" label-width="80px">
          <el-form-item label="专业：">
            <el-select v-model="region1" size="mini" placeholder="请选择专业">
              <el-option v-for="item in zhuanye" :key="item.professionId" :label="item.professionName" :value="item.professionId" />
            </el-select>
          </el-form-item>

          <el-form-item label="班级：">
            <el-select v-model="region3" size="mini" placeholder="请选择班级">
              <el-option v-for="item in banji" :key="item.classId" :label="item.className" :value="item.classId" />
            </el-select>
          </el-form-item>
          <el-input v-model="region4" size="mini" type="text" class="ipt" suffix-icon="el-icon-search" />
        </el-form>
        <div class="btn">
          <el-button type="primary" size="mini" round @click="dialogVisible=true,form={},title='添加学生信息'">添加学生</el-button>
          <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
        </div>
      </div>
      <upload v-if="luru" :upload-type="0" @quxiao="luru=!luru" />

      <div class="tab">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="50"
          />
          <el-table-column
            prop="userRealName"
            align="center"
            label="姓名"
          />
          <el-table-column
            prop="userAccount"
            align="center"
            label="学号"
          />
          <el-table-column
            prop="userPwd"
            align="center"
            label="密码"
          />
          <el-table-column
            prop="studentProfession"
            align="center"
            label="专业"
          />
          <!--            <el-table-column-->
          <!--              prop="studentGrade"-->
          <!--              align="center"-->
          <!--              label="年级">-->
          <!--            </el-table-column>-->
          <el-table-column
            prop="studentClass"
            align="center"
            label="班级"
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
      width="460px"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="专业:">
          <el-select v-model="form.studentProfessionId" size="mini" placeholder="请选择专业">
            <el-option v-for="item in zhuanye" :key="item.professionId" :label="item.professionName" :value="item.professionId" />
          </el-select>
        </el-form-item>
        <!--          <el-form-item label="年级:">-->
        <!--            <el-select v-model="form.studentGrade" size="mini"  placeholder="请选择年级">-->
        <!--              <el-option label="2012级" value="2012级"></el-option>-->
        <!--              <el-option label="2013级" value="2013级"></el-option>-->
        <!--              <el-option label="2014级" value="2014级"></el-option>-->
        <!--              <el-option label="2015级" value="2015级"></el-option>-->
        <!--              <el-option label="2016级" value="2016级"></el-option>-->
        <!--              <el-option label="2017级" value="2017级"></el-option>-->
        <!--              <el-option label="2018级" value="2018级"></el-option>-->
        <!--              <el-option label="2019级" value="2019级"></el-option>-->
        <!--              <el-option label="2020级" value="2010级"></el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <el-form-item label="班级:">
          <el-select v-model="form.studentClassId" size="mini" placeholder="请选择班级">
            <el-option v-for="item in banji" :key="item.classId" :label="item.className" :value="item.classId" />
          </el-select>
        </el-form-item>
        <el-form-item label="学号:">
          <el-input v-if="title!='修改学生信息'" v-model="form.userAccount" size="mini" />
          <el-input v-else v-model="form.userAccount" size="mini" disabled />
        </el-form-item>
        <el-form-item label="姓名:" prop="userRealName">
          <el-input v-model="form.userRealName" size="mini" />
        </el-form-item>
        <el-form-item label="密码:" prop="userPwd">
          <el-input v-model="form.userPwd" size="mini" />
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
import { professionlist, classListByKeyword, studentListByKeyword, studentSaveOrUpdate, studentDelete } from '@/api/system'
import upload from '@/components/Upload/upload'

export default {
  name: 'Index',
  components: { upload },

  data() {
    return {
      luru: false,

      title: '',
      count: 0,
      banji: [],
      zhuanye: [],
      region1: '',
      region3: '',
      region4: '',
      dialogVisible: false,
      form: {},
      currentPage3: 1,
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      rules: {
        userRealName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    region1() {
      this.getList(this.currentPage, this.pageSize)
    },
    region3() {
      this.getList(this.currentPage, this.pageSize)
    },
    region4() {
      this.getList(this.currentPage, this.pageSize)
    }
  },
  created() {
    this.getList(1, 10)
    professionlist({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.zhuanye = data.data.list
    })
    classListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.banji = data.data.list
    })
  },
  methods: {
    modify(val) {
      this.emit
      this.form = val
      this.title = '修改学生信息'
      this.dialogVisible = true
    },

    delete_(val) {
      this.$confirm('此操作将永久删除学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        studentDelete({ userId: val.userId }).then(data => {
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
          this.zhuanye.forEach(data => {
            if (this.form.studentProfessionId == data.professionId) {
              this.form.studentProfession = data.professionName
            }
          })
          this.banji.forEach(data => {
            if (this.form.studentClassId == data.classId) {
              this.form.studentClass = data.className
            }
          })
          studentSaveOrUpdate(this.form).then(data => {
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageSize)
    },
    getList(currentPage, pageSize,) {
      studentListByKeyword({ currentPage: currentPage, pageSize: pageSize, professionId: this.region1, classId: this.region3, keyword: this.region4 }).then(data => {
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
    margin-top: 6px;
  }
  .top .el-form-item,.top .el-input.ipt{
    float: left;
  }
  .tab {
    padding: 0 44px 44px 44px;
  }
  .pag {
    padding-top: 30px;
    text-align: center;
  }
  .btn {
    float: right;
    margin-top: 6px;
  }
.wpr{
  background-color: #fff;
}
</style>
