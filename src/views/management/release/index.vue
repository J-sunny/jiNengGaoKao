<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="40px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="科目">
              <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
                <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="教材">
              <el-select v-model="teachingMaterialId" size="mini" placeholder="请先选择科目">
                <el-option v-for="item in jiaocailist" :label="item.teachingMaterialName" :value="item.teachingMaterialId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="章">
              <el-select v-model="chapterId" size="mini" placeholder="请先选择教材">
                <el-option v-for="item in zhangjieList" :label="item.chapterName" :value="item.chapterId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="节">
              <el-select v-model="childChapterId" size="mini" placeholder="请先选择章">
                <el-option v-for="item in jieList" :label="item.childChapterName" :value="item.childChapterId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态">
              <el-select v-model="zhuangtai" size="mini">
                <el-option label="已发布" value="1" />
                <el-option label="未发布" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="fr cfx">
            <div class="fr">
              <a href="#/newRelease"><el-button type="primary" size="mini" round>新建随堂练习</el-button></a>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="序号"
          type="index"
          width="55"
        />
        <el-table-column
          v-if="zhuangtai==0"
          prop="examName"
          label="作业名称"
          width="180"
        />
        <el-table-column
          v-if="zhuangtai==1"
          prop="examPaperName"
          label="作业名称"
          width="180"
        />
        <el-table-column
          prop="subjectName"
          label="所属科目"
        />
        <el-table-column
          prop="releaseTime"
          label="发布时间"
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
          v-if="zhuangtai==0"
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dialogVisible=true,shijuanid=scope.row.examPaperId,subjectName=scope.row.subjectName,examPaperName=scope.row.examName">发布</el-button>
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
      title="发布随堂测试"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="560px"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="专业:" prop="studentProfessionId">
          <el-select v-model="professionIds" multiple size="mini" placeholder="请选择">
            <el-option
              v-for="item in zhuanye"
              :key="item.professionId"
              :label="item.professionName"
              :value="item.professionId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级:" prop="subjectName">
          <el-select v-model="classIds" multiple size="mini" placeholder="请选择">
            <el-option
              v-for="item in banji"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间:" prop="studentProfessionId">
          <el-date-picker
            v-model="startTime"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            type="datetime"
            placeholder="开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间:" prop="studentProfessionId">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            placeholder="结束时间"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" :loading="loading" @click="fabu">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>

  </div>
</template>

<script>
import { subjectListByKeyword } from '@/api/Subject'
import { listByKeywordes, releaseSaveOrUpdate, listByKeyword } from '@/api/testPaper'
import { professionlist, classListByKeyword } from '@/api/system'

import { teachingMaterialListByKeyword, listByMaterialId } from '@/api/management'
export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      zhuangtai: '1',
      shijuanid: '',
      startTime: '',
      endTime: '',
      classIds: [],
      banji: [],
      professionIds: [],
      zhuanye: [],
      dialogVisible: false,
      count: 0,
      currentPage3: 1,
      childChapterId: null,
      jieList: [],
      chapterId: null,
      zhangjieList: [],
      jiaocailist: [],
      tableData: [],
      kemuList: [],
      subjectId: null,
      zhishidianList: [],
      pointId: null,
      zipointId: null,
      zizhishidianList: [],
      teachingMaterialId: null,
      currentPage: 1,
      subjectName: '',
      examPaperName: '',
      form: {
        dig: false
      }
    }
  },
  watch: {
    subjectId() {
      teachingMaterialListByKeyword({ currentPage: 1, pageSize: 99999999, subjectId: this.subjectId }).then(data => {
        this.jiaocailist = data.data.list
        this.currentPage3 = 1
        this.getList(1, 10)
      })
    },
    zhuangtai() {
      this.currentPage3 = 1
      this.getList(1, 10)
    },
    teachingMaterialId() {
      listByMaterialId({ materialId: this.teachingMaterialId }).then(data => {
        this.zhangjieList = data.data[0].chapters
        this.currentPage3 = 1
        this.getList(1, 10)
      })
    },
    chapterId() {
      this.zhangjieList.forEach(data => {
        if (data.chapterId == this.chapterId) {
          this.jieList = data.childChapters
          this.currentPage3 = 1
          this.getList(1, 10)
        }
      })
    }
  },
  created() {
    this.getList(1, 10)
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      if (data.code == 200) {
        this.kemuList = data.data.list
      }
    })
    professionlist({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.zhuanye = data.data.list
    })
    classListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.banji = data.data.list
    })
  },
  methods: {
    delete_(val) {
    },
    fabu() {
      this.loading = true
      releaseSaveOrUpdate({
        classIds: this.classIds.join(','),
        professionIds: this.professionIds.join(','),
        startTime: this.startTime,
        endTime: this.endTime,
        subjectName: this.subjectName,
        examPaperName: this.examPaperName,
        examType: '0',
        examPaperId: this.shijuanid
      }).then(data => {
        this.$message.success('发布成功')
        this.dialogVisible = false
        this.loading = false
      })
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.getList(val, 10)
    },
    getList(currentPage, pageSize) {
      if (this.zhuangtai == 1) {
        listByKeywordes({ currentPage: currentPage, pageSize: pageSize, subjectId: this.subjectId, keyword: this.keyword, examType: '0' }).then(data => {
          this.tableData = data.data.list
          this.count = data.data.count
        })
      } else {
        listByKeyword({ currentPage: currentPage, pageSize: pageSize, subjectId: this.subjectId, keyword: this.keyword, examType: '0' }).then(data => {
          this.tableData = data.data.list
          this.count = data.data.count
        })
      }
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
  .ipt{
    margin-top: 3px;
    padding-left: 5px;
  }
</style>
