<template>
  <el-form ref="form" :model="form" label-width="80px">
    <div class="ceter">

    <el-form-item label="题目名称:">
      <div class="fwb">
        <UE :contentText="contentText" @onEditorChange="tigan"></UE>
      </div>
    </el-form-item>
      <el-form-item label="正确答案:">
        <div class="fwb">
          <UE :contentText="questionAnswer" @onEditorChange="daan"></UE>
        </div>
      </el-form-item>
      <el-form-item label="解析:">
        <div class="fwb">
          <UE :contentText="questionAnalysis" @onEditorChange="jiexi"></UE>
          <span class="video" v-if="false"><i class="el-icon-plus"></i>添加视频解析</span>
        </div>
      </el-form-item>
      <el-form-item label="难易程度:">
        <el-rate class="xingxing" v-model="value1"></el-rate>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  import UE from '../../../components/SetUeditor/index'
  import {questionSaveOrUpdate} from '@/api/ItemBank'

  export default {
    props:['pointId','zipointId','tixing','subjectId','questionGetData'],
        name: "index",
    components:{UE},
    data(){
          return{
            form:{},
            value1:1,
            contentText:'',
            questionAnswer:'',
            questionAnalysis:'',
          }
      },
    watch:{
      questionGetData(){
        console.log(this.questionGetData);
      },
    },
    methods:{
      tigan(val){
        this.tigan_=val
      },
      daan(val){
        this.daan_=val
      },
      jiexi(val){
        this.jiexi_=val
      },
      qushuju(){
        var obj={
          diffcultLevel:this.value1,
          questionAnalysis:this.jiexi_,
          questionAnswer:this.daan_,
          questionTitle:this.tigan_,
          secondaryPointId:this.zipointId,
          subjectId:this.subjectId,
          questionType:this.tixing,
          pointId:this.pointId
        }
        return obj
      },
      pushList() {
        var obj={
          questionId:this.questionGetData.questionId,
          diffcultLevel:this.value1,
          questionAnalysis:this.jiexi_,
          questionAnswer:this.daan_,
          questionTitle:this.tigan_,
          secondaryPointId:this.zipointId,
          subjectId:this.subjectId,
          questionType:this.tixing,
          pointId:this.pointId
        }
        questionSaveOrUpdate(obj).then(data=>{
          if(data.data.code==200){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            location.hash='#/ItemBank';
          }
        })
      }
      },
    created(){
      this.contentText=this.questionGetData.questionTitle
      this.questionAnswer=this.questionGetData.questionAnswer
      this.questionAnalysis=this.questionGetData.questionAnalysis
      this.value1=this.questionGetData.diffcultLevel
    },
    }
</script>

<style scoped>
  .fwb{
    overflow: hidden;
  }
  .ceter{
    max-width: 960px;
  }
  .xingxing{
    margin-top: 10px;
  }
  .video{
    color: #2A93FE;
    cursor:pointer;
  }
</style>
