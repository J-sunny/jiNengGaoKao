<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <div class="ceter">
        <el-form-item label="题干:">
          <div class="fwb">
            <UE :contentText="contentText" @onEditorChange="tigan"></UE>
          </div>
        </el-form-item>
        <el-form-item label="">
        </el-form-item>
      </div>
    </el-form>

    <ul>
      <li class="timu" v-for="item in allComponents">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="题目类型:">
            <span>单选题</span>
          </el-form-item>
        </el-form>
        <Choice :questionGetData="item" ref="Choice" :tixing="0" :pointId="pointId" :zipointId="zipointId" :subjectId="subjectId"></Choice>
      </li>
      <li class="timu" v-for="item in duoxuan">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="题目类型:">
            <span>多选题</span>
          </el-form-item>
        </el-form>
        <Choice :questionGetData="item" ref="Choices" :tixing="1"  :pointId="pointId" :zipointId="zipointId" :subjectId="subjectId"></Choice>
      </li>
      <li class="timu" v-for="item in tiankong">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="题目类型:">
            <span>填空题</span>
          </el-form-item>
        </el-form>
        <Completion :questionGetData="item" ref="Completion" :tixing="2"  :pointId="pointId" :zipointId="zipointId" :subjectId="subjectId"></Completion>
      </li>
      <li class="timu" v-for="item in jianda">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="题目类型:">
            <span>简答题</span>
          </el-form-item>
        </el-form>
        <Completion :questionGetData="item" ref="Completions" :tixing="3"  :pointId="pointId" :zipointId="zipointId" :subjectId="subjectId"></Completion>
      </li>
    </ul>
    <div class="fwb">
      <div class="push" @click="dialogVisible=true">
        <i class="el-icon-plus"></i>添加题目
      </div>
      <el-dialog
        title="添加题目"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="260px">
        <el-radio-group class="rad" v-model="radio2">
          <el-radio :label="item.value" v-for="item in radio" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="add">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
      </el-dialog>

    </div>
    <br>
  </div>
</template>

<script>
  import UE from '../../../components/SetUeditor/index'
  import Choice from '../Choice/index'
  import Completion from '../Completion/index'
  import {questionSaveOrUpdate,saveOrUpdateBatch,questionGet} from '@/api/ItemBank'

  export default {
    props:['pointId','zipointId','tixing','subjectId','questionGetData'],
    components: {UE,Choice,Completion},
    name: "index",
    data() {
      return {
        questionId:'',
        contentText:'',
        jianda:[],
        tiankong:[],
        duoxuan:[],
        allComponents:[],
        form: {},
        dialogVisible: false,
        radio2: '',
        radio:[
          {
          label:"单选题",
            value:1
        },  {
            label:"多选题",
            value:2
          },  {
            label:"填空题",
            value:3
          },  {
            label:"简答题",
            value:4
          }
        ]
      }
    },
    methods:{
      danxuan(val){
        console.log(val)
      },
      pushList(){
        var arr=[]
        this.allComponents.forEach((data,idx)=>{
          var obj=this.$refs.Choice[idx].qushuju()
          obj.isChild=1
          arr.push(obj)
        })
        this.duoxuan.forEach((data,idx)=>{
          var obj=this.$refs.Choices[idx].qushuju()
          obj.isChild=1
          arr.push(obj)
        })
        this.tiankong.forEach((data,idx)=>{
          var obj=this.$refs.Completion[idx].qushuju()
          obj.isChild=1
          arr.push(obj)
        })
        this.jianda.forEach((data,idx)=>{
          var obj=this.$refs.Completions[idx].qushuju()
          obj.isChild=1
          arr.push(obj)
        })
        saveOrUpdateBatch({ childQuestions:arr}).then(data=>{
          if(data.code==200){
            console.log(data.data)
            var obj={
              questionId:this.questionId,
              pointId:this.pointId,
              questionChildIds:data.data.ids,
              questionTitle:this.questionTitle,
              questionType:this.tixing,
              secondaryPointId:this.zipointId,
              subjectId:this.subjectId
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
          console.log(data)
        })
      },
      tigan(val){
        this.questionTitle=val
      },
      add(){
        if(this.radio2==1){
          this.allComponents.push(1)
        }else if(this.radio2==2){
          this.duoxuan.push(1)
        }else if(this.radio2==3){
          this.tiankong.push(1)
        }else if(this.radio2==4){
          this.jianda.push(1)
        }
        this.dialogVisible=false
      },
    },
    created(){
      if(this.questionGetData.questionChildIds!=undefined){
        this.contentText=this.questionGetData.questionTitle
        this.questionId=this.questionGetData.questionId
        questionGet({questionIds:this.questionGetData.questionChildIds}).then(data=>{
          if(data.code=200){
            data.data.forEach(val=>{
              if(val.questionType==0){
                this.allComponents.push(val)
              }else if(val.questionType==1){
                this.duoxuan.push(val)
              }else if(val.questionType==2){
                this.tiankong.push(val)
              }else if(val.questionType==3){
                this.jianda.push(val)
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .fwb {
    overflow: hidden;
  }

  .ceter {
    max-width: 960px;
    min-width: 120px;
    /*width: 960px;*/
  }

  .push {
    width: 100%;
    height: 32px;
    border: 1px #2A93FE dashed;
    line-height: 32px;
    text-align: center;
    color: #2A93FE;
    cursor: pointer;
    box-sizing: border-box;
  }

  .rad .el-radio {
    padding-bottom: 10px;
  }
  .timu{
    background-color: #fff;
    box-sizing: border-box;
    border: 1px #ccc solid;
    margin-bottom: 10px;
  }
</style>
