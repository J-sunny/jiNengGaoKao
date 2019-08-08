<template>
  <el-form ref="form" :model="form" label-width="80px">
    <div class="ceter">
      <el-form-item label="题目名称:">
        <div class="fwb">
          <UE ref="UE" :content-text="contentText" @onEditorChange="tigan" />
        </div>
      </el-form-item>
      <el-form-item label="答案:">
        <div class="fwb">
          <div v-for="(item,index) in datalist">
            <div class="title">{{ daanList[index] }}
              <el-button class="fr btn" plain size="mini" @click="datalist.splice(index,1)">删除</el-button>
            </div>
            <div class="fwb">
              <el-input
                v-model="item.txt"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div class="fwb">
          <div v-if="datalist.length<25" class="push" @click="datalist.push({txt:''})">
            <i class="el-icon-plus" />添加选项
          </div>
        </div>
      </el-form-item>
      <el-form-item label="正确答案:">
        <div class="fwb">
          <el-radio-group v-if="tixing_==0" v-model="radio2">
            <el-radio v-for="(item,index) in datalist" :label="index+''">{{ daanList[index] }}</el-radio>
          </el-radio-group>
          <el-checkbox-group v-if="tixing_==1" v-model="radio2_">
            <el-checkbox v-for="(item,index) in datalist" :key="index" :label="index+''">{{ daanList[index] }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="解析:">
        <div class="fwb">
          <UE :content-text="questionAnalysisText" @onEditorChange="jiexi" />
          <span v-if="false" class="video"><i class="el-icon-plus" />添加视频解析</span>
        </div>
      </el-form-item>
      <el-form-item label="难易程度:">
        <el-rate v-model="value1" class="xingxing" />
      </el-form-item>
    </div>
  </el-form>

</template>

<script>
import UE from '@/components/SetUeditor/index'
import { A_Z } from '@/utils/list'
import { questionSaveOrUpdate } from '@/api/ItemBank'

export default {
  name: 'Index',
  components: { UE },
  props: ['pointId', 'zipointId', 'tixing', 'subjectId', 'questionGetData'],
  data() {
    return {
      questionAnalysisText: '',
      contentText: '',
      form: {},
      radio2: '',
      radio2_: [],
      value1: 1,
      flag: 4,
      list: [],
      daanList: [],
      datalist: [],
      tixing_: ''
    }
  },
  watch: {
    questionGetData() {
      this.contentText = this.questionGetData.questionTitle
      this.questionAnalysisText = this.questionGetData.questionAnalysis
      // this.datalist=this.questionContent
      this.datalist = []
      this.questionGetData.questionContent.split('丶').forEach(data => {
        this.datalist.push({ txt: data })
      })
      this.radio2_ = this.questionGetData.questionAnswer.split(',')
      this.radio2 = this.questionGetData.questionAnswer
      this.value1 = this.questionGetData.diffcultLevel
      this.questionId = this.questionGetData.questionId
    },
    radio2_() {
      this.radio2 = this.radio2_.join(',')
    },
    tixing(val) {
      this.tixing_ = val
    }
  },
  created() {
    this.tixing_ = this.tixing
    this.getFlag()
    this.daanList = A_Z()
    if (this.questionGetData.questionTitle) {
      this.contentText = this.questionGetData.questionTitle
      this.questionAnalysisText = this.questionGetData.questionAnalysis
      // this.datalist=this.questionContent
      this.datalist = []
      this.questionGetData.questionContent.split('丶').forEach(data => {
        this.datalist.push({ txt: data })
      })
      this.radio2_ = this.questionGetData.questionAnswer.split(',')
      this.radio2 = this.questionGetData.questionAnswer
      this.value1 = this.questionGetData.diffcultLevel
      this.questionId = this.questionGetData.questionId
    }
  },
  methods: {
    tigan(val) {
      this.tigan_ = val
    },
    jiexi(val) {
      this.jiexi_ = val
    },
    getFlag() {
      this.datalist = []

      for (var i = 0; i < this.flag; i++) {
        var obj = {
          txt: ''
        }
        this.datalist.push(obj)
      }
    },
    qushuju() {
      var obj = {
        questionId: this.questionId,
        diffcultLevel: this.value1,
        questionAnalysis: this.jiexi_,
        questionAnswer: this.radio2,
        questionContent: '',
        questionTitle: this.tigan_,
        questionType: this.tixing_,
        secondaryPointId: this.zipointId,
        pointId: this.pointId,
        subjectId: this.subjectId

      }
      var a = []
      this.datalist.forEach(data => {
        a.push(data.txt)
      })
      obj.questionContent = a.join('丶')
      return obj
    },
    pushList() {
      console.log(this.questionId)
      var obj = {
        questionId: this.questionId,
        diffcultLevel: this.value1,
        questionAnalysis: this.jiexi_,
        questionAnswer: this.radio2,
        questionContent: '',
        questionTitle: this.tigan_,
        questionType: this.tixing_,
        secondaryPointId: this.zipointId,
        pointId: this.pointId,
        subjectId: this.subjectId

      }
      var a = []
      this.datalist.forEach(data => {
        a.push(data.txt)
      })
      obj.questionContent = a.join('丶')
      questionSaveOrUpdate(obj).then(data => {
        if (data.data.code == 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          location.hash = '#/ItemBank'
        }
      })
    }
  }
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

  .title {
    height: 48px;
    line-height: 48px;
  }

  .btn {
    margin-top: 10px;
  }

  .push {
    width: 100%;
    height: 32px;
    border: 1px #2A93FE dashed;
    line-height: 32px;
    text-align: center;
    color: #2A93FE;
    cursor: pointer;
  }

  .video {
    color: #2A93FE;
    cursor: pointer;
  }

  .xingxing {
    margin-top: 10px;
  }
</style>
