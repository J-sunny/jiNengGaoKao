<template>
  <div class="box_r">
    <div class="wpr">
      <p>科目：  <el-select v-model="subjectId" size="mini" placeholder="请选择">
        <el-option
          v-for="item in kemuList"
          :key="item.subjectId"
          :label="item.subjectName"
          :value="item.subjectId"
        >{{ item.subjectName }}
        </el-option>
      </el-select></p>
      <br>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="examPaperName"
          label="考试名称"
        />
        <el-table-column
          prop="examAverage"
          label="平均分"
        />
        <el-table-column
          prop="hightScore"
          label="最高分"
        />
        <el-table-column
          prop="lowScore"
          label="最低分"
        />
        <el-table-column
          prop="lowThanAverageCount"
          label="低于班级平均分人数"
        />
        <el-table-column
          prop="heightThanAverageCount"
          label="高于班级平均分人数"
        />
        <el-table-column
          prop="heightThanAverageCount"
          label="操作"
          width="60px"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="xiangqing(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { statisticslistRelease } from '@/api/Statistics'
import { subjectListByKeyword } from '@/api/Subject'
export default {
  name: 'Index',
  data() {
    return {
      currentPage4: 1,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [],
      subjectId: null,
      flag: false,
      count: 0,
      kemuList: [],
      pageSize: 10,
      currentPage: 1
    }
  },
  watch: {
    subjectId() {
      this.getList()
    }
  },
  created() {
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.kemuList = data.data.list
    })
    this.getList()
  },
  methods: {
    xiangqing(val) {
      this.$store.state.XSdetails = val
      window.location = '#/XSdetails'
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
      statisticslistRelease({ currentPage: this.currentPage, pageSize: this.pageSize, subjectId: this.subjectId }).then(data => {
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
