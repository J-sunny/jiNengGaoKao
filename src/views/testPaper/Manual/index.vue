<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="科目">
              <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
                <el-option
                  v-for="item in kemuList"
                  :key="item.subjectId"
                  :label="item.subjectName"
                  :value="item.subjectId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--        <el-col :xl="4" :lg="6" v-if="false">-->
          <!--          <el-form-item label="知识点">-->
          <!--            <el-select size="mini" v-model="pointId" placeholder="请选择知识点">-->
          <!--              <el-option :label="item.pointName" :value="item.pointId" v-for="item in zhishidianList"-->
          <!--                         :key="item.pointId"></el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--        </el-col>-->
          <!--        <el-col :xl="4" :lg="6" v-if="false">-->
          <!--          <el-form-item label="子知识点">-->
          <!--            <el-select size="mini" v-model="zipointId" placeholder="请选择子知识点">-->
          <!--              <el-option :label="item.pointName" :value="item.pointId" v-for="item in zizhishidianList"-->
          <!--                         :key="item.pointId"></el-option>-->
          <!--            </el-select>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--        </el-col>-->
          <el-col :span="4">
            <el-form-item label="">
              <el-input v-model="keyword" size="mini" type="text" suffix-icon="el-icon-search" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="8" :lg="6" class="fr cfx">
            <div class="fr">
              <!--            <a href="#/autoGenerating"> <el-button type="primary" size="mini" round>新建自动组卷</el-button></a>-->
              <a href="#/newlyBuild"><el-button type="primary" size="mini" round>新建手动组卷</el-button></a>
            </div>
          </el-col>
          <el-col :xl="6" :lg="6">
            <div class="fl piliang">
              <el-button type="primary" size="mini" plain round @click="pldel">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="tab">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="examName"
            label="试卷名称"
          />
          <el-table-column
            prop="subjectName"
            label="所属科目"
          />
          <el-table-column
            prop="totalScore"
            label="总分"
          />
          <el-table-column
            prop="totalQuestionCount"
            label="题目数"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="80px"
          >
            <template slot-scope="scope">
              <!--            <a ><el-button type="text"size="small">修改</el-button></a>-->
              <el-button type="text" size="small" @click="delete_([scope.row])">删除</el-button>
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
  </div>
</template>

<script>
import { subjectListByKeyword, knowledgePointListBySubjectId } from '@/api/Subject'
import { listByKeyword, deleteBatch } from '@/api/testPaper'
export default {
  name: 'Index',
  props: ['zidong'],
  data() {
    return {
      keyword: '',
      subjectId: '',
      tableData: [],
      currentPage3: 1,
      dialogVisible: false,
      form: {},
      kemuList: [],
      pageSize: 10,
      currentPage: 1,
      count: 0,
      fel: []
    }
  },
  watch: {
    subjectId() {
      this.getList(this.currentPage, this.pageSize)
    },
    keyword() {
      this.getList(this.currentPage, this.pageSize)
    }
  },
  created() {
    this.getList(1, 10)
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.kemuList = data.data.list
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.fel = val
    },
    pldel() {
      this.delete_(this.fel)
    },
    delete_(val) {
      var arr = []
      val.forEach(data => {
        arr.push(data.examPaperId)
      })

      this.$confirm('此操作将永久删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatch({ examPaperIds: arr.join(',') }).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList(this.currentPage, this.pageSize)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.getList(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList(val, this.pageSize)
    },
    getList(currentPage, pageSize) {
      listByKeyword({ currentPage: currentPage, pageSize: pageSize, subjectId: this.subjectId, keyword: this.keyword, examType: '1' }).then(data => {
        this.tableData = data.data.list
        this.count = data.data.count
      })
    }
  }
}
</script>

<style scoped>
.wpr{
  background-color: #fff;
  padding: 32px;
}
.cfx {
  overflow: hidden;
  padding: 6px 0 16px 0;
}
.duoxuan {
  padding:10px 0 0 40px;
}
.tab {
  padding: 0 0 0 40px;
}
  .piliang{
    padding-left: 40px;
  }
</style>
