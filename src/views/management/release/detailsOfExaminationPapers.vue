<template>
  <div class="wpr">
    <div class="sm">
      <p><span class="title">作业名称: </span> {{ this.timuObj.title }}</p>
      <p><span class="title">所属科目: </span>
        <span v-for="item in kemuList"><span v-if="item.subjectId==timuObj.subjectId">{{ item.subjectName }}</span></span>
      </p>
      <p><span class="title">所属教材: </span>
        <span v-for="item in jiaocaiList"><span v-if="item.teachingMaterialId==timuObj.teachingMaterialId">{{ item.teachingMaterialName }}</span></span>
      </p>
      <p><span class="title">所属章节: </span>
        <span v-for="item in zhangjieList"><span v-if="item.chapterId==timuObj.chapterId">{{ item.chapterName }}</span></span>
        <span v-for="item in jieList"><span v-if="item.childChapterId==timuObj.childChapterId">{{ item.childChapterName }}</span></span>
      </p>
      <p><span class="title">总分: </span>﻿ {{ this.timuObj.zongfen }}分</p>
    </div>
    <div class="lx">
      <span>单选题</span> (共{{ this.timuObj.danxuan.length }}题）
    </div>
    <div class="xtk">
      <ul>
        <li v-for="(item,index) in danxuan">
          <p>﻿{{ index+1 }}.<span class="tigan" v-html="item.item.questionTitle" /></p>
          <div class="xiantiao" />
          <p class="xia"><span class="fl">难度系数：</span>
            <el-rate v-model="item.item.diffcultLevel" class="xinx" disabled />
          </p>
        </li>
      </ul>
    </div>

    <div class="lx">
      <span>多选题</span> (共{{ this.timuObj.duoxuan.length }}题）
    </div>
    <div class="xtk">
      <ul>
        <li v-for="(item,index) in duoxuan">
          <p>﻿{{ index+1 }}.<span class="tigan" v-html="item.item.questionTitle" /></p>
          <div class="xiantiao" />
          <p class="xia"><span class="fl">难度系数：</span>
            <el-rate v-model="item.item.diffcultLevel" class="xinx" disabled />
          </p>
        </li>
      </ul>
    </div>

    <div class="lx">
      <span>填空题</span> (共{{ this.timuObj.thisnkong.length }}题）
    </div>
    <div class="xtk">
      <ul>
        <li v-for="(item,index) in thisnkong">
          <p>﻿{{ index+1 }}.<span class="tigan" v-html="item.item.questionTitle" /></p>
          <div class="xiantiao" />
          <p class="xia"><span class="fl">难度系数：</span>
            <el-rate v-model="item.item.diffcultLevel" class="xinx" disabled />
          </p>
        </li>
      </ul>
    </div>

    <div class="lx">
      <span>简答题</span> (共{{ this.timuObj.jianda.length }}题）
    </div>
    <div class="xtk">
      <ul>
        <li v-for="(item,index) in jianda">
          <p>﻿{{ index+1 }}.<span class="tigan" v-html="item.item.questionTitle" /></p>
          <div class="xiantiao" />
          <p class="xia"><span class="fl">难度系数：</span>
            <el-rate v-model="item.item.diffcultLevel" class="xinx" disabled />
          </p>
        </li>
      </ul>
    </div>

    <div class="lx">
      <span>综合题</span> (共{{ this.timuObj.zonghe.length }}题）
    </div>
    <div class="xtk">
      <ul>
        <li v-for="(item,index) in zonghe" class="zh">
          <div class="tigan" v-html="item.item.questionTitle" />
          <div class="xiantiao" />
          <div v-for="(ziti,index) in item.item.ziti">
            <p>{{ index+1 }}. <span class="timuz">[<span v-if="ziti.questionType==0">单选题</span><span v-if="ziti.questionType==1">多选题</span><span v-if="ziti.questionType==2">填空题</span><span v-if="ziti.questionType==3">问答题</span>]</span><span class="tigan" v-html="ziti.questionTitle" /> </p>
            <p class="xia"><span class="fl">难度系数：</span>
              <el-rate v-model="ziti.diffcultLevel" class="xinx" disabled />
            </p>
            <div class="xiantiao" />
          </div>

        </li>
      </ul>
    </div>

    <div class="foter">
      <el-button size="mini" type="primary" @click="baocun">保存</el-button>
      <el-button size="mini" @click="fanhui">返回</el-button>
    </div>
  </div>
</template>

<script>
import { questionGet } from '@/api/ItemBank'
import { examSaveOrUpdate } from '@/api/testPaper'

export default {
  name: 'DetailsOfExaminationPapers',
  props: ['timuObj', 'kemuList', 'jiaocaiList', 'zhangjieList', 'jieList'],
  data() {
    return {
      num7: 0,
      value1: 1,
      danxuan: [],
      duoxuan: [],
      jianda: [],
      thisnkong: [],
      zonghe: []
    }
  },
  created() {
    this.danxuan = this.timuObj.danxuan
    this.duoxuan = this.timuObj.duoxuan
    this.jianda = this.timuObj.jianda
    this.thisnkong = this.timuObj.thisnkong
    this.zonghe = this.timuObj.zonghe
  },
  methods: {
    fanhui() {
      this.$emit('fanhuis')
    },
    baocun() {
      var arr = []
      this.danxuan.forEach(data => {
        var obj = {}
        obj.questionId = data.item.questionId
        obj.fenshu = data.item.fenshu
        arr.push(obj)
      })
      this.duoxuan.forEach(data => {
        var obj = {}
        obj.questionId = data.item.questionId
        obj.fenshu = data.item.fenshu
        arr.push(obj)
      })
      this.jianda.forEach(data => {
        var obj = {}
        obj.questionId = data.item.questionId
        obj.fenshu = data.item.fenshu
        arr.push(obj)
      })
      this.thisnkong.forEach(data => {
        var obj = {}
        obj.questionId = data.item.questionId
        obj.fenshu = data.item.fenshu
        arr.push(obj)
      })
      this.zonghe.forEach(data => {
        var obj = {}
        obj.questionId = data.item.questionId
        obj.ziti = []
        data.item.ziti.forEach(val => {
          var j = {}
          j.questionId = val.questionId
          j.fenshu = val.fenshu
          obj.ziti.push(j)
        })
        arr.push(obj)
      })

      var obj = {
        examName: this.timuObj.title,
        examType: 0,
        questionContent: JSON.stringify(arr),
        subjectId: this.timuObj.subjectId,
        totalQuestionCount: arr.length,
        totalScore: this.timuObj.zongfen,
        subjectName: this.timuObj.subjectName
      }
      this.kemuList.forEach(data => {
        if (this.timuObj.subjectId == data.subjectId) {
          obj.subjectName = data.subjectName
        }
      })
      examSaveOrUpdate(obj).then(data => {
        if (data.code == 200) {
          this.$emit('tijiao')
        }
      })
    }
  }
}
</script>

<style scoped>
  .wpr {
    background-color: #fff;
    box-sizing: border-box;
  }

  .top {
    padding-bottom: 12px;
  }

  .sm {
    line-height: 28px;
  }

  .title {
    display: inline-block;
    width: 80px;
    text-align: right;
    font-weight: 700;
  }

  .lx {
    padding: 10px 0;
  }

  .lx span {
    display: inline-block;
    padding: 2px 5px;
    background-color: #1F6EFF;
    color: #fff;
    border-radius: 5px;
  }

  .xtk {
    width: 100%;
    border: 1px #FAFAFA solid;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    overflow: auto;
  }

  .xtk li {
    padding: 10px;
    background-color: #FAFAFA;
    border: 1px #ccc solid;
    margin-top: 10px;
  }

  .xiantiao {
    margin-top: 10px;
    border-bottom: 1px #ccc dashed;
  }

  .xia {
    height: 42px;
    line-height: 42px;
    position: relative;
  }

  .bt {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 2px 10px;
    color: #fff;
    font-size: 12px;
    background-color: #1F6EFF;
    line-height: 20px;
    cursor: pointer;

  }
  .zh{
    line-height: 28px;
  }
  .zh>p{
    padding-top: 10px;
  }
  .xinx {
    position: relative;
    top: 10px;
  }
  .tigan{
    line-height: 18px;
    text-indent:2em;
    padding-bottom: 10px;
    display: inline-block;
  }
  .timuz{
    color: #1F6EFF;
  }
  .foter{
    margin-top: 20px;
    text-align: center;
  }
</style>
