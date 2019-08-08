<template>
  <div class="box_r">
    <div class="wpr">
      <p class="title"><a href="#/XSExamination">返回</a></p>
      <p class="title"><span>考试名称:</span>{{ ctn.examPaperName }}</p>
      <p class="title"><span>所属科目:</span>{{ ctn.subjectId }}</p>
      <p class="title"><span>平均分:</span>{{ ctn.examAverage }}分</p>
      <p class="title"><span>最高分:</span>{{ ctn.hightScore }}分</p>
      <p class="title"><span>最低分:</span>{{ ctn.lowScore }}分</p>
      <p class="title"><span>低于班级平均分人数:</span>{{ ctn.lowThanAverageCount }}人</p>
      <p class="title"><span>高于班级平均分人数:</span>{{ ctn.heightThanAverageCount }}人</p>
      <p><el-button type="primary" size="mini">选择题</el-button></p>
      <div class="xuanze">
        <div v-for="(item,index) in obj.list">
          <p>{{ index+1 }}.<span class="tg" v-html="item.questionTitle" /></p>
          <br>
          <div v-for="(val,idx) in item.questionContent">
            <div class="da">
              <div class="xx">{{ listNo[idx] }}</div>
              <span>{{ val.questionContent }}</span>
            </div>
            <div class="rs">
              <span>选择人数：<span style="color: #00C27C">{{ obj.list[index].questionStatistics[0].selectCount }}人</span></span>
              <span>选择比率：<span style="color: #00C27C">{{ obj.list[index].questionStatistics[0].selectRatio }}</span></span>
            </div>
          </div>
        </div>
      </div>
      <br>
      <p><el-button type="primary" size="mini">填空题</el-button></p>
      <p class="cwtxt">平均得分：{{ obj.fillAvgScore }}分</p>
      <p><el-button type="primary" size="mini">问答题</el-button></p>
      <p class="cwtxt">平均得分：{{ obj.answerAvgScore }}87分</p>
      <p><el-button type="primary" size="mini">综合题</el-button></p>
      <p class="cwtxt">平均得分：{{ obj.zhtAvgScore }}53分</p>
    </div>
  </div>
</template>

<script>
import { releaseDetail } from '@/api/Subject'
export default {
  name: 'Detailsss',
  data() {
    return {
      ctn: {},
      obj: {}
    }
  },
  created() {
    if (this.$store.state.XSdetails == undefined) {
      window.location = '#/XSExamination'
      return
    }
    this.ctn = this.$store.state.XSdetails
    releaseDetail({ releaseId: this.ctn.releaseId }).then(data => {
      this.obj = data.data
    })
  }
}
</script>

<style scoped>
  .wpr {
    background-color: #fff;
    padding: 32px;
    box-sizing: border-box;
  }
  .xuanze{
    margin-top: 10px;
    padding: 10px;
    border: 1px #ccc solid;
  }
  .cwtxt{
    line-height: 32px;
  }
  .title{
    line-height: 32px;
    color: #666;
  }
  .title span{
    color: #000;
    font-weight: 700;
    display: inline-block;
    padding-right: 15px;
  }
  .tg {
    display: inline-block;
  }
  .da {
    height: 1rem;
    background: #FAFAFA;
    border-radius: 5px;
    position: relative;
    line-height: 1rem;
    padding-left: 1rem;
  }

  .xx {
    height: .6rem;
    width: .6rem;
    border-radius: 50%;
    background-color: #EFEFEF;
    position: absolute;
    top: .2rem;
    left: .2rem;
    line-height: .6rem;
    text-align: center;
  }
</style>
