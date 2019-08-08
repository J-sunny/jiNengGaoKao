<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col v-if="kemuList.length!=0" :xl="4" :lg="6">
            <el-form-item label="科目">
              <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
                <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="6">
            <el-form-item label="">
              <el-input v-model="keyword" size="mini" type="text" suffix-icon="el-icon-search" />
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="6" class="fr tr">
            <el-button type="primary" size="mini" plain round @click="dialogVisible=true">批量绑定科目</el-button><el-button type="primary" size="mini" round @click="title='创建教材',subjectId=null,teachingMaterialId=null,teachingMaterialName=null,dialogVisible1=true">创建教材</el-button>
          </el-col>
        </el-row>
        <el-row />
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
            width="45"
          />
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column
            prop="subjectId"
            label="科目"
            width="180"
          >
            <template slot-scope="scope">
              <span v-for="item in kemuList" v-if="item.subjectId==scope.row.subjectId">{{ item.subjectName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="teachingMaterialName"
            label="教材名称"
          />
          <el-table-column
            prop="address"
            width="100"
            label="操作"
          >
            <template slot-scope="scope">
              <a><el-button type="text" size="small" @click="title='修改教材信息',teachingMaterialName=scope.row.teachingMaterialName,teachingMaterialId=scope.row.teachingMaterialId,subjectId=scope.row.subjectId,dialogVisible1=true">修改</el-button></a>
              <el-button type="text" size="small" @click="Delete(scope.row.teachingMaterialId)">删除</el-button>
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
      title="绑定科目"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="460px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="教材名称:">
          ﻿<span v-for="item in pilaing.teachingMaterialName">{{ item }},</span>
          ﻿<span v-if="pilaing.teachingMaterialName==undefined||pilaing.teachingMaterialName.length==0">暂未选择需要绑定的教材</span>
        </el-form-item>
        <el-form-item label="所属科目:">
          <el-select v-model="subjectIds" size="mini" placeholder="请选择科目">
            <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="piliangbangding">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="title"
      :append-to-body="true"
      :visible.sync="dialogVisible1"
      width="460px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属科目:">
          <el-select v-if="dialogVisible1" v-model="subjectId" size="mini" placeholder="请选择科目">
            <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
          </el-select>
        </el-form-item>
        <el-form-item label="教材名称:">
          ﻿<el-input v-model="teachingMaterialName" size="mini" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="add">确 定</el-button>
        <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { subjectListByKeyword } from '@/api/Subject'
import { teachingMaterialListByKeyword, teachingMaterial, teachingMaterialDelete, BindSubjectBatch } from '@/api/management'
export default {
  name: 'Index',
  data() {
    return {
      title: '',
      dialogVisible1: false,
      dialogVisible: false,
      tableData: [],
      form: {},
      kemuList: [],
      subjectId: null,
      keyword: '',
      teachingMaterialName: '',
      currentPage3: 1,
      currentPage: 1,
      count: 0,
      teachingMaterialId: null,
      pilaing: {},
      subjectIds: null
    }
  },
  watch: {
    subjectId() {
      this.getList(this.currentPage, 10)
    },
    keyword() {
      this.getList(this.currentPage, 10)
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
    piliangbangding() {
      BindSubjectBatch({ subjectId: this.subjectIds, teachingMaterialIds: this.pilaing.teachingMaterialId.join(',') }).then(data => {
        if (data.code == 200) {
          this.subjectId = this.subjectIds
          this.dialogVisible = false
        }
      })
    },
    handleSelectionChange(val) {
      var teachingMaterialId = []
      var teachingMaterialName = []
      val.forEach(data => {
        teachingMaterialId.push(data.teachingMaterialId)
        teachingMaterialName.push(data.teachingMaterialName)
      })
      this.pilaing = {
        teachingMaterialId: teachingMaterialId,
        teachingMaterialName: teachingMaterialName
      }
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.getList(val, 10)
      this.currentPage = val
    },
    Delete(val) {
      this.$confirm('此操作将永久删除此教材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teachingMaterialDelete({ teachingMaterialId: val }).then(data => {
          if (data.code == 200) {
            this.getList(this.currentPage, 10)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add() {
      teachingMaterial({ subjectId: this.subjectId, teachingMaterialName: this.teachingMaterialName, teachingMaterialId: this.teachingMaterialId }).then(data => {
        if (data.code == 200) {
          this.getList(this.currentPage, 10)
          this.dialogVisible1 = false
        }
      })
    },
    getList(currentPage, pageSize) {
      teachingMaterialListByKeyword({ currentPage: currentPage, pageSize: pageSize, subjectId: this.subjectId, keyword: this.keyword }).then(data => {
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
  .duoxuan {
    padding:10px 0 0 40px;
  }
  .tr{
    text-align: right;
  }
</style>
