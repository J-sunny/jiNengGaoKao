<template>
  <div class="box_r">
    <div class="wpr">
      <p>科目：  <el-select v-model="subjectId" size="mini" placeholder="全部">
        <el-option
          v-for="item in kemuList"
          :key="item.subjectId"
          :label="item.subjectName"
          :value="item.subjectId"
        >{{ item.subjectName }}
        </el-option>
      </el-select></p>
      <div class="tizi">
        <el-row v-if="flag">
          <el-col v-if="tableDataTOP.length>1" class="jie" :span="8"><img src="../../../icons/png/t2.png" alt="">
            <div class="ztn">
              <p>知识点：{{ tableDataTOP[1].pointName }}</p>
              <p class="bili">做对次数：{{ tableDataTOP[1].rightCount }}次<span>做题总次数：{{ tableDataTOP[1].writeCount }}次</span></p>
              <div class="jindu">
                <el-progress :percentage="50" :show-text="false" />

              </div>
            </div>
          </el-col>
          <el-col v-if="tableDataTOP.length>0" class="jie zhong" :span="8"><img src="../../../icons/png/t1.png" alt="">
            <div class="ztn">
              <p>知识点：{{ tableDataTOP[0].pointName }}</p>
              <p class="bili">做对次数：{{ tableDataTOP[0].rightCount }}次<span>做题总次数：{{ tableDataTOP[0].writeCount }}次</span></p>
              <div class="jindu">
                <el-progress :percentage="50" :show-text="false" />

              </div>
            </div>
          </el-col>
          <el-col v-if="tableDataTOP.length>2" class="jie" :span="8"><img src="../../../icons/png/t3.png" alt="">
            <div class="ztn">
              <p>知识点：{{ tableDataTOP[2].pointName }}</p>
              <p class="bili">做对次数：{{ tableDataTOP[2].rightCount }}次<span>做题总次数：{{ tableDataTOP[2].writeCount }}次</span></p>
              <div class="jindu">
                <el-progress :percentage="50" :show-text="false" />

              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="排名"
        />
        <el-table-column
          prop="pointName"
          label="知识点名称"
        />
        <el-table-column
          prop="subjectId"
          label="所属科目"
        >
          <template slot-scope="scope">
            <span v-for="item in kemuList" v-if="item.subjectId==scope.row.subjectId">{{ item.subjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rightCount"
          label="做对次数"
        />
        <el-table-column
          prop="writeCount"
          label="做题总次数"
        />
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
import { statisticsListPoint } from '@/api/Statistics'
import { subjectListByKeyword } from '@/api/Subject'
import { knowledgeList } from '@/api/knowledgePoints'

export default {
  name: 'Index',
  data() {
    return {
      flag: false,
      kemuList: [],
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
      currentPage: 1,
      pageSize: 10,
      subjectId: null,
      count: 0,
      tableDataTOP: []
    }
  },
  watch: {
    subjectId() {
      this.getList()
      this.getListTOP()
    }
  },
  created() {
    this.subjectId = this.$route.query.subjectId
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      // console.log(data)
      this.kemuList = data.data.list
    })
    this.getList()
    this.getListTOP()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getListTOP() {
      this.flag = false
      statisticsListPoint({ currentPage: 1, pageSize: 3, subjectId: this.subjectId }).then(data => {
        this.tableDataTOP = data.data.list
        this.flag = true
      })
    },
    getList() {
      statisticsListPoint({ currentPage: this.currentPage, pageSize: this.pageSize, subjectId: this.subjectId }).then(data => {
        console.log(data)
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
  .tizi{
    padding:32px;
  }
  .tizi img{
    width: 100%;
    height: 100%;
  }
  .jie{
    height: 138px;
    padding: 10px;
    position: relative;
  }
  .zhong{
    position: relative;
    top: -15px;
  }
  .ztn{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 32px 0 0 62px;
    color: #fff;
    font-size: 14px;
  }
  .bili{
    margin-top: 35px;
    padding-bottom: 10px;
  }
  .bili span{
    float: right;
    padding-right: 32px;
  }
  .jindu{
    padding-right: 32px;
    box-sizing: border-box;
  }
</style>
