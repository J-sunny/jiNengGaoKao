<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="科目">
              <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
                <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="value1"
                size="mini"
                type="datetimerange"
                :value-format="'yyyy-MM-dd HH:mm:ss'"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="批阅状态">
              <el-select v-model="state" size="mini" placeholder="请选择状态">
                <el-option label="已批阅" value="2" />
                <el-option label="未批阅" value="0" />
                <el-option label="批阅中" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="keyword" suffix-icon="el-icon-search" type="text" size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="examPaperName"
          label="作业名称"
        />
        <el-table-column
          prop="subjectName"
          label="所属科目"
          width="180"
        />
        <el-table-column
          prop="subjectId"
          label="所属教材"
          width="180"
        />
        <el-table-column
          prop="address"
          label="考试时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}<br>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="examStatus"
          label="状态"
        >
          <template slot-scope="scope">
            <span v-if="state==2">已批阅</span>
            <span v-if="state==0">未批阅</span>
            <span v-if="state==1">批阅中</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <a v-if="state==0" :href="'#/viewOperation?'+scope.row.releaseId"><el-button type="text" size="small">批阅</el-button></a>
            <a v-if="state==1" :href="'#/viewOperation?'+scope.row.releaseId"><el-button type="text" size="small">继续批阅</el-button></a>
            <a v-if="state==2" :href="'#/viewOperation?'+scope.row.releaseId"><el-button type="text" size="small">查看</el-button></a>
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
</template>

<script>
import { subjectListByKeyword } from '@/api/Subject'
import { releaselistByReview } from '@/api/testPaper'

export default {
  name: 'Index',
  data() {
    return {
      count: 0,
      state: '0',
      form: {},
      keyword: '',
      value1: [],
      subjectId: null,
      kemuList: [],
      tableData: [],
      currentPage3: 1
    }
  },
  watch: {
    state() {
      this.currentPage3 = 1
      this.getList(1, 10)
    },
    keyword() {
      this.currentPage3 = 1
      this.getList(1, 10)
    },
    value1() {
      this.currentPage3 = 1
      this.releaseTime = this.value1[0] + '/' + this.value1[1]
      this.getList(1, 10)
    },
    subjectId() {
      this.currentPage3 = 1
      this.getList(1, 10)
    }
  },
  created() {
    this.getList(1, 10)
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      if (data.code == 200) {
        this.kemuList = data.data.list
      }
    })
  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange(val) {
      this.getList(val, 10)
    },
    getList(currentPage, pageSize) {
      releaselistByReview({ currentPage: currentPage, pageSize: pageSize, examType: '0', subjectId: this.subjectId, releaseTime: this.releaseTime, keyword: this.keyword, releaseReviewStatus: this.state }).then(data => {
        this.tableData = data.data.list
        this.count = data.data.count
      })
    }
  }
}
</script>

<style scoped>
  .wpr {
    background-color: #fff;
    padding: 32px;
    box-sizing: border-box;
  }
</style>
