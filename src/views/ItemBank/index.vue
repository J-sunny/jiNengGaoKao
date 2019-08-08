<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :xl="4" :lg="6">
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
          <el-col :xl="4" :lg="6">
            <el-form-item label="知识点">
              <el-select v-model="pointId" size="mini" placeholder="请选择活知识点">
                <el-option
                  v-for="item in zhishidianList"
                  :key="item.pointId"
                  :label="item.pointName"
                  :value="item.pointId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="6">
            <el-form-item label="子知识点">
              <el-select v-model="zipointId" size="mini" placeholder="请选择子知识点">
                <el-option
                  v-for="item in zizhishidianList"
                  :key="item.pointId"
                  :label="item.pointName"
                  :value="item.pointId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="6">
            <el-form-item label="难易度">
              <span class="nanyi">
                <el-rate
                  v-model="nanyidu"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
              </span>
            </el-form-item>
          </el-col>
          <el-tag>已查出:{{ count }}个题目</el-tag>
        </el-row>
        <div class="btn">
          <el-button class="fl" type="primary" size="mini" plain round @click="delete_(ids)">批量删除</el-button>

          <div class="fr">
            <a href="#/ItemBank/Entry"><el-button type="primary" size="mini" round>录入题目</el-button></a>
            <el-button type="primary" size="mini" round @click="luru=!luru">批量录入</el-button>
          </div>
        </div>
        <upload v-if="luru" :upload-type="2" @quxiao="luru=!luru" />

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
            width="40"
          />
          <el-table-column
            prop="date"
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            prop="questionTitle"
            label="题目名称"
            width="180"
          >
            <template slot-scope="scope">
              <p v-html="scope.row.questionTitle" />
            </template>

          </el-table-column>
          <el-table-column
            prop="subjectId"
            label="所属科目"
          >
            <template slot-scope="scope">
              <span v-for="item in kemuList" v-if="item.subjectId==scope.row.subjectId">{{ item.subjectName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pointName"
            label="知识点"
          />
          <el-table-column
            prop="secondaryPointId"
            label="子知识点"
          />
          <el-table-column
            prop="questionType"
            label="题型"
          />
          <el-table-column
            prop="questionAnalysis"
            label="答案解析"
          >
            <template slot-scope="scope">
              <p v-html="scope.row.questionAnalysis" />
            </template>
          </el-table-column>
          <el-table-column
            prop="diffcultLevel"
            label="难易程度"
            width="145px"
          >
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.diffcultLevel"
                disabled
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <a :href="'#/ItemBank/Entry?questionId='+scope.row.questionId"><el-button type="text" size="small">修改</el-button></a>
              <el-button type="text" size="small" @click="delete_(scope.row.questionId)">删除</el-button>
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
import Entry from '@/views/Entry/index'
import { subjectListByKeyword, knowledgePointListBySubjectId } from '@/api/Subject'
import { knowledgePointGet, questionListByKeyword, questionDelete } from '@/api/ItemBank'
import upload from '@/components/Upload/upload'

export default {
  name: 'Index',
  components: { Entry, upload },
  data() {
    return {
      form: {},
      luru: false,
      dialogVisible: false,
      tableData: [],
      currentPage3: 1,
      kemuList: [],
      subjectId: 1,
      zhishidianList: [],
      pointId: '',
      zizhishidianList: [],
      zipointId: '',
      nanyidu: 0,
      currentPage: 1,
      pageSize: 10,
      count: 0,
      ids: ''
    }
  },
  watch: {
    subjectId() {
      this.getList(this.currentPage, this.pageSize)
      knowledgePointListBySubjectId({ subjectId: this.subjectId }).then(data => {
        this.zhishidianList = data.data
      })
    },
    pointId() {
      this.getList(this.currentPage, this.pageSize)
      knowledgePointGet({ parentPointId: this.pointId }).then(data => {
        this.zizhishidianList = data.data
      })
    },
    zipointId() {
      this.getList(this.currentPage, this.pageSize)
    },
    nanyidu() {
      this.getList(this.currentPage, this.pageSize)
    }
  },
  created() {
    this.getList(1, 10)
    this.subjectListByKeyword()
  },
  methods: {
    handleSelectionChange(val) {
      var ids = []
      val.forEach(data => {
        ids.push(data.questionId)
      })
      this.ids = ids.join(',')
    },
    delete_(val) {
      this.$confirm('此操作将永久删除这些题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionDelete({ questionIds: val }).then(data => {
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
      questionListByKeyword({ currentPage: currentPage, pageSize: pageSize, diffcultLevel: this.nanyidu, pointId: this.pointId, secondaryPointId: this.zipointId, subjectId: this.subjectId }).then(data => {
        this.tableData = data.data.list
        this.tableData.map(index => {
          index.questionType == 0 ? index.questionType = '单选' : index.questionType == 1 ? index.questionType = '多选' : index.questionType == 2 ? index.questionType = '填空' : index.questionType == 3 ? index.questionType = '问答' : index.questionType = '综合题'
        })
        this.count = data.data.count
      })
    },
    subjectListByKeyword() {
      console.log(this.kemuList)
				  subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
        this.kemuList = data.data.list
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
  .cfx {
    overflow: hidden;
    padding: 6px 0 16px 0;
  }

  .duoxuan {
    padding:10px 0 0 40px;
  }

  .tab {
    padding: 10px 0 0 40px;
  }
  .nanyi{
    position: relative;
    top: 8px;
  }
  .btn{
    padding-left: 40px;
    overflow: hidden;
  }
</style>
