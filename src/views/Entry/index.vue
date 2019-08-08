<template>
  <div class="wpr">
    <div class="body">
      <div class="fanhui"><a href="#/ItemBank"><img src="@/icons/png/fanhui.png" width="16" alt=""> 返回</a></div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="科目:">
          <el-select v-model="subjectId" size="mini" placeholder="请选择科目">
            <el-option :label="item.subjectName" :value="item.subjectId" v-for="item in kemuList"
                       :key="item.subjectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识点:">
          <el-select v-model="pointId" size="mini" placeholder="请选择知识点">
            <el-option :label="item.pointName" :value="item.pointId" v-for="item in zhishidianList"
                       :key="item.pointId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子知识点:">
          <el-select v-model="zipointId" size="mini" placeholder="请选择子知识点">
            <el-option :label="item.pointName" :value="item.pointId" v-for="item in zizhishidianList"
                       :key="item.pointId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型:">
          <el-select v-model="tixing" size="mini" placeholder="请选择题型">
            <el-option :label="item.label" :value="item.value" v-for="item in radio" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <Choice :questionGetData="questionGetData" ref="chers" :subjectId="subjectId" :pointId="pointId" :zipointId="zipointId" :tixing="tixing"
              v-if="tixing==0|tixing==1"></Choice>
      <Completion :questionGetData="questionGetData" ref="chers" :subjectId="subjectId" :pointId="pointId" :zipointId="zipointId" :tixing="tixing"
                  v-if="tixing==2|tixing==3"></Completion>
      <comprehensive :questionGetData="questionGetData" ref="chers" :subjectId="subjectId" :pointId="pointId" :zipointId="zipointId" :tixing="tixing"
                     v-if="tixing==4"></comprehensive>
      <div class="foter">
        <el-button size="mini" type="primary" @click="pushList">提交</el-button>
        <a href="#/ItemBank"><el-button size="mini">取消</el-button></a>
      </div>
    </div>
  </div>
</template>

<script>
  import Choice from './Choice/index'
  import Completion from './Completion/index'
  import comprehensive from './comprehensive/index'
  import {subjectListByKeyword, knowledgePointListBySubjectId} from '@/api/Subject'
  import {knowledgePointGet, questionGet} from '@/api/ItemBank'

  export default {
    components: {Choice, Completion, comprehensive},
    name: "index",
    data() {
      return {
        tixing: 0,
        questionGetData:{},
        value1: 1,
        form: {},
        radio2: '',
        radio: [
          {
            label: "单选题",
            value: 0
          }, {
            label: "多选题",
            value: 1
          }, {
            label: "填空题",
            value: 2
          }, {
            label: "简答题",
            value: 3
          }, {
            label: "综合题",
            value: 4
          }
        ],
        kemuList: [],
        subjectId: '',
        zhishidianList: [],
        pointId: '',
        zizhishidianList: [],
        zipointId: '',
      }
    },
    methods: {
      pushList() {
        this.$refs.chers.pushList()
      },
      getQueryString() {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
          }
        }
      }
    },
    watch: {

      tixing() {
        // console.log(this.tixing)
      },
      subjectId() {
        knowledgePointListBySubjectId({subjectId: this.subjectId}).then(data => {
          this.zhishidianList = data.data
        })
      },
      pointId() {
        knowledgePointGet({parentPointId: this.pointId}).then(data => {
          this.zizhishidianList = data.data
        })
      },

    },
    created() {
      subjectListByKeyword({currentPage: 1, pageSize: 99999999}).then(data => {
        if (data.code == 200) {
          this.kemuList = data.data.list
          var Request = new this.getQueryString(); //实例化
          if (Request.questionId != undefined) {
            questionGet({questionIds: Request.questionId}).then(data => {

              if (data.code == 200) {
                var obj = data.data[0]
                this.subjectId = obj.subjectId
                this.pointId = obj.pointId
                this.zipointId = obj.secondaryPointId
                this.tixing = obj.questionType,
                  this.questionGetData = obj
              }


            })
          }
        }
      })

    }

  }
</script>

<style scoped>
  .wpr {
    background-color: #F2F2F2;
    box-sizing: border-box;
    padding: 32px !important;
  }

  .body {
    background-color: #fff;
    padding: 32px;
  }

  .top {
    padding-bottom: 32px;
  }

  .foter {
    text-align: center;
  }

  .fanhui {
    text-align: right;
  }
</style>

