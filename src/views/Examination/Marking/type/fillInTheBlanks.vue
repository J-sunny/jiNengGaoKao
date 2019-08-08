<template>
  <div>
    <div class="title" v-html="timu.sysQuestion.questionTitle" />
    <br>
    <div class="daan">
      <div>
        学生答案：<span>{{ timu.reviewInfo.answer }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参考答案：<span style="display: inline-block" v-html="timu.sysQuestion.questionAnswer" />
      </div>
      <div v-for="item in imgs" class="imgs">
        <img src="item" width="100%" height="100%" alt="">
      </div>

      <br>
      <div>
        本题分数：{{ fenshu }}分
      </div>
      <br>
      <div>
        本题打分：<span style="width: 60px;display: inline-block"><el-input
          v-model="score"
          :disabled="msf"
          size="mini"
        /></span>
      </div>
      <br>
      <div>
        本题批注：<span style="width: 320px;display: inline-block"><el-input
          v-model="annotation"
          size="mini"
          :disabled="msf"
          type="textarea"
          :rows="2"
        /></span>
      </div>
    </div>
  </div>

</template>

<script>
import { A_Z } from '@/utils/list'
export default {
  name: 'SingleElection',
  props: ['timu', 'fenshu', 'msf'],
  data() {
    return {
      score: 0,
      annotation: '',
      imgs: []
    }
  },
  created() {
    this.score = this.timu.reviewInfo.score || this.fenshu
    if (this.timu.reviewInfo.fileNames != '') {
      this.imgs = this.timu.reviewInfo.fileNames.splice(',')
    }
    if (this.timu.reviewInfo != undefined) {
      this.annotation = this.timu.reviewInfo.annotation || ''
    }
  },
  methods: {
    xiayiti_() {
      var obj = {
        questionId: this.timu.sysQuestion.questionId,
        reviewId: this.timu.reviewInfo.reviewId,
        annotation: this.annotation,
        score: this.score
      }
      this.$emit('tijiao', obj)
    }
  }
}
</script>
<style scoped>
  .title{
    border: #ccc 1px solid;
    background-color: #eee;
    padding: 10px;
  }
  .daan{
    padding: 10px;
    border: #ccc 1px solid;
    background-color: #eee;
  }
  .imgs{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    margin-top: 15px;
  }
</style>
