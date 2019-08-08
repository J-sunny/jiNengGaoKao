<template>
  <div class="box_r">
    <div class="wpr">
      <p class="top"><span>作业名称:</span>{{ utelsix.examPaperName }}</p>
      <p class="top"><span>所属科目:</span>﻿{{ utelsix.subjectName }}</p>
      <p class="top"><span>所属教材:</span>《“接触+非接触”式交互界面的设计与研究》</p>
      <p class="top"><span>考试时间:</span>{{ utelsix.startTime }}-{{ utelsix.endTime }}</p>
      <div class="btn">
        <div class="fl" :class="flag==0?'cav':''" @click="flag=1">已提交</div>
        <div class="fl" :class="flag==1?'cav':''" @click="flag=0">未提交</div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="userRealName"
          label="学生姓名"
        />
        <el-table-column
          prop="userId"
          label="学号"
        />
        <el-table-column
          prop="className"
          label="班级"
        />
        <el-table-column
          v-if="flag==1"
          label="状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isReview==2">已批阅</span>
            <span v-if="scope.row.isReview==0">未批阅</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="flag==1"
          label="操作"
        >
          <template slot-scope="scope">
            <a v-if="scope.row.isReview==0"><el-button type="text" size="small" @click="kaishipiyue(scope.row,false)">批阅</el-button></a>
            <a v-if="scope.row.isReview==2"><el-button type="text" size="small" @click="kaishipiyue(scope.row,true)">查看</el-button></a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="批阅试卷"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="1200px"
    >
      <div v-if="dialogVisible">
        <p class="title">姓名：<span>{{ xuesheng.userRealName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学号：<span>{{ xuesheng.userId }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年级：<span>{{ xuesheng.className }}</span></p>
        <p class="title">做题详情：（共{{ timuList.length }}题）</p>
        <div v-if="flags" class="timu">
          <singleElection v-if="timu.sysQuestion.questionType==0|timu.sysQuestion.questionType==1" ref="clesf" :msf="msf" :fenshu="fenshu" :timu="timu" @tijiao="tijiao" />
          <fillInTheBlanks v-if="timu.sysQuestion.questionType==2|timu.sysQuestion.questionType==3" ref="clesf" :msf="msf" :fenshu="fenshu" :timu="timu" @tijiao="tijiao" />
          <comprehensive v-if="timu.sysQuestion.questionType==4" ref="clesf" :msf="msf" :release-id="releaseId" :student-id="studentId" :ziti="timuList[id]" :fenshu="fenshu" :timu="timu" @tijiao_="tijiao_" />
        </div>
        <div class="btns">
          <el-button class="fl el-icon-d-arrow-left" type="primary" size="mini" :disabled="id==0" @click="id=id-1">上一题</el-button>
          <el-button v-if="id!=timuList.length-1" class="fr" type="primary" size="mini" @click="xiayiti(0)">下一题<i class="el-icon-d-arrow-right" /></el-button>
          <el-button v-if="id==timuList.length-1" class="fr" type="primary" size="mini" @click="xiayiti(1)">结束批阅<i class="el-icon-d-arrow-right" /></el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStudentByReleaseId } from '@/api/management'
import { releaseIdsByReleaseId, reviewget, reviewread, readOneStudentOver } from '@/api/testPaper'
import { startReview, releaseget } from '@/api/Subject'
import singleElection from './type/singleElection'
import fillInTheBlanks from './type/fillInTheBlanks'
import comprehensive from './type/comprehensive'
export default {
  name: 'ViewOperation',
  components: { singleElection, fillInTheBlanks, comprehensive },
  data() {
    return {
      msf: false,
      flag: 1,
      tableData: [],
      releaseId: null,
      dialogVisible: false,
      timuList: [],
      id: 0,
      timu: {},
      flags: false,
      fenshu: '',
      xuesheng: {},
      utelsix: {}
    }
  },
  watch: {
    flag() {
      this.getList()
    },
    id() {
      this.geitimu()
    }
  },
  created() {
    var str = location.href // 取得整个地址栏
    var num = str.indexOf('?')
    str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]
    this.releaseId = str
    startReview({ releaseId: this.releaseId }).then(data => {
      releaseget({ releaseId: this.releaseId }).then(val => {
        this.utelsix = val.data
        this.getList()
      })
    })
  },
  methods: {
    tijiao_() {
      if (this.msf) {
        if (this.flsfe == 0) {
          this.id++
        } else {
          this.dialogVisible = false
        }
        return false
      }
      if (this.flsfe == 0) {
        this.id++
      } else {
        readOneStudentOver({ releaseId: this.releaseId, userId: this.studentId }).then(data => {
          this.getList()
          this.dialogVisible = false
        })
      }
    },
    tijiao(val) {
      if (this.msf) {
        if (this.flsfe == 0) {
          this.id++
        } else {
          this.dialogVisible = false
        }
        return false
      }
      val.studentId = this.studentId
      val.questionId = this.timuList[this.id].questionId
      reviewread(val).then(data => {
        if (this.flsfe == 0) {
          this.id++
        } else {
          readOneStudentOver({ releaseId: this.releaseId, userId: this.studentId }).then(data => {
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    xiayiti(val) {
      this.flsfe = val
      this.$refs.clesf.xiayiti_()
    },
    geitimu() {
      this.flags = false
      this.fenshu = this.timuList[this.id].fenshu
      reviewget({ questionIds: this.timuList[this.id].questionId, releaseId: this.releaseId, studentId: this.studentId }).then(data => {
        this.timu = data.data[0]
        this.flags = true
      })
    },
    kaishipiyue(val, msf) {
      this.msf = msf
      this.studentId = val.userId
      this.xuesheng = val
      releaseIdsByReleaseId({ releaseId: this.releaseId }).then(data => {
        this.timuList = JSON.parse(data.data.questionContent)
        this.geitimu()
      })
      this.dialogVisible = true
    },
    getList() {
      getStudentByReleaseId({ releaseId: this.releaseId, isSubmit: this.flag }).then(data => {
        this.tableData = data.data
      })
    }
  }
}
</script>

<style scoped>
  .top{
    font-size: 14px;
    color: #666;
    line-height: 32px;
  }
  .top span{
    font-weight: 700;
    color: #333;
  }
  .wpr {
    background-color: #fff;
    padding: 32px;
    box-sizing: border-box;
  }
  .btn{
    width: 320px;
    height: 40px;
    background-color: #dddddd;
  }
  .btn div{
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border: 1px #ccc solid;
    cursor:pointer;
  }
  div.cav{
    background-color: #fff;
    color: #666;
  }
  .timu{
    border: 1px #ccc solid;
    padding: 10px;
    box-sizing: border-box;
  }
  .btns{
    padding: 15px;
    position: relative;
    overflow: hidden;
  }
  .title{
    line-height: 32px;
  }
</style>
