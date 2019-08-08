<template>
  <div class="box_r">
    <div class="wpr">
      <div class="top">
        <a href="#/Manual"><img src="@/icons/svg/fanhui.svg" alt=""> 返回</a>
      </div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="试卷名称:">
          <el-input type="text" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="科目:">
          <el-select v-model="form.region_" size="mini" placeholder="请选择活动区域">
            <el-option label="区域一" :value="1"></el-option>
            <el-option label="区域二" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题知识点:">
          <el-select multiple class="zsd" v-model="form.region1" size="mini" placeholder="请选择活动区域">
            <el-option label="区域一" :value="1"></el-option>
            <el-option label="区域二" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型:">
          <p>（题目总数：<span>12</span> 题）</p>
          <p><el-button class="tag" size="mini" plain>﻿单选</el-button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该题型总分:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;该题型数量:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>
          </p>
          <p><el-button class="tag" size="mini" plain>多选</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该题型总分:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;该题型数量:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>
          </p>
          <p><el-button class="tag" size="mini" plain>填空</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该题型总分:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;该题型数量:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>
          </p>
          <p><el-button class="tag" size="mini" plain>问答题</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该题型总分:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;该题型数量:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>
          </p>
          <p><el-button class="tag" size="mini" plain>综合题</el-button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该题型总分:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>&nbsp;&nbsp;&nbsp;&nbsp;该题型数量:&nbsp;&nbsp;<el-input-number size="mini" v-model="num7"></el-input-number>
          </p>
        </el-form-item>
        <el-form-item label="总分:">
          <el-input class="zf" size="mini"></el-input> 分
        </el-form-item>
      </el-form>
      <div class="foter">
        <a @click="zd=true"><el-button size="mini" type="primary">生成试卷</el-button></a>
        <el-button size="mini">取消</el-button>
      </div>
    </div>
    <el-dialog
      title="新建组卷"
      :visible.sync="zd"
      :append-to-body="true"
      width="70%">
      <detailsOfExaminationPapers></detailsOfExaminationPapers>
    </el-dialog>
  </div>
</template>

<script>
  import detailsOfExaminationPapers from '@/views/testPaper/newlyBuild/detailsOfExaminationPapers'

  export default {
    name: "index",
    components:{detailsOfExaminationPapers},
    data() {
      return {
        zd:false,
        num7:1,
        form: {}
      }
    }
  }
</script>

<style scoped>
  .zf{
    width: 120px;
  }
  .wpr {
    background-color: #fff;
    padding: 32px;
    box-sizing: border-box;
  }

  .top {
    padding-bottom: 32px;
  }

  .zsd{
    width: 100%;
  }
  .tag{
    width: 80px;
  }
  .foter{
    text-align: center;
  }
</style>
