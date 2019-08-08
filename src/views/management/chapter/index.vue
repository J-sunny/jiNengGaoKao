<template>
  <div class="box_r">
    <div class="wpr">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :xl="4" :lg="6">
            <el-form-item label="科目">
              <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
                <el-option v-for="item in kemuList" :label="item.subjectName" :value="item.subjectId" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="4" :lg="6">
            <el-form-item label="教材">
              <el-select v-model="teachingMaterialId" size="mini" placeholder="请选择教材">
                <el-option v-for="item in tableData" :label="item.teachingMaterialName" :value="item.teachingMaterialId" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="nr">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="教材名称：">
            <span v-for="item in tableData" v-if="item.teachingMaterialId==teachingMaterialId">{{ item.teachingMaterialName }}</span>
          </el-form-item>
          <el-form-item label="教材章节：">
            <el-input v-model="zhangjieming" class="ipt" size="mini" />
            <el-button type="primary" size="mini" @click="tianjiazhang(teachingMaterialId,zhangjieming)">添加章</el-button>
          </el-form-item>
        </el-form>
        <ul class="list">
          <li v-for="(item,index) in zhangjieList">
            <div class="f">
              <span class="fl">{{ index+1 }}. {{ item.chapterName }}</span>
              <span class="fr">
                <div style="position: relative">
                  <el-input v-if="item.flag" v-model="childChapterName" size="mini" class="ipt_ ipx" />
                  <el-button v-if="!item.flag" type="primary" plain icon="el-icon-circle-plus-outline" size="mini" @click="item.flag=!item.flag">添加节</el-button><el-button v-if="item.flag" type="primary" plain size="mini" @click="item.flag=!item.flag,tianjiajie(childChapterName,item.chapterId)">添加</el-button><el-button type="info" plain size="mini" @click="shanchuzhang(item.chapterId)">删除</el-button>
                </div>
              </span>
            </div>
            <div class="z">
              <ul>
                <li v-for="(val,index) in item.childChapters" class="lists"><span>﻿1.{{ index+1 }}  {{ val.childChapterName }}</span>             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <el-button class="fr" type="info" plain size="mini" @click="shuanchujie(val.childChapterId)">删除</el-button>
                </li>
              </ul>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { subjectListByKeyword } from '@/api/Subject'
import { teachingMaterialListByKeyword, listByMaterialId, chapterSave, chapterDelete, childChapterSave, childChapterDelete } from '@/api/management'

export default {
  name: 'Index',
  data() {
    return {
      form: {},
      kemuList: [],
      subjectId: null,
      tableData: [],
      teachingMaterialId: null,
      zhangjieming: '',
      zhangjieList: [],
      childChapterName: ''
    }
  },
  watch: {
    subjectId() {
      this.getList()
    },
    teachingMaterialId() {
      this.getzhangjie()
    }
  },
  created() {
    subjectListByKeyword({ currentPage: 1, pageSize: 99999999 }).then(data => {
      this.kemuList = data.data.list
      this.subjectId = data.data.list[0].subjectId
    })
  },
  methods: {
    shuanchujie(val) {
      childChapterDelete({ childChapterId: val }).then(data => {
        this.getzhangjie()
      })
    },
    tianjiajie(val, id) {
      childChapterSave({ childChapterName: val, parentChapterId: id }).then(data => {
        this.getzhangjie()
      })
    },
    shanchuzhang(val) {
      chapterDelete({ chapterId: val }).then(data => {
        this.getzhangjie()
      })
    },
    tianjiazhang(val, zhangjieming) {
      chapterSave({ teachingMaterialId: val, chapterName: zhangjieming }).then(data => {
        this.getzhangjie()
      })
    },
    getzhangjie() {
      listByMaterialId({ materialId: this.teachingMaterialId }).then(data => {
        data.data[0].chapters.forEach(val => {
          val.flag = false
        })
        this.zhangjieList = data.data[0].chapters
      })
    },
    getList() {
      teachingMaterialListByKeyword({ currentPage: 1, pageSize: 9999999, subjectId: this.subjectId }).then(data => {
        this.tableData = data.data.list
        if (this.tableData.length != 0) {
          this.teachingMaterialId = data.data.list[0].teachingMaterialId
        }
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
  .ipt{
    width: 400px;
    margin-bottom: 22px;
  }
  .nr{
    padding: 32px;
    background-color:#FAFAFA ;
    border: 1px #ccc solid;
  }
  .list>li{
    overflow: hidden;
    padding-bottom: 20px;
  }
  .list{
    padding-top: 10px;
    padding-left: 120px;
    max-width: 1200px;
  }
  .f{
    overflow: hidden;
  }
  .ipt_{
    float: left;
  }
  .ipx{
    width: 300px;
    padding-right: 10px;
  }
  .z{
    padding-left: 20px;
  }
  .lists{
    line-height: 32px;
  }
</style>
